from fastapi import FastAPI, APIRouter, HTTPException, Depends, Header
from fastapi.responses import StreamingResponse
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr, ConfigDict
from typing import List, Optional, Literal
import uuid
from datetime import datetime, timezone, timedelta
import bcrypt
import jwt as pyjwt

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / ".env")

mongo_url = os.environ["MONGO_URL"]
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ["DB_NAME"]]

JWT_SECRET = os.environ.get("JWT_SECRET", "change-me")
EMERGENT_LLM_KEY = os.environ.get("EMERGENT_LLM_KEY", "")

app = FastAPI(title="The Kashmir Atelier Dubai API")
api_router = APIRouter(prefix="/api")

logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(name)s - %(levelname)s - %(message)s")
logger = logging.getLogger(__name__)


def now_iso() -> str:
    return datetime.now(timezone.utc).isoformat()


# ---------- Models ----------
class ContactCreate(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = None
    project_type: Optional[str] = None
    budget: Optional[str] = None
    location: Optional[str] = None
    message: str


class Contact(ContactCreate):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    created_at: str = Field(default_factory=now_iso)


class AppointmentCreate(BaseModel):
    name: str
    email: EmailStr
    phone: str
    date: str  # ISO date
    time: str
    service: str
    notes: Optional[str] = None


class Appointment(AppointmentCreate):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    status: str = "pending"
    created_at: str = Field(default_factory=now_iso)


class QuoteCreate(BaseModel):
    project_type: str
    area_sqft: float
    quality_tier: Literal["premium", "luxury", "ultra_luxury"]
    location: str
    name: Optional[str] = None
    email: Optional[EmailStr] = None
    phone: Optional[str] = None


class Quote(QuoteCreate):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    estimate_min: float = 0
    estimate_max: float = 0
    created_at: str = Field(default_factory=now_iso)


class RegisterRequest(BaseModel):
    name: str
    email: EmailStr
    password: str


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class UserPublic(BaseModel):
    id: str
    name: str
    email: str


class ChatMessage(BaseModel):
    role: Literal["user", "assistant"]
    content: str


class AIRequest(BaseModel):
    session_id: str
    message: str
    history: List[ChatMessage] = []


# ---------- Auth helpers ----------
def create_token(user_id: str) -> str:
    payload = {
        "sub": user_id,
        "exp": datetime.now(timezone.utc) + timedelta(days=14),
        "iat": datetime.now(timezone.utc),
    }
    return pyjwt.encode(payload, JWT_SECRET, algorithm="HS256")


async def get_current_user(authorization: Optional[str] = Header(None)):
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Missing token")
    token = authorization.split(" ", 1)[1]
    try:
        payload = pyjwt.decode(token, JWT_SECRET, algorithms=["HS256"])
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid token")
    user = await db.users.find_one({"id": payload["sub"]}, {"_id": 0, "password_hash": 0})
    if not user:
        raise HTTPException(status_code=401, detail="User not found")
    return user


# ---------- Health ----------
@api_router.get("/")
async def root():
    return {"message": "The Kashmir Atelier Dubai API", "status": "ok"}


# ---------- Contact ----------
@api_router.post("/contact", response_model=Contact)
async def create_contact(payload: ContactCreate):
    obj = Contact(**payload.model_dump())
    await db.contacts.insert_one(obj.model_dump())
    return obj


@api_router.get("/contact", response_model=List[Contact])
async def list_contacts():
    docs = await db.contacts.find({}, {"_id": 0}).sort("created_at", -1).to_list(500)
    return docs


# ---------- Appointment ----------
@api_router.post("/appointment", response_model=Appointment)
async def create_appointment(payload: AppointmentCreate):
    obj = Appointment(**payload.model_dump())
    await db.appointments.insert_one(obj.model_dump())
    return obj


@api_router.get("/appointment", response_model=List[Appointment])
async def list_appointments():
    docs = await db.appointments.find({}, {"_id": 0}).sort("created_at", -1).to_list(500)
    return docs


# ---------- Quote / Cost Calculator ----------
RATE_TABLE = {
    "premium": (3500, 5500),
    "luxury": (5500, 9000),
    "ultra_luxury": (9000, 18000),
}  # INR per sqft ballpark


@api_router.post("/quote", response_model=Quote)
async def create_quote(payload: QuoteCreate):
    lo, hi = RATE_TABLE.get(payload.quality_tier, (5000, 8000))
    est_min = lo * payload.area_sqft
    est_max = hi * payload.area_sqft
    obj = Quote(**payload.model_dump(), estimate_min=est_min, estimate_max=est_max)
    await db.quotes.insert_one(obj.model_dump())
    return obj


# ---------- Auth ----------
@api_router.post("/auth/register")
async def register(req: RegisterRequest):
    existing = await db.users.find_one({"email": req.email.lower()})
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")
    user_id = str(uuid.uuid4())
    pw_hash = bcrypt.hashpw(req.password.encode(), bcrypt.gensalt()).decode()
    doc = {
        "id": user_id,
        "name": req.name,
        "email": req.email.lower(),
        "password_hash": pw_hash,
        "created_at": now_iso(),
    }
    await db.users.insert_one(doc)
    token = create_token(user_id)
    return {"token": token, "user": {"id": user_id, "name": req.name, "email": req.email.lower()}}


@api_router.post("/auth/login")
async def login(req: LoginRequest):
    user = await db.users.find_one({"email": req.email.lower()})
    if not user or not bcrypt.checkpw(req.password.encode(), user["password_hash"].encode()):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    token = create_token(user["id"])
    return {"token": token, "user": {"id": user["id"], "name": user["name"], "email": user["email"]}}


@api_router.get("/auth/me")
async def me(user=Depends(get_current_user)):
    return user


# ---------- Client dashboard ----------
@api_router.get("/client/projects")
async def client_projects(user=Depends(get_current_user)):
    projects = await db.client_projects.find({"user_id": user["id"]}, {"_id": 0}).to_list(100)
    if not projects:
        # seed a demo project for logged in user
        demo = {
            "id": str(uuid.uuid4()),
            "user_id": user["id"],
            "name": "Kashmir Villa Residence",
            "location": "Nishat, Srinagar",
            "stage": "Interior Installation",
            "progress": 78,
            "next_milestone": "Italian Marble Flooring — Master Suite",
            "updates": [
                {"date": "2025-11-14", "note": "Roof waterproofing completed."},
                {"date": "2025-11-28", "note": "Walnut wall paneling installed in the majlis."},
                {"date": "2025-12-06", "note": "Chandelier lifted, tested and commissioned."},
            ],
            "created_at": now_iso(),
        }
        await db.client_projects.insert_one(demo)
        projects = [demo]
        for p in projects:
            p.pop("_id", None)
    return projects


# ---------- Blog ----------
@api_router.get("/blog")
async def list_blog():
    posts = await db.blog_posts.find({}, {"_id": 0}).sort("created_at", -1).to_list(50)
    return posts


@api_router.get("/blog/{slug}")
async def get_blog(slug: str):
    post = await db.blog_posts.find_one({"slug": slug}, {"_id": 0})
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    return post


# ---------- AI Design Consultation (SSE stream) ----------
@api_router.post("/ai/consult")
async def ai_consult(req: AIRequest):
    from emergentintegrations.llm.chat import LlmChat, UserMessage, TextDelta, StreamDone

    system_prompt = (
        "You are the AI Design Concierge for The Kashmir Atelier Dubai, an ultra-luxury "
        "architecture, interior design, and construction atelier headquartered in Srinagar, "
        "Kashmir with projects in Dubai and beyond. Speak with quiet confidence — cinematic, "
        "editorial, and precise, like an Armani Casa or Foster + Partners advisor. Advise on "
        "villas, penthouses, majlis interiors, Italian marble, walnut carving, chandeliers, "
        "layouts, materials, budgets, and timelines. Keep answers concise, elegant, and "
        "actionable. Suggest a consultation booking when appropriate."
    )

    async def event_generator():
        chat = LlmChat(
            api_key=EMERGENT_LLM_KEY,
            session_id=req.session_id,
            system_message=system_prompt,
        ).with_model("anthropic", "claude-sonnet-4-6")

        # persist user message
        await db.ai_messages.insert_one({
            "id": str(uuid.uuid4()),
            "session_id": req.session_id,
            "role": "user",
            "content": req.message,
            "created_at": now_iso(),
        })

        full_response = ""
        try:
            async for event in chat.stream_message(UserMessage(text=req.message)):
                if isinstance(event, TextDelta):
                    full_response += event.content
                    yield event.content
                elif isinstance(event, StreamDone):
                    break
        except Exception as e:
            logger.exception("AI stream error")
            yield f"\n[error: {str(e)}]"

        # persist assistant response
        await db.ai_messages.insert_one({
            "id": str(uuid.uuid4()),
            "session_id": req.session_id,
            "role": "assistant",
            "content": full_response,
            "created_at": now_iso(),
        })

    return StreamingResponse(
        event_generator(),
        media_type="text/event-stream",
        headers={"Cache-Control": "no-cache", "X-Accel-Buffering": "no"},
    )


# ---------- Seed blog on startup ----------
@app.on_event("startup")
async def seed_blog():
    count = await db.blog_posts.count_documents({})
    if count == 0:
        seed = [
            {
                "id": str(uuid.uuid4()),
                "slug": "italian-marble-in-kashmir-homes",
                "title": "Italian Marble in Kashmir Homes: An Editorial Guide",
                "excerpt": "How Statuario, Calacatta and Bianco Carrara are reshaping the modern Kashmiri villa.",
                "cover": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=80",
                "author": "The Atelier Studio",
                "read_time": "6 min read",
                "content": "Italian marble is more than a floor finish — it is a statement of intent...",
                "created_at": now_iso(),
            },
            {
                "id": str(uuid.uuid4()),
                "slug": "kashmiri-walnut-carving-in-modern-interiors",
                "title": "Kashmiri Walnut Carving in Modern Interiors",
                "excerpt": "Restraint, ratio and reverence — how heritage carving belongs in the modernist home.",
                "cover": "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=2000&q=80",
                "author": "Zubair Wani",
                "read_time": "5 min read",
                "content": "The chinar leaf motif, when handled with restraint...",
                "created_at": now_iso(),
            },
            {
                "id": str(uuid.uuid4()),
                "slug": "snow-resistant-neo-classical-villas",
                "title": "Snow-Resistant Neo-Classical Villas for the Valley",
                "excerpt": "European silhouettes engineered for Kashmiri winters — a technical manifesto.",
                "cover": "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=2000&q=80",
                "author": "Design Studio",
                "read_time": "8 min read",
                "content": "A steeply pitched roof is not decoration — it is survival...",
                "created_at": now_iso(),
            },
        ]
        await db.blog_posts.insert_many(seed)
        logger.info("Seeded 3 blog posts")


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get("CORS_ORIGINS", "*").split(","),
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()

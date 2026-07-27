"""Backend API tests for The Kashmir Atelier Dubai."""
import os
import uuid
import time
import json
import requests
import pytest

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "").rstrip("/")
if not BASE_URL:
    # fallback to reading frontend/.env
    with open("/app/frontend/.env") as f:
        for line in f:
            if line.startswith("REACT_APP_BACKEND_URL="):
                BASE_URL = line.split("=", 1)[1].strip().rstrip("/")
                break

API = f"{BASE_URL}/api"


@pytest.fixture(scope="session")
def s():
    return requests.Session()


# ---------- Health ----------
def test_health(s):
    r = s.get(f"{API}/")
    assert r.status_code == 200
    data = r.json()
    assert data.get("status") == "ok"


# ---------- Contact ----------
def test_contact_create_and_list(s):
    payload = {
        "name": "TEST_Contact User",
        "email": f"test_{uuid.uuid4().hex[:8]}@atelier.com",
        "phone": "+971501234567",
        "project_type": "Villa",
        "budget": "50L-1Cr",
        "location": "Dubai",
        "message": "Interested in a bespoke villa design",
    }
    r = s.post(f"{API}/contact", json=payload)
    assert r.status_code == 200, r.text
    d = r.json()
    assert d["email"] == payload["email"]
    assert d["name"] == payload["name"]
    assert d["message"] == payload["message"]
    assert "id" in d

    r2 = s.get(f"{API}/contact")
    assert r2.status_code == 200
    lst = r2.json()
    assert any(c["id"] == d["id"] for c in lst)


# ---------- Appointment ----------
def test_appointment_create(s):
    payload = {
        "name": "TEST_Appt",
        "email": f"appt_{uuid.uuid4().hex[:6]}@atelier.com",
        "phone": "+971501112233",
        "date": "2026-02-15",
        "time": "14:30",
        "service": "Design Consultation",
        "notes": "Preferred virtual meeting",
    }
    r = s.post(f"{API}/appointment", json=payload)
    assert r.status_code == 200, r.text
    d = r.json()
    assert d["date"] == payload["date"]
    assert d["service"] == payload["service"]
    assert d.get("status") == "pending"


# ---------- Quote ----------
@pytest.mark.parametrize("tier,lo,hi", [
    ("premium", 3500, 5500),
    ("luxury", 5500, 9000),
    ("ultra_luxury", 9000, 18000),
])
def test_quote_estimation(s, tier, lo, hi):
    area = 1200
    r = s.post(f"{API}/quote", json={
        "project_type": "Villa",
        "area_sqft": area,
        "quality_tier": tier,
        "location": "Dubai",
    })
    assert r.status_code == 200, r.text
    d = r.json()
    assert d["estimate_min"] == lo * area
    assert d["estimate_max"] == hi * area


# ---------- Auth ----------
@pytest.fixture(scope="session")
def new_user(s):
    email = f"test_reg_{uuid.uuid4().hex[:8]}@atelier.com"
    pw = "Atelier@2025"
    r = s.post(f"{API}/auth/register", json={"name": "TEST_User", "email": email, "password": pw})
    assert r.status_code == 200, r.text
    data = r.json()
    assert "token" in data and data["user"]["email"] == email
    return {"email": email, "password": pw, "token": data["token"], "user": data["user"]}


def test_register_duplicate(s, new_user):
    r = s.post(f"{API}/auth/register", json={
        "name": "dup", "email": new_user["email"], "password": "whatever"})
    assert r.status_code == 400


def test_login_valid(s, new_user):
    r = s.post(f"{API}/auth/login", json={"email": new_user["email"], "password": new_user["password"]})
    assert r.status_code == 200
    assert "token" in r.json()


def test_login_invalid(s, new_user):
    r = s.post(f"{API}/auth/login", json={"email": new_user["email"], "password": "wrong"})
    assert r.status_code == 401


def test_me_with_token(s, new_user):
    r = s.get(f"{API}/auth/me", headers={"Authorization": f"Bearer {new_user['token']}"})
    assert r.status_code == 200
    assert r.json()["email"] == new_user["email"]


def test_me_missing_token(s):
    r = s.get(f"{API}/auth/me")
    assert r.status_code == 401


def test_me_invalid_token(s):
    r = s.get(f"{API}/auth/me", headers={"Authorization": "Bearer garbage"})
    assert r.status_code == 401


# ---------- Client projects ----------
def test_client_projects_seeds(s, new_user):
    r = s.get(f"{API}/client/projects", headers={"Authorization": f"Bearer {new_user['token']}"})
    assert r.status_code == 200
    projects = r.json()
    assert len(projects) >= 1
    p = projects[0]
    assert "name" in p and "progress" in p and "updates" in p


def test_client_projects_unauth(s):
    r = s.get(f"{API}/client/projects")
    assert r.status_code == 401


# ---------- Blog ----------
def test_blog_list(s):
    r = s.get(f"{API}/blog")
    assert r.status_code == 200
    posts = r.json()
    assert len(posts) >= 3
    assert all("slug" in p and "title" in p for p in posts)


def test_blog_detail(s):
    posts = s.get(f"{API}/blog").json()
    slug = posts[0]["slug"]
    r = s.get(f"{API}/blog/{slug}")
    assert r.status_code == 200
    assert r.json()["slug"] == slug


def test_blog_unknown(s):
    r = s.get(f"{API}/blog/nonexistent-slug-xxx")
    assert r.status_code == 404


# ---------- AI Consult (stream) ----------
def test_ai_consult_stream(s):
    session_id = f"test_{uuid.uuid4().hex[:8]}"
    payload = {"session_id": session_id, "message": "What marble suits a Dubai penthouse?"}
    start = time.time()
    with s.post(f"{API}/ai/consult", json=payload, stream=True, timeout=90) as r:
        assert r.status_code == 200, r.text
        ct = r.headers.get("content-type", "")
        assert "text/event-stream" in ct, f"Unexpected content-type: {ct}"
        chunks = []
        for chunk in r.iter_content(chunk_size=None, decode_unicode=True):
            if chunk:
                chunks.append(chunk)
                if sum(len(c) for c in chunks) > 20:
                    # got enough tokens
                    pass
            if time.time() - start > 75:
                break
        full = "".join(chunks)
        assert len(full.strip()) > 0, "AI response was empty"
        assert "[error:" not in full, f"AI stream returned error: {full[:300]}"

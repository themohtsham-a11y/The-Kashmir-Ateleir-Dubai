# The Kashmir Atelier Dubai — PRD

## Problem Statement
Build an ultra-luxury, Awwwards-caliber website for The Kashmir Atelier Dubai (architecture, construction, interior design, luxury real-estate development). Aesthetic: dark luxury (#0B0B0B) with gold accent (#D4AF37), Playfair Display + Inter, editorial monograph feel, cinematic motion, glassmorphism, premium buttons, kinetic hero with masked line reveal, numbered manifesto chapters, editorial marquee, framer-motion + lenis smooth scroll.

## Architecture
- **Backend**: FastAPI + Motor (MongoDB). Endpoints under `/api`:
  - `POST /api/contact` — contact form → `contacts` collection
  - `POST /api/appointment` — bookings → `appointments`
  - `POST /api/quote` — cost calculator → `quotes` with tiered pricing
  - `POST /api/auth/register`, `POST /api/auth/login`, `GET /api/auth/me` — JWT auth
  - `GET /api/client/projects` — auth-required demo project seeded per user
  - `GET /api/blog`, `GET /api/blog/{slug}` — auto-seeded 3 essays
  - `POST /api/ai/consult` — SSE-style stream via emergentintegrations Claude Sonnet 4.6
- **Frontend**: React 19 + framer-motion + lenis + Tailwind + shadcn UI + sonner.

## Implemented (Dec 2025)
- Kinetic hero with masked line-by-line reveal, parallax + slow zoom, vertical rails
- Sticky nav: transparent → solid on scroll + full-screen editorial menu
- Editorial marquee (outlined gold text) between sections
- About: numbered manifesto chapters (01/02/03) + sticky image column with real client asset
- Services: 5 categorised luxury cards with 50+ items
- Featured Projects: alternating masonry 2/3 · 1/3 with hover zoom + gold border reveal
- Portfolio page with animated category filters
- Why Choose Us: 10 numbered bordered cards
- Process Timeline: 8-step horizontal animated timeline
- Stats: 4 animated counters
- Video Showcase: cinematic still + play CTA
- Before/After: draggable interactive slider
- Testimonials: elegant carousel with 5-star, glass-gold container
- Gallery: 3-column masonry + lightbox with keyboard-less nav
- Contact: luxury form with Name/Email/Phone/ProjectType/Budget/Location/Message → DB + studio card with Google Maps embed
- Footer: oversized brand mark + socials + quick links
- Floating actions: WhatsApp FAB, Appointment booking, Cost Calculator, AI Design Concierge
- AI Concierge: streaming SSE Claude Sonnet 4.6 (Emergent Universal Key)
- Blog: list + detail pages using seeded posts
- Auth: register/login with JWT, Client Dashboard with animated progress + seeded demo project

## Key Files
- Backend: `/app/backend/server.py`
- Frontend entry: `/app/frontend/src/App.js`, `/app/frontend/src/pages/Home.jsx`
- Shared data: `/app/frontend/src/lib/data.js`
- API client & AI stream: `/app/frontend/src/lib/api.js`
- Design tokens: `/app/frontend/src/index.css`, `tailwind.config.js`
- Test IDs: `/app/frontend/src/constants/testIds.js`

## User Preferences (from ask_human)
- Full scope (portal + dashboard + AI + blog + calculator)
- Contact form → DB (no email notifications yet)
- AI = Emergent Universal LLM Key
- Images = 4 user assets + curated luxury stock
- Phone: +91 6006921213 · Email: thekashmiratelier@gmail.com

## Backlog (P1 / P2 — deferred)
- P1: Admin dashboard to view submissions
- P1: WhatsApp chat webhook (currently opens WA link)
- P1: Cost calculator PDF export & email of estimate
- P2: Full auto-generated sitemap.xml + robots.txt
- P2: PWA manifest + service-worker for offline
- P2: Multi-language (English + Arabic RTL for Dubai audience)
- P2: Instagram/Reels feed on landing (needs IG Graph API keys)
- P2: Real drone MP4 hero video (currently cinematic still + play control)

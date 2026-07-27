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
- P2: Real drone MP4 hero video — replaced with editorial Ken Burns slideshow of client's own work + curated luxury imagery (Pexels/Pixabay CDNs block hotlinking; drop a self-hosted MP4 into `/public` and update Hero.jsx source to enable a video).
- P2: SMTP/SendGrid integration to actually deliver Cost-Calculator PDF emails (currently queued in DB awaiting a transactional email service).
- P2: Real Instagram Graph API — set `INSTAGRAM_ACCESS_TOKEN` in `backend/.env` and the endpoint auto-switches from curated fallback to the live IG feed.
- P2: Full Arabic translation of every section (currently: nav + hero fully translated; other section headings inherit English — extend `STRINGS.ar` in `/app/frontend/src/lib/i18n.jsx`).

## Implemented (Dec 2025)
- Kinetic hero with masked line-by-line reveal, parallax + slow zoom, vertical rails
- **Editorial Ken Burns hero slideshow** cycling through 6 hand-picked images (4 client references + 2 curated) with cross-fade + slow zoom + frame counter
- Sticky nav: transparent → solid on scroll + full-screen editorial menu + Language Toggle EN/عربي + conditional Admin link
- **Full i18n**: `I18nProvider` (en + ar), RTL body class, Amiri + Noto Naskh Arabic fonts, direction-aware layout
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
- Gallery: 3-column masonry + lightbox
- **Instagram Reels section**: 6-tile grid; curated fallback + live Graph API when `INSTAGRAM_ACCESS_TOKEN` env is set
- Contact: luxury form → DB + studio card with Google Maps embed
- Footer: oversized brand mark + socials + quick links
- Floating actions: WhatsApp FAB, Appointment booking, Cost Calculator, AI Design Concierge
- **Cost Calculator PDF**: `jsPDF` generates a luxurious dark-themed PDF; also a "Email me a copy" flow that queues delivery in `quote_email_requests` (awaiting SMTP wiring)
- AI Concierge: streaming SSE Claude Sonnet 4.6 (Emergent Universal Key)
- Blog: list + detail pages using seeded posts
- Auth: register/login with JWT, Client Dashboard with animated progress + seeded demo project
- **Admin Console** `/admin`: JWT + `is_admin` gate; tabs for Leads / Appointments / Quotes; stat cards; auto-seeded admin `admin@atelier.com` / `Admin@Atelier2025`
- **PWA**: `manifest.json` + service worker (`/sw.js`) caching core assets in production

# Technical Requirements Document (TRD)

**Project:** uftech.com — UnitForce Technologies Corporate Website
**Version:** 1.0
**Last Updated:** May 2026
**Owner:** UnitForce Technologies

---

## 1. System Architecture

```
Browser
  │
  ├── Static pages (SSG/SSR via Next.js)
  │     ├── / (home)
  │     ├── /about
  │     ├── /services
  │     ├── /careers
  │     ├── /contact
  │     └── /jobs
  │
  └── API Route (serverless function)
        └── POST /api/contact
              └── Resend API (email delivery)
```

The site is predominantly static — all page content is derived from the `UFT_DATA` constant at build time. No database is required. The only runtime server-side logic is the contact form API route.

---

## 2. Technology Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Next.js (App Router) | 16.2.4 |
| UI Library | React | 19.2.4 |
| Language | TypeScript | ^5 |
| Email | Resend SDK | ^6.12.3 |
| Fonts | Google Fonts (Inter, Instrument Serif, JetBrains Mono) | — |
| Styling | Pure CSS (custom properties, no CSS-in-JS) | — |
| Linting | ESLint + eslint-config-next | 16.2.4 |
| Runtime | Node.js | ≥ 20 |
| Package Manager | npm | — |

No UI component library (MUI, shadcn, etc.) is used. All components are written from scratch.

---

## 3. Project Structure

```
UFT-minimal/
├── Documentation/
│   ├── PRD.md                       ← Product Requirements Document
│   └── TRD.md                       ← This file
├── public/
│   ├── assets/                      ← Team photos, service/industry images
│   │   ├── team-*.jpg
│   │   ├── service-*.png
│   │   ├── industry-*.jpg/.png
│   │   ├── lau-*.jpg                ← Life at UFT collage
│   │   ├── president.png
│   │   └── ceo.png
│   ├── logos/                       ← Client logo PNGs
│   └── BG-Image-1.png
├── src/
│   ├── app/
│   │   ├── layout.tsx               ← Root layout: nav, footer, observers, fonts
│   │   ├── globals.css              ← @import styles.css, pages.css
│   │   ├── page.tsx                 ← Route `/` → renders home-page.tsx
│   │   ├── home-page.tsx            ← Homepage (client component)
│   │   ├── about/page.tsx           ← /about (server component)
│   │   ├── services/page.tsx        ← /services (server component)
│   │   ├── careers/page.tsx         ← /careers (server component)
│   │   ├── contact/page.tsx         ← /contact (client component — form state)
│   │   ├── jobs/page.tsx            ← /jobs (client component — filter state)
│   │   └── api/
│   │       └── contact/
│   │           └── route.ts         ← POST /api/contact
│   ├── components/
│   │   ├── layout/
│   │   │   ├── nav.tsx              ← Fixed navigation with scroll effects
│   │   │   └── footer.tsx           ← Site footer
│   │   ├── client-carousel.tsx      ← Infinite logo carousel
│   │   ├── testimonial-carousel.tsx ← 3-card testimonial slider
│   │   ├── stack-fade.tsx           ← Sticky stacking card effect (careers/contact)
│   │   ├── sticky-hero-fade.tsx     ← Hero fade-out on scroll (services/contact)
│   │   ├── sticky-expand.tsx        ← Horizontal leadership scroll (about)
│   │   ├── home-stack-fade.tsx      ← Stacking card effect (home)
│   │   ├── services-stack-fade.tsx  ← Stacking card effect (services)
│   │   ├── section-observer.tsx     ← IntersectionObserver for in-view classes
│   │   ├── button-persistence.tsx   ← CTA click state persistence via localStorage
│   │   ├── dynamic-years.tsx        ← Calculated year display (ops / client avg)
│   │   └── icons.tsx                ← SVG icon library
│   └── lib/
│       └── data.ts                  ← UFT_DATA constant + all TypeScript interfaces
├── styles.css                       ← Design tokens, global resets, nav, buttons, footer
├── pages.css                        ← Page-specific layouts, carousels, forms, dark mode
├── .env.local                       ← API keys (gitignored)
├── package.json
├── next.config.ts
└── tsconfig.json
```

---

## 4. Data Architecture

All site content lives in a single typed constant in `src/lib/data.ts`. There is no API or CMS fetch at runtime.

### 4.1 Core Interfaces

```typescript
interface Service {
  id: string;            // "talent" | "engineering" | "software" | "manufacturing" | "ai"
  title: string;
  tagline: string;
  desc: string;          // Short (used in home preview panel)
  descFull?: string;     // Long (used on /services page)
  capabilities: string[];
  flagship?: boolean;
  image?: string;        // Path under /public
}

interface Industry {
  id: string;
  name: string;
  blurb: string;
  image?: string;
}

interface TeamMember {
  name: string;
  role: string;
  photo: string;          // /assets/team-*.jpg or "[insert image]" placeholder
  photoPosition?: string; // CSS objectPosition
  photoScale?: number;    // CSS transform scale (1.0 = no zoom)
  bio: string;
  socials: {
    linkedin?: string;
    twitter?: string;
    facebook?: string;
  };
}

interface Location {
  city: string;
  region: string;
  address: string;
  tz: string;
  entity: string;
  photo?: string;
}

interface Stat {
  kpi: string;
  label: string;
  dynamicKey?: "ops_years" | "client_years";
}
```

### 4.2 Dynamic Values

`DynamicYears` component calculates values client-side:
- **`ops_years`**: `new Date().getFullYear() - 2003` (years in operation)
- **`client_years`**: hardcoded average based on internal data

---

## 5. Component Architecture

### 5.1 Rendering Model

| Component | Rendering | Reason |
|-----------|-----------|--------|
| `about/page.tsx` | Server Component | No interactivity; pure display |
| `services/page.tsx` | Server Component | Static content from UFT_DATA |
| `careers/page.tsx` | Server Component | Testimonials are static data |
| `contact/page.tsx` | Client Component (`"use client"`) | Form state management |
| `home-page.tsx` | Client Component | Active service/industry hover state |
| `jobs/page.tsx` | Client Component | Filter state |
| `nav.tsx` | Client Component | Scroll listeners, theme toggle |
| All carousel components | Client Component | DOM refs, event listeners |
| All StackFade components | Client Component | Scroll listeners via useEffect |

### 5.2 Key Animation Components

**`HomeStackFade` / `StackFade`**
- Uses `IntersectionObserver` + `scroll` event listeners
- Cards assigned `position: sticky; top: 88px`
- Calculates overlap between adjacent sticky cards to derive opacity
- `overflow-x: clip` (not `hidden`) on `html`/`body` — critical: `overflow: hidden` creates a scroll container that breaks `position: sticky`

**`StickyExpand` (Leadership)**
- Single sentinel `div` placed at the leadership section start
- `scrollY - sentinelTop` divided by spacer height (`450vh`) = `progress` (0→1)
- Phase 1 (`progress < 0.28`): section expands, all cards visible, green glow on all
- Phase 2 (`progress ≥ 0.28`): `translateX` moves card track left; glow index = `Math.round(progress × (n-1))`
- Glow: `box-shadow` with OKLch green at varying opacity layers

**Carousels (`ClientCarousel` / `TestimonialCarousel`)**
- Extended array: `[...last N, ...items, ...first N]` for seamless infinite loop
- `transform: translateX` written directly to DOM during drag (bypasses React re-render)
- Seam teleport: when index overflows, reset without animation in one RAF frame
- Drag threshold: 40px to trigger advance

---

## 6. API Specification

### POST `/api/contact`

**Request**
```json
{
  "name": "string (required)",
  "email": "string (required, valid email)",
  "company": "string (optional)",
  "topic": "string (one of: Talent Acquisition, Engineering Services, Software Services, Manufacturing Services, AI Services, General inquiry, Press / partnerships)",
  "message": "string (required)"
}
```

**Response — Success (200)**
```json
{ "ok": true }
```

**Response — Validation Error (400)**
```json
{ "error": "Missing required fields" }
```

**Response — Server Error (500)**
```json
{ "error": "Failed to send message" }
```

**Email Template**
- Subject: `Contact: {topic} — {name} ({company})`
- From: `info@uftech.in` (via Resend sender domain)
- To: `info@uftech.in`
- ReplyTo: submitter's email
- Body: HTML table with labelled rows; all inputs HTML-escaped via custom `escHtml()` function

**Security**
- All user-supplied values passed through `escHtml()` before rendering in HTML email body
- API keys stored in `.env.local` (gitignored)
- No user data is stored or logged

---

## 7. Design System

### 7.1 Color Tokens (CSS Custom Properties)

| Token | Dark Mode | Light Mode | Usage |
|-------|-----------|-----------|-------|
| `--bg` | `#0a0a0b` | `#fafafa` | Page background |
| `--bg-elev` | `#111113` | `#ffffff` | Elevated surfaces |
| `--bg-card` | `#202028` | `#ffffff` | Cards, sections |
| `--fg` | `#e8e8e5` | `#0c0c0a` | Primary text |
| `--fg-muted` | `#c8c8c6` | `#3a3a38` | Secondary text |
| `--fg-dim` | `#9a9a98` | `#6a6a68` | Tertiary / placeholders |
| `--border` | `#2e2e32` | `#d4d4d0` | Dividers, card borders |
| `--border-strong` | `#484850` | `#8a8a88` | Emphasis borders |
| `--accent` | `oklch(0.72 0.14 55)` | same | CTA colour (lime-green) |
| `--accent-soft` | `oklch(0.72 0.14 55 / 0.15)` | same | Glow fills, gradients |

### 7.2 Typography

| Scale | Font | Size | Weight |
|-------|------|------|--------|
| Display / h1 | Inter | `clamp(40px, 5.5vw, 88px)` | 500 |
| Section title | Inter | `clamp(28px, 3.5vw, 44px)` | 500 |
| Serif accent | Instrument Serif | inherits | 400 italic |
| Body | Inter | 16px | 400 |
| Muted body | Inter | 14–15px | 400 |
| Eyebrow | JetBrains Mono | 11px | 500, uppercase, 0.12em spacing |
| Caption / mono | JetBrains Mono | 11–13px | 400 |

### 7.3 Spacing & Layout

| Token | Value |
|-------|-------|
| Container max-width | 1280px |
| Container gutter | 32px (16px ≤ 600px) |
| Section padding | 88px vertical (56px ≤ 600px) |
| Nav height | 68px (60px ≤ 600px) |
| Border radius (default) | 4px |
| Border radius (lg) | 8px |
| Border radius (cards) | 16–24px |

### 7.4 Green Glow (Leadership / Button Animation)

```css
/* Green glow constant — used in StickyExpand and nav buttons */
box-shadow:
  0 0 0 2px oklch(0.72 0.18 145 / 0.6),
  0 0 32px oklch(0.72 0.18 145 / 0.55),
  0 0 64px oklch(0.72 0.18 145 / 0.3),
  0 12px 40px rgba(0,0,0,0.16),
  0 2px 8px rgba(0,0,0,0.08);
```

---

## 8. Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `RESEND_API_KEY` | Yes | Resend API key for email sending |
| `RESEND_FROM_EMAIL` | Yes | Sender display name + email (e.g. `UFT Security <info@uftech.in>`) |
| `RESEND_TO_EMAIL` | Yes | Internal recipient (e.g. `info@uftech.in`) |

Store in `.env.local` at the project root. This file is gitignored by default in all Next.js projects.

---

## 9. Responsive Breakpoints

| Breakpoint | Changes |
|------------|---------|
| `≤ 1100px` | Jobs sidebar moves above list; service card switches to single column; most grids collapse to 1 column |
| `≤ 900px` | Nav links hidden (explore overlay); footer 2 columns; overlay 1 column |
| `≤ 700px` | Stats/section headers to 1 column; field rows collapse; smaller heading sizes via `clamp()` |
| `≤ 600px` | Gutter 16px; nav height 60px; section padding 56px |
| `≤ 480px` | Hero stats 2×2 grid; single column for all grids; Life at UFT collage reflows to 2 columns then 1 |

---

## 10. Known Constraints & Technical Decisions

| Decision | Rationale |
|----------|-----------|
| `overflow-x: clip` (not `hidden`) on `html`/`body` | `overflow: hidden` creates a block formatting context that intercepts `position: sticky`, breaking the stacking card effects |
| No animation library | All animations use CSS `transition`, `@keyframes`, and direct DOM writes (`.style.transform`) for performance |
| No carousel library | Custom carousel logic avoids bundle weight; gives full control over infinite loop seam and drag physics |
| `"use client"` only where needed | Server components used by default on all static pages to reduce JS bundle |
| `UFT_DATA` as a static constant | Avoids API overhead for marketing content; data changes require a redeploy (acceptable at current scale) |
| Session storage for service click state | Persists which service was clicked across SPA navigation but resets on page reload (F5) |
| HTML-escaped email content | Prevents XSS in email client rendering |

---

## 11. Local Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
# → http://localhost:3000

# Build for production
npm run build

# Start production server
npm start

# Lint
npm run lint
```

**Required before running:** Create `.env.local` in the project root with the three environment variables listed in Section 8.

---

## 12. Deployment Notes

- Deploy to Vercel (recommended — zero-config Next.js support)
- Set all three environment variables in Vercel project settings
- The Resend sender domain (`uftech.in`) must be verified in the Resend dashboard for email delivery to work
- `public/assets/` images are served as static files; ensure all team photos and service images are committed or uploaded
- No database provisioning required

---

*End of Document*

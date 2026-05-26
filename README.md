# UFT.com — UnitForce Technologies Website

Official marketing website for [UnitForce Technologies](https://uft.com), built with Next.js 16 and React 19.

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router) |
| UI | React 19, TypeScript |
| Styling | Global CSS (`pages.css`, `globals.css`) |
| Fonts | Inter, Instrument Serif, JetBrains Mono (Google Fonts) |
| Email | Resend (contact form) |
| Hosting | — |

## Pages

| Route | Description |
|---|---|
| `/` | Home — hero, client carousel, services, industries, approach, CTA |
| `/about` | Company story, leadership team, values |
| `/services` | Full service offerings with stacked scroll sections |
| `/careers` | Culture, photo collage, open roles |
| `/jobs` | Individual job listings |
| `/contact` | Contact form (powered by Resend) |

## Project Structure

```
src/
  app/                  # Next.js App Router pages
    home-page.tsx       # Home page client component
    about/page.tsx
    services/page.tsx
    careers/page.tsx
    jobs/page.tsx
    contact/page.tsx
    layout.tsx          # Root layout (Nav, Footer, theme script)
  components/
    client-carousel.tsx     # Auto-advancing logo carousel with drag support
    testimonial-carousel.tsx
    sticky-expand.tsx       # Sticky scroll expand effect (about/careers)
    sticky-hero-fade.tsx    # Hero fade on scroll (services/careers)
    home-stack-fade.tsx     # Stacked card scroll fade (home)
    services-stack-fade.tsx
    stack-fade.tsx
    dynamic-years.tsx       # Auto-calculates years of experience from 2003
    section-observer.tsx    # Intersection observer for nav active state
    button-persistence.tsx  # Persists CTA button state across navigation
    icons.tsx               # SVG icon library
    layout/
      nav.tsx
      footer.tsx
  lib/
    data.ts             # All site content — services, industries, team, clients, stats
pages.css               # All component and page styles
public/
  assets/               # Team photos, industry/service images, office photos
  logos/                # Client logo PNGs
```

## Content Management

All copy, team bios, service descriptions, client logos, and stats live in [`src/lib/data.ts`](src/lib/data.ts). Edit that file to update site content without touching any page components.

Key data arrays:
- `UFT_DATA.services` — service cards (home + services page)
- `UFT_DATA.industries` — industry rows (home + services page)
- `UFT_DATA.clients` — logo carousel
- `UFT_DATA.team` — leadership cards (about page)
- `UFT_DATA.stats` — hero stat bar

## Development

```bash
npm install
npm run dev       # http://localhost:3000
npm run build
npm run start
```

## Theme

The site supports dark/light mode. The default is dark. Theme preference is persisted in `localStorage` under the key `uft-theme` and applied via `data-theme` on `<html>`.

## Environment Variables

Create a `.env.local` file for the contact form with your Resend API key and destination email address.

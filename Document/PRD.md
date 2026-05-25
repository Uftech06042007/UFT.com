# Product Requirements Document (PRD)

**Project:** uftech.com — UnitForce Technologies Corporate Website
**Version:** 1.0
**Last Updated:** May 2026
**Owner:** UnitForce Technologies

---

## 1. Executive Summary

The UFT website is the primary digital presence for UnitForce Technologies, a technology services company founded in 2003 with international headquarters in Bengaluru, India. The website serves as a marketing, recruitment, and lead-generation platform — positioning UFT as a premium partner for enterprises seeking engineering, software, talent, manufacturing, and AI services.

The site must communicate UFT's 23-year track record, global delivery capability, and domain depth across regulated industries with a design quality that matches enterprise expectations.

---

## 2. Business Objectives

| # | Objective | Success Metric |
|---|-----------|----------------|
| 1 | Generate qualified inbound leads via the contact form | Contact form submissions delivered to `info@uftech.in` |
| 2 | Establish credibility with enterprise decision-makers | Time-on-site, scroll depth on Services & About pages |
| 3 | Attract high-quality candidates across 10+ role types | Job listing page visits, apply-button clicks |
| 4 | Communicate service breadth clearly | Engagement with all 5 service categories |
| 5 | Reflect UFT's brand quality through modern design | Consistent dark/light theme, animation fidelity |

---

## 3. Target Audience

### Primary — Enterprise Buyer
- **Role:** CTO, VP Engineering, Head of HR, Procurement Lead
- **Need:** Reliable partner for tech staffing, software build, or engineering outsourcing
- **Behaviour:** Scans quickly, validates credibility through client logos, testimonials, and case examples; looks for a direct contact path

### Secondary — Candidate / Job Seeker
- **Role:** Software Engineer, Embedded Engineer, SAP Consultant, Talent Recruiter, AI Specialist, Mechanical Engineer, PLM Analyst, Operations/Finance professional
- **Need:** Understand company culture, open roles, and how to apply
- **Behaviour:** Reads the Careers page, checks leadership, scans job listings

### Tertiary — Partner / Press
- **Role:** Journalist, potential business partner
- **Need:** Company background, contact details, social links

---

## 4. Pages & Feature Requirements

### 4.1 Home Page (`/`)

| Feature | Requirement |
|---------|-------------|
| Hero | Full-viewport headline with animated serif accent line on second row |
| Hero subtitle | Industry list with correct capitalisation: Automotive, Aerospace, BFSI, Oil & Gas, Pharmacy, FMCG |
| Hero CTA card | Floating card with sub-text, two CTAs (Our services, Talk to us); must match section card styling in dark mode |
| Stats bar | 4 KPIs — employees (400+), man-hours (4.5M+), operational years (dynamic, since 2003), avg client years (dynamic) |
| Clients strip | Infinite auto-scrolling marquee of client logos; trusted-by label above |
| Services section | Interactive list: hover/click row to update preview panel; row highlights with accent colour; each row has a service-specific SVG icon that animates (scale + rotate) on hover |
| Industries section | Same interactive row + preview pattern; dot-arrow SVG animates on hover |
| How We Work | 4-step approach grid with title-cased step names |
| CTA card | Full-width bottom card: "Have a brief? Let's read it." with two CTAs |
| Scroll stacking | All sections above animate as sticky stacking cards on scroll via `HomeStackFade` |

### 4.2 About Page (`/about`)

| Feature | Requirement |
|---------|-------------|
| Story section | Two-column: prose (history, practices, certifications) + stats grid |
| Values grid | 4 value cards — Reliable & Trusted, Cost-effective Pricing, Customized Solutions, Mature Delivery |
| Leadership section | Horizontal scroll carousel of 9 team member cards in this order: P. L. Somashekar, N. S. Natesh, Gayathri Murthy, Chitkala Raghunath, Nanditha D N, Pavithra H.D, Sujita K, Prasanna K, Balaji B S |
| Leadership cards | Polaroid-style: photo (232×232, `objectFit: cover`) + name + role + bio + social links |
| Leadership scroll effect | `StickyExpand`: section sticks while scroll progresses; green glow moves left-to-right across cards; footer visible only after final card glows |
| Social links | All LinkedIn/Twitter/Facebook links open in new tab (`target="_blank"`) |
| Leadership spacer | 450vh scroll space for the horizontal animation |

### 4.3 Services Page (`/services`)

| Feature | Requirement |
|---------|-------------|
| Page hero | Title: "What we do, end to end." |
| Sticky hero | Hero fades out as first service card scrolls in (`StickyHeroFade`) |
| Service cards | 5 cards in order: Talent Acquisition, Engineering Services, Software Services, Manufacturing, AI; 2-col grid layout |
| Each card | Section number (01–05), title, tagline, full description, capabilities chips, image |
| Capabilities | Full list per service; Talent Acquisition: Contract Staffing first, Hire-Train-Deploy second, Campus Hiring third, then remainder |
| Image | Branded card with white frame, rounded image, 4:3 aspect ratio |
| Responsive | Single-column below 960px |

### 4.4 Careers Page (`/careers`)

| Feature | Requirement |
|---------|-------------|
| Page hero | Headline: "Build the things that build everything else." |
| Hero sub-text | Plain prose listing 10 role types: Software Engineers, Embedded Engineers, SAP Consultants, Talent Recruiters, AI Specialists, Mechanical Engineers, PLM Analysts, Operations Managers, Business Analysts, Finance Professionals |
| CTAs | "Find your next role" (external `uftech.in/jobs`), "Talk to a recruiter" (`/contact`) |
| Testimonial carousel | 15 client testimonials; 3-card view, centre card highlighted; drag/swipe; auto-advance 5s; range slider at bottom — slider is white in dark mode |
| Life at UFT | 8-image photo collage with asymmetric CSS grid layout |
| Stack effect | Testimonials and collage sections stack on scroll via `StackFade` |

### 4.5 Contact Page (`/contact`)

| Feature | Requirement |
|---------|-------------|
| Page hero | Headline: "Tell us what you're trying to build." |
| Contact form | Fields: Name (required), Email (required, type=email), Company (optional), Topic (select from 5 services + General / Press), Message (required, 6-row textarea) |
| Form submission | POST to `/api/contact`; button states: idle → "Sending…" → "Sent — we'll be in touch ✓" (5s) or error message |
| Email delivery | Resend API; from `info@uftech.in`, to `info@uftech.in`, replyTo set to submitter's email |
| Contact aside | Direct: email (`info@uftech.in`) and 2 phone numbers; Social: LinkedIn, Twitter, Facebook |
| Phone numbers | +91 8951390893 and +91 8951003881 |
| Location cards | 4 offices: Bengaluru (HQ), Mumbai, Charlotte USA, Dubai |
| Sticky hero | Hero fades out on scroll |

### 4.6 Jobs Page (`/jobs`)

| Feature | Requirement |
|---------|-------------|
| Search | Field selector (all fields or specific) + keyword text input |
| Sidebar filters | Job type (checkbox), Location (checkbox), Department (checkbox), Experience level (checkbox), Salary range (checkbox) |
| Job cards | Title, department tag, location, type, salary, skills chips, description excerpt, Apply button |
| Real-time filtering | Filter state applied to all visible jobs without page reload |
| Responsive | Sidebar moves above list on mobile |

### 4.7 Global Navigation

| Feature | Requirement |
|---------|-------------|
| Logo | "UFT" wordmark + "UNITFORCE TECHNOLOGIES" — white in dark mode |
| Links | Home, About, Services, Careers, Contact |
| Active indicator | Animated pill that slides between links |
| Hover | Semi-transparent outline pill on hover |
| Jobs button | Persistent state: green accent + glow if clicked; clears on page reload |
| Explore button | Same persistence behaviour |
| Theme toggle | Black border/icon in light mode; white bold border/icon in dark mode; pop animation on click |
| Scroll behaviour | Hides on scroll down (>6px delta), reappears on scroll up |
| Mobile | Links hidden; explore overlay expands to full-screen 3-col grid |

### 4.8 Footer

| Feature | Requirement |
|---------|-------------|
| Columns | Logo + tagline + socials, Services, Industries, Company, Contact |
| Social links | LinkedIn, Twitter, Facebook — all open in new tab |
| Copyright | Dynamic year + entity name |

---

## 5. Non-Functional Requirements

### 5.1 Performance
- Lighthouse Performance score ≥ 85 on desktop
- First Contentful Paint < 2.5s
- Images served via Next.js `<Image>` with lazy loading; `fetchPriority="low"` on non-hero images
- Animations use `requestAnimationFrame` and `will-change: transform` where applicable

### 5.2 Accessibility
- All interactive elements keyboard-accessible
- Meaningful `alt` text on all images
- `aria-hidden="true"` on decorative SVGs
- Colour contrast ratio ≥ 4.5:1 for body text
- Form fields have visible labels

### 5.3 SEO
- Each page has a unique `<title>` and `<meta name="description">`
- Semantic HTML structure (h1→h4 hierarchy respected per page)
- `next/image` for all static images (automatic WebP conversion)
- Smooth scroll (`scroll-behavior: smooth`)

### 5.4 Browser Support
- Chrome, Edge, Firefox, Safari — latest 2 versions
- Mobile Safari (iOS 15+), Chrome Android

### 5.5 Responsiveness
- Fully functional at 320px–2560px viewport widths
- Five defined breakpoints: 480px, 600px, 700px, 900px, 1100px

### 5.6 Theme
- Dark mode is the default rendering
- Light mode persisted via `localStorage` key `uft-theme`
- All components and text must be legible in both modes

---

## 6. Out of Scope (v1.0)

- CMS / content management backend
- User authentication or login
- Blog or news section
- Live job application submission (current "Apply" button links to external portal)
- Analytics integration (e.g. GA4)
- A/B testing framework
- Multi-language / i18n support

---

*End of Document*

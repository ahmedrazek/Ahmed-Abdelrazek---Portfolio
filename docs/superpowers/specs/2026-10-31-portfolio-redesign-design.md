# Portfolio redesign — design

Date: 2026-10-31
Status: approved in conversation, pending written-spec review

## Goal

Replace the 2024 ITI-era portfolio with a site that presents Ahmed as a
**senior backend engineer who owns full-stack and AI projects end to end**.

Audience is both:

- **Recruiters and hiring managers** for senior backend / AI roles (primary CTA: "See my work", "Download CV")
- **Freelance clients** (secondary CTA: "Start a project" in the Work with me section)

Success looks like: a recruiter landing on the page understands within one
screen what Ahmed does and at what level, can open any project for detail, and
can download the CV or get in touch without scrolling back up.

## Decisions

| Topic | Decision |
|---|---|
| Visual direction | **C · Bold** — dark background, glowing purple/blue gradient blobs, huge uppercase type, scroll animations (evolution of the current site) |
| Structure | **One page.** Project detail opens in a dialog, no per-project routes |
| Build approach | **Rebuild inside this repo**, keep Next.js + Tailwind + Framer Motion + Lenis |
| Projects | Released projects named with screenshots; unreleased projects anonymous |
| Old side projects | Removed (Spotify clone, Airbnb clone, BookNet x2, e-commerce API) |
| Next.js | Upgrade 14.1.4 → latest 14.2.x patch (security fixes, no code changes) |

## Page sections (top to bottom)

1. **Nav** — "AA." mark; links Work · Experience · About · Contact; "Download CV" button. Collapses to a menu on mobile.
2. **Hero** — "Hello, I'm Ahmed" / **SENIOR BACKEND ENGINEER** / "I own products end to end: backend, full-stack and AI." Buttons: *See my work* (→ #work), *Let's talk* (→ #contact). Photo, gradient blobs.
3. **Proof strip** — three facts:
   - 3 years shipping production systems
   - 6 products built (not "in production": the food safety platform is unreleased)
   - 5 payment gateways integrated (Tap, MyFatoorah, Tamara, Stripe, PayTabs)
4. **Skills ticker** — existing ParallaxText band with updated skills: Node.js, NestJS, TypeScript, PostgreSQL, MongoDB, MySQL, Redis, BullMQ, AWS, Docker, React, Next.js, Claude API, LangChain, MCP, Grafana. Drops C++, AngularJS, Figma, Sass, Redux, HTML, CSS.
5. **Selected work** (`#work`) — 6 cards in a grid. Card: cover image, name, one-line summary, stack tags. Click opens a dialog: role + dates, the problem, what I built (3–5 points), stack, live link (when public), extra screenshots.
6. **What I own** — three columns:
   - **Backend:** APIs, payments, webhooks, queues, multi-tenancy, observability (Grafana)
   - **Full-stack:** React/Next.js portals and dashboards; deploys on AWS, DigitalOcean, Vercel
   - **AI:** Claude API, LangChain, tool calling, MCP servers, AI agents
7. **Experience** (`#experience`) — timeline, one line per role (wording matches LinkedIn):
   - Sahl Solutions — Senior Software Engineer — Aug 2026–present
   - Camino — Lead Full Stack Engineer (part-time) — Mar 2026–present
   - Scalvo (Otomatika.ai) — Software Engineer — Jun 2025–Jul 2026
   - Red Software Development — Software Engineer — Jun 2024–Jun 2025
   - Upwork — Freelance MERN developer — Jan 2024–Jun 2025
8. **Work with me** — three offers + *Start a project* (→ #contact):
   - Build your product's backend end to end
   - Add AI to your product (LLM features, agents, MCP)
   - Fix and scale an existing backend (performance, security, monitoring)
9. **About** (`#about`) — photo + short dentist → engineer story (Assiut University dentistry, ~3 years practicing, ITI 9-month program 2023).
10. **Contact** (`#contact`) — EmailJS form (restyled) with visible sending / sent / failed states; email, phone (+20 100 503 8893), LinkedIn, GitHub, CV link.

### Projects

| # | Name shown | Source / role | Live link | Cover |
|---|---|---|---|---|
| 1 | **Camino** — travel & visa platform | Camino, lead full-stack | https://camino-sa.com | screenshot |
| 2 | **Droobna** — ride-hailing & food delivery | Sahl, main backend dev after takeover | https://droobnasa.com/ | screenshot |
| 3 | **Saldwich** — food ordering & loyalty, Claude in production | Sahl, backend | https://saldwich.com/ar | screenshot |
| 4 | **Tryautomatik** — AI marketing agent | Scalvo, backend/product | https://tryautomatik.com/ | screenshot |
| 5 | **Adlyfy** — marketing API integration SaaS | Scalvo, backend | none yet | designed cover until link/screenshots arrive |
| 6 | **Food safety compliance platform** (UpHold, anonymous) | Sahl, main backend dev | none | designed cover, never a screenshot |

Project detail copy is drawn from the LinkedIn descriptions written in this
session and from the CV. Rules: no client secrets, customer data, business
volumes or vulnerability specifics; no invented metrics.

## Code organization

```
src/
  content/
    types.ts        # Profile, Stat, Project, Capability, Role, Offer, Contact
    site.ts         # every word on the site; the only file to edit for content
  components/
    sections/
      nav.tsx  hero.tsx  proof-strip.tsx  skills-ticker.tsx
      work.tsx  project-dialog.tsx  capabilities.tsx  experience.tsx
      work-with-me.tsx  about.tsx  contact.tsx
    ui/             # kept: SlideIn, TextReveal, Transition, ParallaxText,
                    # SectionHeading, Button, Input/Textarea, PageLoad
  app/
    page.tsx        # ~30 lines: renders sections in order from site.ts
    layout.tsx      # metadata, Open Graph image, providers
public/
  ahmed.jpg                       # renamed from "WhatsApp Image 2023-04-10…jpg"
  ahmed-abdelrazek-cv.pdf         # provided by Ahmed
  projects/<slug>/cover.png       # + optional 2.png, 3.png
  og.png                          # share preview
```

- `site.ts` is typed against `types.ts`, so a missing or misspelled field fails the build.
- Project covers: when `public/projects/<slug>/cover.png` is absent (or the project is anonymous), the card renders a designed cover (name, icon, gradient). Adding the file later swaps it in with no code change.
- Kept: Lenis smooth scroll, custom cursor, page-load intro, EmailJS (`NEXT_PUBLIC_SERVICE_ID`, `NEXT_PUBLIC_TEMPLATE_ID`, `NEXT_PUBLIC_PUBLIC_KEY`).
- Removed: `testimonials.tsx` (fake template review), `filters.tsx`, `utils/project-context.tsx`, old `header.tsx` / `experience.tsx` / `about.tsx` / `hero.tsx` / `projects.tsx`, `ui/hover-image-link.tsx`, `ui/infinite-scroll.tsx` if unused, old clone screenshots, the template S3 `remotePatterns` entry in `next.config.mjs`, unused `os` import.

## Screenshots

- Captured by Claude in the browser pane from the four public sites, desktop (1440 wide) and mobile (375 wide), saved under `public/projects/<slug>/`.
- Adlyfy: link or screenshots from Ahmed; designed cover until then.
- Droobna / Saldwich app screenshots: optional, from Ahmed's phone using a test account (no real customer data).

## Inputs from Ahmed (none block the build)

- Current CV as PDF (Download CV links to it; until then the button links to LinkedIn)
- Optional newer photo
- Adlyfy link or screenshots
- Optional app screenshots for Droobna and Saldwich

## Quality

- Responsive: works at 375px and desktop, no horizontal scroll.
- Motion respects `prefers-reduced-motion`.
- Project dialog: Esc closes, focus is trapped while open and returned on close, keyboard operable.
- All images have alt text; semantic headings in order.
- Metadata: title "Ahmed Abdelrazek — Senior Backend Engineer", description, Open Graph + Twitter image.

## Verification

- `npm run lint` and `npm run build` pass.
- Run locally and check every section in the browser at desktop and 375px: nav links scroll to sections, all 6 dialogs open/close, live links work, contact form shows its states.

## Delivery

- Work happens on the current branch (`main`), committed in steps.
- Vercel deploys on push; **nothing is pushed until Ahmed says so.**

## Out of scope

- Per-project pages / routes, blog, CMS, i18n (Arabic version), analytics.

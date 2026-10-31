# Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the one-page portfolio so it presents Ahmed as a senior backend engineer who owns full-stack and AI projects end to end.

**Architecture:** All copy lives in one typed content module (`src/content/site.ts`); `src/app/page.tsx` is a server component that resolves which images exist on disk and renders one client component per section. Existing animation primitives (`src/components/ui`), Lenis, cursor and EmailJS are reused; template leftovers are deleted.

**Tech Stack:** Next.js 14.2 (app router), React 18, TypeScript, Tailwind 3, Framer Motion 11, Lenis, EmailJS, lucide-react, Vitest (new, tests only).

**Spec:** `docs/superpowers/specs/2026-10-31-portfolio-redesign-design.md`

## Global Constraints

- Visual direction: dark background, purple (`#7c3aed`) / blue (`#0ea5e9`) gradient blobs, huge uppercase headings, scroll animations. Keep the existing `.blob` class and Poppins font.
- One page only. Section anchors: `#work`, `#experience`, `#about`, `#contact`.
- Next.js pinned to `14.2.35`, `eslint-config-next` `14.2.35`.
- No invented metrics, no client secrets, customer data, business volumes or vulnerability specifics in copy.
- The food safety platform is anonymous: never named "UpHold", never has a screenshot or live link.
- Proof strip says "6 products built" (not "in production").
- Phone: `+20 100 503 8893`. Email: `ahmedrazek97@gmail.com`. LinkedIn: `https://www.linkedin.com/in/ahmed-abdelrazek-khalifa/`. GitHub: `https://github.com/ahmedrazek`.
- External links open in a new tab with `rel="noopener noreferrer"`.
- Motion respects `prefers-reduced-motion`.
- Work on `main`, commit per task, **never push**.

## Review Focus

- A project with no `cover.png` on disk (Adlyfy today, any project before screenshots exist) must render the designed cover, not a broken image → test in Task 3.
- The CV PDF is not in `public/` yet → "Download CV" must fall back to LinkedIn, not 404 → test in Task 3.
- EmailJS env vars missing (local dev, Vercel preview) → form shows a failed state with a mailto fallback instead of a silent `console.log` → test in Task 7.
- Opening a project dialog on a phone while Lenis is running → page behind must not scroll; Esc and the close button close it and focus returns to the card → browser check in Task 5.
- Visitor with reduced motion enabled → no parallax drift or page-load intro → browser check in Task 4.

---

### Task 1: Upgrade Next.js and add Vitest

**Files:**
- Modify: `package.json`, `package-lock.json`
- Create: `vitest.config.ts`

- [ ] **Step 1: Upgrade and install**

Run: `npm i next@14.2.35 && npm i -D eslint-config-next@14.2.35 vitest@2.1.9`

- [ ] **Step 2: Add test script and config**

`package.json` scripts: add `"test": "vitest run"`. `vitest.config.ts`: node environment, `resolve.alias` `@` → `./src`, `include: ["src/**/*.test.ts"]`.

- [ ] **Step 3: Verify the current site still builds**

Run: `npm run build`
Expected: build succeeds (warnings allowed). Run: `npx vitest run --passWithNoTests` → exits 0.

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json vitest.config.ts
git commit -m "chore: upgrade next to 14.2.35 and add vitest"
```

---

### Task 2: Content model and site copy

**Files:**
- Create: `src/content/types.ts`, `src/content/site.ts`
- Test: `src/content/site.test.ts`

**Interfaces:**
- Produces (`types.ts`):
  ```ts
  export type Stat = { value: string; label: string };
  export type Project = {
    slug: string; name: string; anonymous: boolean;
    role: string; period: string; summary: string; problem: string;
    built: string[]; stack: string[]; liveUrl?: string;
  };
  export type Capability = { title: "Backend" | "Full-stack" | "AI"; items: string[] };
  export type Role = { company: string; title: string; period: string; line: string };
  export type Offer = { title: string; detail: string };
  export type Profile = { name: string; greeting: string; title: string; tagline: string; photo: string; about: string[] };
  export type Contact = { email: string; phone: string; linkedin: string; github: string; cvPath: string };
  export type Site = { profile: Profile; stats: Stat[]; skills: string[]; projects: Project[];
    capabilities: Capability[]; experience: Role[]; offers: Offer[]; contact: Contact };
  ```
- Produces (`site.ts`): `export const site: Site`

- [ ] **Step 1: Write the failing tests** in `src/content/site.test.ts`

```ts
import { site } from "./site";
const all = JSON.stringify(site);

test("projects in agreed order", () => {
  expect(site.projects.map(p => p.slug)).toEqual(
    ["camino", "droobna", "saldwich", "tryautomatik", "adlyfy", "food-safety"]);
});
test("food safety project stays anonymous", () => {
  const p = site.projects.find(p => p.slug === "food-safety")!;
  expect(p.anonymous).toBe(true);
  expect(p.liveUrl).toBeUndefined();
  expect(p.name).toBe("Food safety compliance platform");
});
test("exactly one anonymous project; every live link is https", () => {
  for (const p of site.projects) if (p.liveUrl) expect(p.liveUrl).toMatch(/^https:\/\//);
  expect(site.projects.filter(p => p.anonymous)).toHaveLength(1);
});
test("each project has 3-5 built points and a stack", () => {
  for (const p of site.projects) {
    expect(p.built.length).toBeGreaterThanOrEqual(3);
    expect(p.built.length).toBeLessThanOrEqual(5);
    expect(p.stack.length).toBeGreaterThan(0);
  }
});
test("proof strip", () => {
  expect(site.stats).toEqual([
    { value: "3 years", label: "shipping production systems" },
    { value: "6 products", label: "built" },
    { value: "5 payment gateways", label: "integrated: Tap, MyFatoorah, Tamara, Stripe, PayTabs" },
  ]);
});
test("no template leftovers or forbidden names", () => {
  for (const bad of ["Sarah Johnson", "Scalvio", "UpHold", "Lorem", "40%", "MEARN", "AngularJs"])
    expect(all).not.toContain(bad);
});
test("skills updated", () => {
  for (const s of ["NestJS", "PostgreSQL", "Redis", "Claude API", "LangChain", "MCP"]) expect(site.skills).toContain(s);
  for (const s of ["C++", "AngularJS", "Figma"]) expect(site.skills).not.toContain(s);
});
test("experience order", () => {
  expect(site.experience.map(r => r.company)).toEqual(
    ["Sahl Solutions", "Camino", "Scalvo (Otomatika.ai)", "Red Software Development", "Upwork"]);
});
test("contact", () => {
  expect(site.contact).toMatchObject({ email: "ahmedrazek97@gmail.com", phone: "+20 100 503 8893",
    cvPath: "/ahmed-abdelrazek-cv.pdf" });
});
```

- [ ] **Step 2: Run to verify failure**

Run: `npm test` → FAIL, cannot resolve `./site`.

- [ ] **Step 3: Write `types.ts` and `site.ts`** with this copy (exact):

**profile**: name `Ahmed Abdelrazek`; greeting `Hello, I'm Ahmed`; title `Senior Backend Engineer`; tagline `I own products end to end: backend, full-stack and AI.`; photo `/ahmed.jpg`; about (3 paragraphs):
1. `I'm a senior backend engineer, and most of my work starts after the code is merged. I own systems in production: I watch the metrics, set up monitoring with Grafana, chase down bugs when something breaks, and write up what went wrong so it doesn't happen again.`
2. `I didn't start in tech. I studied dentistry at Assiut University and worked as a dentist for almost three years. In 2023 I switched careers, joined ITI's 9-month program, and I've been building backends and full-stack systems ever since.`
3. `Right now I'm at Sahl Solutions working on apps for the Saudi market, and I lead development at Camino, a travel and visa company in Riyadh.`

**skills**: Node.js, NestJS, TypeScript, PostgreSQL, MongoDB, MySQL, Redis, BullMQ, AWS, Docker, React, Next.js, Claude API, LangChain, MCP, Grafana.

**projects** (role · period · liveUrl · summary · problem · built · stack):

- `camino` "Camino" — Lead Full Stack Engineer · Mar 2026 – present · https://camino-sa.com
  - summary: `Travel and visa platform for a Riyadh-based travel company.`
  - problem: `Camino runs group trips and visa applications and needed one platform for bookings, payments and visa processing.`
  - built: `Visa application system built from scratch: a 9-stage processing pipeline, an operations dashboard and WhatsApp status updates.` / `Visa photo capture with in-browser face detection (MediaPipe) that checks quality and crops to the required size.` / `An MCP server that lets the team ask an AI assistant about trips, bookings, visas and payments, read-only.` / `Booking and payments with deposits, installments, coupons and a wallet, on MyFatoorah and Tamara, synced to Daftra.` / `Infrastructure on DigitalOcean and Vercel, with server-side analytics.`
  - stack: Node.js, Express, MySQL, React, TypeScript, Tailwind, MCP, DigitalOcean
- `droobna` "Droobna" — Backend Engineer · Sahl Solutions · Aug 2026 – present · https://droobnasa.com/
  - summary: `Ride-hailing app for the Saudi market that also runs food delivery on the same drivers.`
  - problem: `I took over a backend built by an outsourced team and had to make it safe before building on it.`
  - built: `Hardened the codebase: authorized socket rooms, rate limiting, secrets out of the logs, fare calculation moved to the server.` / `Per-admin permissions with an audit log of every admin action.` / `Ride analytics on Saudi local time with Excel export.` / `A notification feed with deep links and read state.` / `An OpenAPI spec generated from the Express routes and Zod schemas.`
  - stack: Node.js, Express, PostgreSQL, Prisma, Redis, BullMQ, Socket.IO, Zod
- `saldwich` "Saldwich" — Backend Engineer · Sahl Solutions · Aug 2026 – present · https://saldwich.com/ar
  - summary: `Food ordering, loyalty and wallet app for a Saudi restaurant chain.`
  - problem: `Money moves between the POS, the payment gateway and the wallet, and every flow has to stay correct when webhooks fail or arrive twice.`
  - built: `Loyalty points with an expiry ledger, and a customer wallet.` / `POS (Foodics) and payment (Tap, Apple Pay) integrations with idempotent, HMAC-verified webhooks and retries.` / `Support-ticket classification on the Claude API with tool calling, a prompt-injection check and a test set every prompt change must pass.` / `In-app Stories CMS and abandoned-cart reminders.`
  - stack: NestJS, MongoDB, Redis, BullMQ, AWS, Claude API
- `tryautomatik` "Tryautomatik" — Backend Engineer · Scalvo · Jun 2025 – Jul 2026 · https://tryautomatik.com/
  - summary: `AI marketing agent that works across a user's ad platforms.`
  - problem: `The agent had to act on users' ad accounts, not just answer questions about them.`
  - built: `Replaced direct marketing API integrations with LangChain tools, so the agent calls external APIs on the user's behalf.` / `A queue-based pipeline handling tens of thousands of marketing API documents a day.` / `Fixed N+1 queries and batched requests to cut response time.` / `Stripe subscription billing.`
  - stack: NestJS, PostgreSQL, React, LangChain, Stripe
- `adlyfy` "Adlyfy" — Backend Engineer · Scalvo · Jun 2025 – Jul 2026 · no liveUrl
  - summary: `Marketing API platform that connects Google, Meta and TikTok ads in one place.`
  - problem: `Every ad platform has its own API, limits and data shape, and agencies needed one layer over all of them.`
  - built: `A portal and API layer over the Google, Meta and TikTok marketing APIs.` / `Redis caching, job queues and rate limiting to stay inside each platform's limits.` / `AWS setup (ECR, ALB across two instances) with rolling deploys for zero downtime.` / `Observability with Grafana Cloud, later used by other internal products.`
  - stack: NestJS, PostgreSQL, MongoDB, React, Redis, AWS, Grafana
- `food-safety` "Food safety compliance platform" (anonymous) — Main Backend Developer · Sahl Solutions · Sep 2026 – present
  - summary: `Multi-tenant SaaS for running food safety audits across branches and kitchens.`
  - problem: `Each customer company needs its own data, roles and audit templates, plus a mobile app for inspectors.`
  - built: `Multi-tenancy with a deny-by-default permissions model.` / `An audit checklist engine with weighted scoring.` / `Scheduling that respects each country's time zone, and the inspectors' mobile API.` / `OCR on supplier invoices with Google Cloud Vision, plus PDF and Excel reports.`
  - stack: NestJS, PostgreSQL, TypeORM, Google Cloud Vision

**capabilities**: Backend — `APIs and data models`, `Payments and wallets`, `Webhooks and queues`, `Multi-tenancy and permissions`, `Observability with Grafana`; Full-stack — `React and Next.js portals`, `Admin dashboards`, `Deploys on AWS, DigitalOcean and Vercel`; AI — `Claude API`, `LangChain`, `Tool calling`, `MCP servers`, `AI agents`.

**experience**:
- Sahl Solutions · Senior Software Engineer · Aug 2026 – present · `Backend for client apps in Saudi Arabia: ride-hailing, food ordering and food safety.`
- Camino · Lead Full Stack Engineer · Mar 2026 – present · `Lead developer of a travel and visa platform: API, website, internal tools and servers.`
- Scalvo (Otomatika.ai) · Software Engineer · Jun 2025 – Jul 2026 · `Backend for AI marketing products: ad platform integrations, AI reports and an AI agent.`
- Red Software Development · Software Engineer · Jun 2024 – Jun 2025 · `Full-stack web apps for UK clients, including payments with Stripe, GoCardless and Clover.`
- Upwork · Freelance Developer · Jan 2024 – Jun 2025 · `Full-stack web apps for freelance clients.`

**offers**: `Build your product's backend` / `From data model to production: APIs, payments, integrations and deploys.`; `Add AI to your product` / `LLM features, agents and MCP servers that work with your real data.`; `Fix and scale an existing backend` / `Performance, security and monitoring for a codebase you inherited.`

**contact**: as in Global Constraints, `cvPath: "/ahmed-abdelrazek-cv.pdf"`.

- [ ] **Step 4: Run tests** → `npm test` PASS.

- [ ] **Step 5: Commit**

```bash
git add src/content
git commit -m "feat: add typed site content"
```

---

### Task 3: Media resolution (covers, gallery, CV)

**Files:**
- Create: `src/content/media.ts`
- Test: `src/content/media.test.ts`

**Interfaces:**
- Consumes: `Project`, `Contact` from Task 2
- Produces:
  ```ts
  export type ProjectMedia = { cover: string | null; gallery: string[] };
  export function resolveProjectMedia(project: Project, publicDir: string): ProjectMedia;
  export function resolveCvHref(contact: Contact, publicDir: string): string;
  ```
  Cover is `/projects/<slug>/cover.png` when that file exists and the project is not anonymous, else `null`. Gallery is files in the same folder named `<n>.png|jpg|webp`, sorted numerically, as public URLs. CV href is `contact.cvPath` when `<publicDir><cvPath>` exists, else `contact.linkedin`. Uses `node:fs`; must never throw when the folder is missing.

- [ ] **Step 1: Write failing tests** (use `fs.mkdtempSync(os.tmpdir())` as `publicDir`)

```ts
test("no folder → no cover, empty gallery", () =>
  expect(resolveProjectMedia(camino, tmp)).toEqual({ cover: null, gallery: [] }));
test("cover and numbered gallery", () => {
  // create projects/camino/cover.png, 10.png, 2.png, notes.txt
  expect(resolveProjectMedia(camino, tmp)).toEqual(
    { cover: "/projects/camino/cover.png", gallery: ["/projects/camino/2.png", "/projects/camino/10.png"] });
});
test("anonymous project ignores files on disk", () => {
  // create projects/food-safety/cover.png
  expect(resolveProjectMedia(foodSafety, tmp)).toEqual({ cover: null, gallery: [] });
});
test("cv falls back to linkedin", () => expect(resolveCvHref(site.contact, tmp)).toBe(site.contact.linkedin));
test("cv uses pdf when present", () => {
  // create ahmed-abdelrazek-cv.pdf
  expect(resolveCvHref(site.contact, tmp)).toBe("/ahmed-abdelrazek-cv.pdf");
});
```

- [ ] **Step 2: Run** `npm test` → FAIL (module missing).
- [ ] **Step 3: Implement `media.ts`.**
- [ ] **Step 4: Run** `npm test` → PASS.
- [ ] **Step 5: Commit** `git add src/content && git commit -m "feat: resolve project media and cv link from disk"`

---

### Task 4: Shell — layout, nav, hero, proof strip, skills ticker

**Files:**
- Modify: `src/app/layout.tsx`, `src/components/providers.tsx`, `src/components/smooth-scroll.tsx`
- Create: `src/components/sections/nav.tsx`, `hero.tsx`, `proof-strip.tsx`, `skills-ticker.tsx`
- Move: `public/WhatsApp Image 2023-04-10 at 01.54.20.jpg` → `public/ahmed.jpg` (`git mv`)

**Interfaces:**
- Consumes: `site`, `Profile`, `Stat` (Task 2); `ParallaxText`, `SlideIn`, `TextReveal`, `Transition`, `PageLoad` from `@/components/ui`
- Produces: `Nav({ cvHref }: { cvHref: string })`, `Hero({ profile }: { profile: Profile })`, `ProofStrip({ stats }: { stats: Stat[] })`, `SkillsTicker({ skills }: { skills: string[] })` — all default-free named exports, `"use client"` where they animate.

- [ ] **Step 1: Layout metadata** — title `Ahmed Abdelrazek — Senior Backend Engineer`, description = profile tagline, `openGraph` + `twitter` cards. The share image is generated by `src/app/opengraph-image.tsx` (`next/og` `ImageResponse`, 1200×630: dark background, purple/blue blob, name and title); Next wires it into the metadata automatically, so no static `og.png` is needed.
- [ ] **Step 2: Reduced motion** — wrap providers in Framer `MotionConfig reducedMotion="user"`; in `smooth-scroll.tsx` skip creating Lenis when `matchMedia("(prefers-reduced-motion: reduce)")` matches; `PageLoad` intro skipped under reduced motion.
- [ ] **Step 3: Sections** — Nav: "AA." mark, links Work/Experience/About/Contact to anchors, "Download CV" button (`href={cvHref}`, new tab), mobile menu below `md`. Hero: greeting, title in huge uppercase (last word at 40% white like the mockup), tagline, buttons "See my work" → `#work`, "Let's talk" → `#contact`, photo, two blobs. ProofStrip: three stats in a row (stack on mobile). SkillsTicker: two `ParallaxText` rows in opposite directions.
- [ ] **Step 4: Temporarily render them in `page.tsx`** above the old content (old sections stay until Task 8).
- [ ] **Step 5: Verify** — `npm run lint && npm run build` pass. `npm run dev`, open http://localhost:3000 in the browser pane: hero copy matches Task 2; at 375px no horizontal scroll; with `prefers-reduced-motion: reduce` emulated, the ticker does not drift and the page-load intro is skipped.
- [ ] **Step 6: Commit** `git add -A src public && git commit -m "feat: new nav, hero, proof strip and skills ticker"`

---

### Task 5: Selected work and project dialog

**Files:**
- Create: `src/components/sections/work.tsx`, `src/components/sections/project-dialog.tsx`

**Interfaces:**
- Consumes: `Project`, `ProjectMedia` (Tasks 2–3)
- Produces: `Work({ items }: { items: { project: Project; media: ProjectMedia }[] })` rendering `<section id="work">`; `ProjectDialog({ item, onClose }: { item: { project: Project; media: ProjectMedia } | null; onClose: () => void })`

- [ ] **Step 1: Work grid** — heading "Selected / work"; 3 columns desktop, 1 on mobile; each card is a `<button>` with cover (`next/image`) or, when `media.cover` is null, a designed cover: gradient (`#7c3aed` → `#0ea5e9`), project name, lucide icon per slug (camino `Plane`, droobna `Car`, saldwich `UtensilsCrossed`, tryautomatik `Bot`, adlyfy `BarChart3`, food-safety `ShieldCheck`). Below: name, summary, first 4 stack tags.
- [ ] **Step 2: Dialog** — `role="dialog"`, `aria-modal="true"`, `aria-labelledby` the title; content: cover/gallery, name, role · period, Problem, What I built (list), stack tags, "Visit live site" link when `liveUrl` (new tab). Esc and backdrop click close; focus moves to the close button on open, is trapped inside, and returns to the opening card on close; Lenis stopped (`lenis.stop()`/`start()` via the existing smooth-scroll context, or `overflow:hidden` on `html` if Lenis is off).
- [ ] **Step 3: Render** `Work` in `page.tsx`, building `items` with `resolveProjectMedia(p, path.join(process.cwd(), "public"))`.
- [ ] **Step 4: Verify** — lint + build pass. In the browser pane at desktop and 375px: all 6 cards show (designed covers for now); each dialog opens with correct copy; Esc, close button and backdrop close it; Tab never leaves the dialog; page behind does not scroll while open; focus returns to the card; Adlyfy and food safety show no "Visit live site".
- [ ] **Step 5: Commit** `git commit -am "feat: selected work grid and accessible project dialog"` (add new files first).

---

### Task 6: What I own, experience, work with me, about

**Files:**
- Create: `src/components/sections/capabilities.tsx`, `experience.tsx`, `work-with-me.tsx`, `about.tsx`

**Interfaces:**
- Produces: `Capabilities({ items }: { items: Capability[] })`, `Experience({ roles }: { roles: Role[] })` (`<section id="experience">`), `WorkWithMe({ offers }: { offers: Offer[] })` with "Start a project" → `#contact`, `About({ profile }: { profile: Profile })` (`<section id="about">`, photo + paragraphs).

- [ ] **Step 1: Implement the four sections** — capabilities as three columns (stack on mobile); experience as a vertical timeline (company, title, period, line); offers as three cards; about with sticky photo on desktop like the current `about.tsx`.
- [ ] **Step 2: Render in `page.tsx`** after `Work`, in spec order.
- [ ] **Step 3: Verify** — lint + build pass; browser check desktop and 375px, copy matches Task 2, nav links Experience/About scroll to the right sections.
- [ ] **Step 4: Commit** `git commit -m "feat: capabilities, experience, work-with-me and about sections"`

---

### Task 7: Contact with visible send states

**Files:**
- Create: `src/content/email-config.ts`, `src/content/email-config.test.ts`, `src/components/sections/contact.tsx`

**Interfaces:**
- Produces: `getEmailConfig(env: Record<string, string | undefined>): { serviceId: string; templateId: string; publicKey: string } | null` — reads `NEXT_PUBLIC_SERVICE_ID`, `NEXT_PUBLIC_TEMPLATE_ID`, `NEXT_PUBLIC_PUBLIC_KEY`; `null` if any is missing or blank. `Contact({ contact, cvHref }: { contact: ContactInfo; cvHref: string })` (import the type as `ContactInfo` to avoid the name clash), `<section id="contact">`.

- [ ] **Step 1: Failing tests**

```ts
test("all three present", () => expect(getEmailConfig({ NEXT_PUBLIC_SERVICE_ID: "s", NEXT_PUBLIC_TEMPLATE_ID: "t", NEXT_PUBLIC_PUBLIC_KEY: "k" }))
  .toEqual({ serviceId: "s", templateId: "t", publicKey: "k" }));
test("missing or blank → null", () => {
  expect(getEmailConfig({})).toBeNull();
  expect(getEmailConfig({ NEXT_PUBLIC_SERVICE_ID: "s", NEXT_PUBLIC_TEMPLATE_ID: " ", NEXT_PUBLIC_PUBLIC_KEY: "k" })).toBeNull();
});
```

- [ ] **Step 2: Run** → FAIL. **Step 3: Implement** `getEmailConfig`. **Step 4: Run** → PASS.
- [ ] **Step 5: Contact section** — heading "Interested in talking, / let's do it."; form fields keep the existing EmailJS names (`from_name`, `from_email`, `message` — check the old `contact-us.tsx`); status `"idle" | "sending" | "sent" | "failed"` shown under the button (`aria-live="polite"`); button disabled while sending; config `null` or send error → failed message with a `mailto:` link; success resets the form. Side column: email, phone, LinkedIn, GitHub, Download CV (`cvHref`).
- [ ] **Step 6: Verify** — lint + build pass; with no `.env.local`, submitting shows the failed state and mailto link.
- [ ] **Step 7: Commit** `git add src && git commit -m "feat: contact section with send states"`

---

### Task 8: Assemble page and remove the old site

**Files:**
- Rewrite: `src/app/page.tsx` (server component, ~30 lines)
- Modify: `next.config.mjs` (remove the S3 `remotePatterns`), `src/components/ui/index.ts` (drop removed exports)
- Delete: `src/components/{about,contact-us,experience,filters,header,hero,nav,projects,testimonials}.tsx`, `src/utils/project-context.tsx`, `src/utils/interfaces.ts` (if nothing imports it), `src/components/ui/hover-image-link.tsx`, `src/components/ui/infinite-scroll.tsx` (if unused), `src/components/ui/dialog.tsx`, `public/Screenshot *.png`

- [ ] **Step 1: `page.tsx`** — `const publicDir = path.join(process.cwd(), "public")`; compute `cvHref` and `items`; render Nav, Hero, ProofStrip, SkillsTicker, Work, Capabilities, Experience, WorkWithMe, About, Contact in that order.
- [ ] **Step 2: Delete old files**, then `grep -rn "project-context\|interfaces\|contact-us\|testimonials" src` → no matches.
- [ ] **Step 3: Verify** — `npm test && npm run lint && npm run build` all pass; page renders end to end in the browser pane.
- [ ] **Step 4: Commit** `git add -A && git commit -m "refactor: assemble new page and remove template leftovers"`

---

### Task 9: Project screenshots

**Files:**
- Create: `public/projects/{camino,droobna,saldwich,tryautomatik}/cover.png` (+ `2.png` mobile view)

- [ ] **Step 1: Capture** each live site at 1440×900 as `cover.png` and at 375×812 as `2.png`. Use headless Chrome if installed (`"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --hide-scrollbars --window-size=1440,900 --screenshot=<out> <url>`); otherwise capture in the browser pane. Dismiss nothing that needs consent; if a cookie banner or popup covers the page, report it instead of clicking.
- [ ] **Step 2: Inspect** each image (Read tool) — no personal data, not blank, not a loading screen. Drop any bad capture so the designed cover shows instead.
- [ ] **Step 3: Verify** — build passes; cards and dialogs show the screenshots; Adlyfy and food safety still show designed covers.
- [ ] **Step 4: Commit** `git add public/projects && git commit -m "feat: add project screenshots"`

---

### Task 10: Final check

- [ ] **Step 1:** `npm test && npm run lint && npm run build` — all pass.
- [ ] **Step 2:** Browser pane, desktop and 375px, top to bottom: every nav link lands on its section; all 6 dialogs; live links open in a new tab; Download CV goes to LinkedIn until the PDF is added; contact form failed state without env vars; reduced motion emulated.
- [ ] **Step 3:** Report results to Ahmed with screenshots of the hero and work section. Do not push.

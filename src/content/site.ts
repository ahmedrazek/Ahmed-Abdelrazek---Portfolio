import type { Site } from "./types";

export const site: Site = {
  profile: {
    name: "Ahmed Abdelrazek",
    greeting: "Hello, I'm Ahmed",
    title: "Senior Backend Engineer",
    tagline: "I own products end to end: backend, full-stack and AI.",
    photo: "/ahmed.jpg",
    about: [
      "I'm a senior backend engineer, and most of my work starts after the code is merged. I own systems in production: I watch the metrics, set up monitoring with Grafana, chase down bugs when something breaks, and write up what went wrong so it doesn't happen again.",
      "I didn't start in tech. I studied dentistry at Assiut University and worked as a dentist for almost three years. In 2023 I switched careers, joined ITI's 9-month program, and I've been building backends and full-stack systems ever since.",
      "Right now I'm at Sahl Solutions working on apps for the Saudi market, and I lead development at Camino, a travel and visa company in Riyadh.",
    ],
  },

  stats: [
    { value: "3 years", label: "shipping production systems" },
    { value: "6 products", label: "built" },
    {
      value: "5 payment gateways",
      label: "integrated: Tap, MyFatoorah, Tamara, Stripe, PayTabs",
    },
  ],

  skills: [
    "Node.js",
    "NestJS",
    "TypeScript",
    "PostgreSQL",
    "MongoDB",
    "MySQL",
    "Redis",
    "BullMQ",
    "AWS",
    "Docker",
    "React",
    "Next.js",
    "Claude API",
    "LangChain",
    "MCP",
    "Grafana",
  ],

  projects: [
    {
      slug: "camino",
      name: "Camino",
      anonymous: false,
      role: "Lead Full Stack Engineer",
      period: "Mar 2026 – present",
      liveUrl: "https://camino-sa.com",
      summary: "Travel and visa platform for a Riyadh-based travel company.",
      problem:
        "Camino runs group trips and visa applications and needed one platform for bookings, payments and visa processing.",
      built: [
        "Visa application system built from scratch: a 9-stage processing pipeline, an operations dashboard and WhatsApp status updates.",
        "Visa photo capture with in-browser face detection (MediaPipe) that checks quality and crops to the required size.",
        "An MCP server that lets the team ask an AI assistant about trips, bookings, visas and payments, read-only.",
        "Booking and payments with deposits, installments, coupons and a wallet, on MyFatoorah and Tamara, synced to Daftra.",
        "Infrastructure on DigitalOcean and Vercel, with server-side analytics.",
      ],
      stack: [
        "Node.js",
        "Express",
        "MySQL",
        "React",
        "TypeScript",
        "Tailwind",
        "MCP",
        "DigitalOcean",
      ],
    },
    {
      slug: "droobna",
      name: "Droobna",
      anonymous: false,
      role: "Backend Engineer · Sahl Solutions",
      period: "Aug 2026 – present",
      liveUrl: "https://droobnasa.com/",
      summary:
        "Ride-hailing app for the Saudi market that also runs food delivery on the same drivers.",
      problem:
        "I took over a backend built by an outsourced team and had to make it safe before building on it.",
      built: [
        "Hardened the codebase: authorized socket rooms, rate limiting, secrets out of the logs, fare calculation moved to the server.",
        "Per-admin permissions with an audit log of every admin action.",
        "Ride analytics on Saudi local time with Excel export.",
        "A notification feed with deep links and read state.",
        "An OpenAPI spec generated from the Express routes and Zod schemas.",
      ],
      stack: [
        "Node.js",
        "Express",
        "PostgreSQL",
        "Prisma",
        "Redis",
        "BullMQ",
        "Socket.IO",
        "Zod",
      ],
    },
    {
      slug: "saldwich",
      name: "Saldwich",
      anonymous: false,
      role: "Backend Engineer · Sahl Solutions",
      period: "Aug 2026 – present",
      liveUrl: "https://saldwich.com/ar",
      summary:
        "Food ordering, loyalty and wallet app for a Saudi restaurant chain.",
      problem:
        "Money moves between the POS, the payment gateway and the wallet, and every flow has to stay correct when webhooks fail or arrive twice.",
      built: [
        "Loyalty points with an expiry ledger, and a customer wallet.",
        "POS (Foodics) and payment (Tap, Apple Pay) integrations with idempotent, HMAC-verified webhooks and retries.",
        "Support-ticket classification on the Claude API with tool calling, a prompt-injection check and a test set every prompt change must pass.",
        "In-app Stories CMS and abandoned-cart reminders.",
      ],
      stack: ["NestJS", "MongoDB", "Redis", "BullMQ", "AWS", "Claude API"],
    },
    {
      slug: "tryautomatik",
      name: "Tryautomatik",
      anonymous: false,
      role: "Backend Engineer · Scalvo",
      period: "Jun 2025 – Jul 2026",
      liveUrl: "https://tryautomatik.com/",
      summary: "AI marketing agent that works across a user's ad platforms.",
      problem:
        "The agent had to act on users' ad accounts, not just answer questions about them.",
      built: [
        "Replaced direct marketing API integrations with LangChain tools, so the agent calls external APIs on the user's behalf.",
        "A queue-based pipeline handling tens of thousands of marketing API documents a day.",
        "Fixed N+1 queries and batched requests to cut response time.",
        "Stripe subscription billing.",
      ],
      stack: ["NestJS", "PostgreSQL", "React", "LangChain", "Stripe"],
    },
    {
      slug: "adlyfy",
      name: "Adlyfy",
      anonymous: false,
      role: "Backend Engineer · Scalvo",
      period: "Jun 2025 – Jul 2026",
      summary:
        "Marketing API platform that connects Google, Meta and TikTok ads in one place.",
      problem:
        "Every ad platform has its own API, limits and data shape, and agencies needed one layer over all of them.",
      built: [
        "A portal and API layer over the Google, Meta and TikTok marketing APIs.",
        "Redis caching, job queues and rate limiting to stay inside each platform's limits.",
        "AWS setup (ECR, ALB across two instances) with rolling deploys for zero downtime.",
        "Observability with Grafana Cloud, later used by other internal products.",
      ],
      stack: [
        "NestJS",
        "PostgreSQL",
        "MongoDB",
        "React",
        "Redis",
        "AWS",
        "Grafana",
      ],
    },
    {
      slug: "food-safety",
      name: "Food safety compliance platform",
      anonymous: true,
      role: "Main Backend Developer · Sahl Solutions",
      period: "Sep 2026 – present",
      summary:
        "Multi-tenant SaaS for running food safety audits across branches and kitchens.",
      problem:
        "Each customer company needs its own data, roles and audit templates, plus a mobile app for inspectors.",
      built: [
        "Multi-tenancy with a deny-by-default permissions model.",
        "An audit checklist engine with weighted scoring.",
        "Scheduling that respects each country's time zone, and the inspectors' mobile API.",
        "OCR on supplier invoices with Google Cloud Vision, plus PDF and Excel reports.",
      ],
      stack: ["NestJS", "PostgreSQL", "TypeORM", "Google Cloud Vision"],
    },
  ],

  capabilities: [
    {
      title: "Backend",
      items: [
        "APIs and data models",
        "Payments and wallets",
        "Webhooks and queues",
        "Multi-tenancy and permissions",
        "Observability with Grafana",
      ],
    },
    {
      title: "Full-stack",
      items: [
        "React and Next.js portals",
        "Admin dashboards",
        "Deploys on AWS, DigitalOcean and Vercel",
      ],
    },
    {
      title: "AI",
      items: [
        "Claude API",
        "LangChain",
        "Tool calling",
        "MCP servers",
        "AI agents",
      ],
    },
  ],

  experience: [
    {
      company: "Sahl Solutions",
      title: "Senior Software Engineer",
      period: "Aug 2026 – present",
      line: "Backend for client apps in Saudi Arabia: ride-hailing, food ordering and food safety.",
    },
    {
      company: "Camino",
      title: "Lead Full Stack Engineer",
      period: "Mar 2026 – present",
      line: "Lead developer of a travel and visa platform: API, website, internal tools and servers.",
    },
    {
      company: "Scalvo (Otomatika.ai)",
      title: "Software Engineer",
      period: "Jun 2025 – Jul 2026",
      line: "Backend for AI marketing products: ad platform integrations, AI reports and an AI agent.",
    },
    {
      company: "Red Software Development",
      title: "Software Engineer",
      period: "Jun 2024 – Jun 2025",
      line: "Full-stack web apps for UK clients, including payments with Stripe, GoCardless and Clover.",
    },
    {
      company: "Upwork",
      title: "Freelance Developer",
      period: "Jan 2024 – Jun 2025",
      line: "Full-stack web apps for freelance clients.",
    },
  ],

  offers: [
    {
      title: "Build your product's backend",
      detail:
        "From data model to production: APIs, payments, integrations and deploys.",
    },
    {
      title: "Add AI to your product",
      detail:
        "LLM features, agents and MCP servers that work with your real data.",
    },
    {
      title: "Fix and scale an existing backend",
      detail:
        "Performance, security and monitoring for a codebase you inherited.",
    },
  ],

  contact: {
    email: "ahmedrazek97@gmail.com",
    phone: "+20 100 503 8893",
    linkedin: "https://www.linkedin.com/in/ahmed-abdelrazek-khalifa/",
    github: "https://github.com/ahmedrazek",
    cvPath: "/ahmed-abdelrazek-cv.pdf",
  },
};

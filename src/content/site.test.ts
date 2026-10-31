import { expect, test } from "vitest";
import { site } from "./site";

const all = JSON.stringify(site);

test("projects in agreed order", () => {
  expect(site.projects.map((p) => p.slug)).toEqual([
    "camino",
    "droobna",
    "saldwich",
    "tryautomatik",
    "adlyfy",
    "food-safety",
  ]);
});

test("food safety project stays anonymous", () => {
  const p = site.projects.find((p) => p.slug === "food-safety")!;
  expect(p.anonymous).toBe(true);
  expect(p.liveUrl).toBeUndefined();
  expect(p.name).toBe("Food safety compliance platform");
});

test("exactly one anonymous project; every live link is https", () => {
  for (const p of site.projects) {
    if (p.liveUrl) expect(p.liveUrl).toMatch(/^https:\/\//);
  }
  expect(site.projects.filter((p) => p.anonymous)).toHaveLength(1);
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
    {
      value: "5 payment gateways",
      label: "integrated: Tap, MyFatoorah, Tamara, Stripe, PayTabs",
    },
  ]);
});

test("no template leftovers or forbidden names", () => {
  for (const bad of [
    "Sarah Johnson",
    "Scalvio",
    "UpHold",
    "Lorem",
    "40%",
    "MEARN",
    "AngularJs",
  ]) {
    expect(all).not.toContain(bad);
  }
});

test("skills updated", () => {
  for (const s of ["NestJS", "PostgreSQL", "Redis", "Claude API", "LangChain", "MCP"]) {
    expect(site.skills).toContain(s);
  }
  for (const s of ["C++", "AngularJS", "Figma"]) {
    expect(site.skills).not.toContain(s);
  }
});

test("experience order", () => {
  expect(site.experience.map((r) => r.company)).toEqual([
    "Sahl Solutions",
    "Camino",
    "Scalvo (Otomatika.ai)",
    "Red Software Development",
    "Upwork",
  ]);
});

test("contact", () => {
  expect(site.contact).toMatchObject({
    email: "ahmedrazek97@gmail.com",
    phone: "+20 100 503 8893",
    cvPath: "/ahmed-abdelrazek-cv.pdf",
  });
});

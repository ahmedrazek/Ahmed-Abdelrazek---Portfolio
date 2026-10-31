import { renderToStaticMarkup } from "react-dom/server";
import { beforeEach, expect, test, vi } from "vitest";
import { site } from "@/content/site";
import { SectionHeading } from "../ui";
import { ParallaxText } from "../ui/scroll-vallocity";
import { Hero } from "./hero";
import { ProjectDialog } from "./project-dialog";
import { Work } from "./work";

const reduced = vi.hoisted(() => ({ value: null as boolean | null }));
vi.mock("framer-motion", async (orig) => ({
  ...(await orig<typeof import("framer-motion")>()),
  useReducedMotion: () => reduced.value,
}));

beforeEach(() => {
  reduced.value = null;
});

const item = {
  project: site.projects[1],
  media: { cover: null, gallery: [] },
};

test("section headings are h2", () => {
  expect(renderToStaticMarkup(<SectionHeading>Selected work</SectionHeading>)).toMatch(/^<h2/);
});

test("project cards keep headings and lists outside the button", () => {
  const html = renderToStaticMarkup(<Work items={[item]} />);
  const buttons = html.match(/<button[\s\S]*?<\/button>/g) ?? [];
  expect(buttons.length).toBeGreaterThan(0);
  for (const b of buttons) expect(b).not.toMatch(/<(h3|ul|li|p)\b/);
  expect(html).toContain(`<h3`);
});

test("dialog close button sits outside the scrolling area", () => {
  const html = renderToStaticMarkup(<ProjectDialog item={item} onClose={() => {}} />);
  const scrollStart = html.indexOf("data-lenis-prevent");
  const close = html.indexOf('aria-label="Close project"');
  expect(scrollStart).toBeGreaterThan(-1);
  expect(close).toBeGreaterThan(-1);
  expect(close).toBeLessThan(scrollStart);
});

test("ticker does not skew when reduced motion is on", () => {
  reduced.value = true;
  const html = renderToStaticMarkup(<ParallaxText baseVelocity={4}>x</ParallaxText>);
  expect(html).not.toMatch(/skew/);
});

test("hero renders the same markup whatever the motion setting", () => {
  const server = renderToStaticMarkup(<Hero profile={site.profile} />);
  reduced.value = true;
  const reducedClient = renderToStaticMarkup(<Hero profile={site.profile} />);
  expect(reducedClient).toBe(server);
  expect(server).toContain("<h1");
});

import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { beforeEach, expect, test } from "vitest";
import { resolveCvHref, resolveProjectMedia } from "./media";
import { site } from "./site";

const camino = site.projects.find((p) => p.slug === "camino")!;
const foodSafety = site.projects.find((p) => p.slug === "food-safety")!;

let tmp: string;
beforeEach(() => {
  tmp = fs.mkdtempSync(path.join(os.tmpdir(), "portfolio-media-"));
});

const touch = (rel: string) => {
  const file = path.join(tmp, rel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, "");
};

test("no folder → no cover, empty gallery", () => {
  expect(resolveProjectMedia(camino, tmp)).toEqual({ cover: null, gallery: [] });
});

test("cover and numbered gallery", () => {
  for (const f of ["cover.png", "10.png", "2.png", "notes.txt"]) touch(`projects/camino/${f}`);
  expect(resolveProjectMedia(camino, tmp)).toEqual({
    cover: "/projects/camino/cover.png",
    gallery: ["/projects/camino/2.png", "/projects/camino/10.png"],
  });
});

test("anonymous project ignores files on disk", () => {
  touch("projects/food-safety/cover.png");
  expect(resolveProjectMedia(foodSafety, tmp)).toEqual({ cover: null, gallery: [] });
});

test("cv falls back to linkedin", () => {
  expect(resolveCvHref(site.contact, tmp)).toBe(site.contact.linkedin);
});

test("cv uses pdf when present", () => {
  touch("ahmed-abdelrazek-cv.pdf");
  expect(resolveCvHref(site.contact, tmp)).toBe("/ahmed-abdelrazek-cv.pdf");
});

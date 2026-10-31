import fs from "node:fs";
import path from "node:path";
import type { Contact, Project } from "./types";

export type ProjectMedia = { cover: string | null; gallery: string[] };

const GALLERY_FILE = /^(\d+)\.(png|jpe?g|webp)$/;

const listDir = (dir: string): string[] => {
  try {
    return fs.readdirSync(dir);
  } catch {
    return [];
  }
};

export function resolveProjectMedia(
  project: Project,
  publicDir: string
): ProjectMedia {
  if (project.anonymous) return { cover: null, gallery: [] };

  const base = `/projects/${project.slug}`;
  const files = listDir(path.join(publicDir, "projects", project.slug));

  const gallery = files
    .filter((f) => GALLERY_FILE.test(f))
    .sort((a, b) => parseInt(a, 10) - parseInt(b, 10))
    .map((f) => `${base}/${f}`);

  return {
    cover: files.includes("cover.png") ? `${base}/cover.png` : null,
    gallery,
  };
}

export function resolveCvHref(contact: Contact, publicDir: string): string {
  return fs.existsSync(path.join(publicDir, contact.cvPath))
    ? contact.cvPath
    : contact.linkedin;
}

"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import type { Project } from "@/content/types";
import type { ProjectMedia } from "@/content/media";
import { useLenis } from "../smooth-scroll";
import { ProjectCover } from "./project-cover";

export type WorkItem = { project: Project; media: ProjectMedia };

const FOCUSABLE =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export const ProjectDialog = ({
  item,
  onClose,
}: {
  item: WorkItem | null;
  onClose: () => void;
}) => {
  const lenis = useLenis();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!item) return;
    const opener = document.activeElement as HTMLElement | null;
    const html = document.documentElement;
    const prevOverflow = html.style.overflow;

    lenis?.stop();
    html.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      const nodes = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)
      );
      if (nodes.length === 0) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);

    return () => {
      document.removeEventListener("keydown", onKey);
      html.style.overflow = prevOverflow;
      lenis?.start();
      opener?.focus();
    };
  }, [item, lenis, onClose]);

  if (!item) return null;
  const { project, media } = item;
  const titleId = `project-${project.slug}-title`;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md grid place-items-center p-3 md:p-8"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        data-lenis-prevent
        className="relative bg-[#0f0f12] border border-white/10 w-full max-w-3xl max-h-[90dvh] overflow-y-auto rounded-3xl"
      >
        <button
          ref={closeRef}
          onClick={onClose}
          aria-label="Close project"
          className="absolute top-4 right-4 z-10 size-10 rounded-full bg-black/70 border border-white/30 grid place-items-center text-white"
        >
          <X size={20} />
        </button>
        <div className="aspect-video overflow-hidden rounded-t-3xl">
          <ProjectCover project={project} media={media} />
        </div>
        <div className="p-6 md:p-8 space-y-6">
          <div>
            <h2 id={titleId} className="text-3xl md:text-5xl font-bold text-white">
              {project.name}
            </h2>
            <p className="mt-2 text-white/60">
              {project.role} · {project.period}
            </p>
          </div>
          <div>
            <h3 className="text-sm uppercase tracking-widest text-white/40">
              The problem
            </h3>
            <p className="mt-2 text-white/80">{project.problem}</p>
          </div>
          <div>
            <h3 className="text-sm uppercase tracking-widest text-white/40">
              What I built
            </h3>
            <ul className="mt-2 space-y-2 list-disc pl-5 text-white/80">
              {project.built.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </div>
          <ul className="flex flex-wrap gap-2" aria-label="Stack">
            {project.stack.map((tech) => (
              <li
                key={tech}
                className="px-3 py-1 rounded-full border border-white/20 text-sm text-white/80"
              >
                {tech}
              </li>
            ))}
          </ul>
          {media.gallery.length > 0 && (
            <div className="grid grid-cols-2 gap-3">
              {media.gallery.map((src, i) => (
                <Image
                  key={src}
                  src={src}
                  width={800}
                  height={1600}
                  alt={`${project.name} screenshot ${i + 2}`}
                  className="rounded-xl border border-white/10 w-full h-auto"
                />
              ))}
            </div>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white text-black font-medium"
            >
              Visit live site <ArrowUpRight size={18} />
            </a>
          )}
        </div>
      </motion.div>
    </div>
  );
};

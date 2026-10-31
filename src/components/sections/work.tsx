"use client";

import { useCallback, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useCursorVariants } from "@/utils/context";
import { SectionHeading, SlideIn, Transition } from "../ui";
import { ProjectCover } from "./project-cover";
import { ProjectDialog, WorkItem } from "./project-dialog";

export const Work = ({ items }: { items: WorkItem[] }) => {
  const [open, setOpen] = useState<WorkItem | null>(null);
  const close = useCallback(() => setOpen(null), []);
  const { setVariant } = useCursorVariants();

  return (
    <section id="work" className="px-4 md:px-16 py-20 relative">
      <SectionHeading className="px-0 md:px-0">
        <SlideIn className="text-white/40">Selected</SlideIn>
        <br />
        <SlideIn>work</SlideIn>
      </SectionHeading>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item, i) => (
          <Transition
            key={item.project.slug}
            transition={{ delay: 0.1 * (i % 3) }}
          >
            {/* Stretched-button card: the button holds only the name and its
                ::after covers the card, so headings and lists stay readable. */}
            <motion.article
              onMouseEnter={() => setVariant("PROJECT")}
              onMouseLeave={() => setVariant("DEFAULT")}
              whileHover={{ y: -6 }}
              className="group relative rounded-3xl overflow-hidden border border-white/10 bg-white/[0.03] focus-within:outline focus-within:outline-2 focus-within:outline-white"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <ProjectCover
                  project={item.project}
                  media={item.media}
                  className="group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5 md:p-6">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-xl md:text-2xl font-semibold text-white">
                    <button
                      type="button"
                      onClick={() => setOpen(item)}
                      aria-haspopup="dialog"
                      className="text-left outline-none after:absolute after:inset-0 after:content-['']"
                    >
                      {item.project.name}
                    </button>
                  </h3>
                  <ArrowUpRight
                    aria-hidden
                    className="shrink-0 text-white/60 group-hover:text-white group-hover:rotate-45 transition"
                  />
                </div>
                <p className="mt-2 text-white/60">{item.project.summary}</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {item.project.stack.slice(0, 4).map((tech) => (
                    <li
                      key={tech}
                      className="px-2.5 py-1 rounded-full border border-white/15 text-xs text-white/70"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.article>
          </Transition>
        ))}
      </div>
      <ProjectDialog item={open} onClose={close} />
    </section>
  );
};

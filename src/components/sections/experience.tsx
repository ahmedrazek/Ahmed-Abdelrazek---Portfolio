"use client";

import type { Role } from "@/content/types";
import { SectionHeading, SlideIn, Transition } from "../ui";

export const Experience = ({ roles }: { roles: Role[] }) => {
  return (
    <section id="experience" className="px-4 md:px-16 py-20">
      <SectionHeading className="px-0 md:px-0">
        <SlideIn className="text-white/40">Where I&apos;ve</SlideIn>
        <br />
        <SlideIn>worked</SlideIn>
      </SectionHeading>
      <ol className="border-l border-white/15 ml-2 md:ml-4">
        {roles.map((role) => (
          <li key={role.company} className="relative pl-6 md:pl-10 pb-10 last:pb-0">
            <span className="absolute -left-[5px] top-2 size-2.5 rounded-full bg-[#7c3aed] ring-4 ring-[#7c3aed]/20" />
            <Transition>
              <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-1">
                <h3 className="text-xl md:text-3xl font-bold text-white">
                  {role.company}
                </h3>
                <span className="text-white/50 text-sm md:text-base">
                  {role.period}
                </span>
              </div>
              <p className="text-white/70 mt-1">{role.title}</p>
              <p className="text-white/50 mt-2 max-w-2xl">{role.line}</p>
            </Transition>
          </li>
        ))}
      </ol>
    </section>
  );
};

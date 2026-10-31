"use client";

import { Bot, Layers, Server } from "lucide-react";
import type { Capability } from "@/content/types";
import { SectionHeading, SlideIn, Transition } from "../ui";

const icons = { Backend: Server, "Full-stack": Layers, AI: Bot };

export const Capabilities = ({ items }: { items: Capability[] }) => {
  return (
    <section aria-labelledby="capabilities-title" className="px-4 md:px-16 py-20 relative">
      <span className="absolute top-10 right-0 size-1/3 rounded-full bg-[radial-gradient(circle,#7c3aed_0%,transparent_70%)] opacity-30 blur-3xl -z-10" />
      <SectionHeading id="capabilities-title" className="px-0 md:px-0">
        <SlideIn className="text-white/40">What I</SlideIn>
        <br />
        <SlideIn>own</SlideIn>
      </SectionHeading>
      <div className="grid md:grid-cols-3 gap-6">
        {items.map((cap, i) => {
          const Icon = icons[cap.title];
          return (
            <Transition
              key={cap.title}
              transition={{ delay: 0.1 * i }}
              className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:p-8"
            >
              <Icon className="size-8 text-white/70" aria-hidden />
              <h3 className="mt-6 text-2xl md:text-3xl font-bold uppercase text-white">
                {cap.title}
              </h3>
              <ul className="mt-4 space-y-2 text-white/70">
                {cap.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Transition>
          );
        })}
      </div>
    </section>
  );
};

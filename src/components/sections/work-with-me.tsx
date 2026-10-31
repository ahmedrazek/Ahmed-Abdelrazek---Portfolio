"use client";

import { ArrowRight } from "lucide-react";
import type { Offer } from "@/content/types";
import { SectionHeading, SlideIn, TextReveal, Transition } from "../ui";

export const WorkWithMe = ({ offers }: { offers: Offer[] }) => {
  return (
    <section aria-labelledby="work-with-me-title" className="px-4 md:px-16 py-20 relative">
      <span className="absolute bottom-0 left-0 size-1/3 rounded-full bg-[radial-gradient(circle,#0ea5e9_0%,transparent_70%)] opacity-25 blur-3xl -z-10" />
      <SectionHeading id="work-with-me-title" className="px-0 md:px-0">
        <SlideIn className="text-white/40">Work</SlideIn>
        <br />
        <SlideIn>with me</SlideIn>
      </SectionHeading>
      <div className="grid md:grid-cols-3 gap-6">
        {offers.map((offer, i) => (
          <Transition
            key={offer.title}
            transition={{ delay: 0.1 * i }}
            className="rounded-3xl border border-white/10 p-6 md:p-8 flex flex-col"
          >
            <span className="text-white/30 font-semibold">0{i + 1}</span>
            <h3 className="mt-4 text-2xl font-bold text-white">{offer.title}</h3>
            <p className="mt-3 text-white/60">{offer.detail}</p>
          </Transition>
        ))}
      </div>
      <Transition className="mt-10">
        <a
          href="#contact"
          className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white text-black font-medium group"
        >
          <TextReveal>Start a project</TextReveal>
          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </a>
      </Transition>
    </section>
  );
};

"use client";

import { useState } from "react";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { Profile } from "@/content/types";
import { SlideIn, TextReveal, Transition } from "../ui";
import { PageLoad } from "../ui/page-load";

export const Hero = ({ profile }: { profile: Profile }) => {
  const reduceMotion = useReducedMotion();
  const [loading, setLoading] = useState(true);
  const showLoader = loading && !reduceMotion;

  const words = profile.title.split(" ");
  const last = words.pop();

  return (
    <section
      id="top"
      className="min-h-dvh w-full overflow-hidden relative flex items-center"
    >
      <span className="absolute -top-20 -left-20 size-[60vw] md:size-[40vw] rounded-full bg-[radial-gradient(circle,#7c3aed_0%,transparent_70%)] opacity-50 blur-3xl -z-10" />
      <span className="absolute -bottom-32 -right-20 size-[55vw] md:size-[35vw] rounded-full bg-[radial-gradient(circle,#0ea5e9_0%,transparent_70%)] opacity-40 blur-3xl -z-10" />
      {showLoader ? (
        <PageLoad hideLoader={loading} setHideLoader={setLoading} />
      ) : (
        <div className="w-full px-4 md:px-16 pt-28 pb-16 grid md:grid-cols-[1fr_auto] gap-10 items-end">
          <div>
            <Transition>
              <p className="text-white/60 md:text-xl">{profile.greeting}</p>
            </Transition>
            <h1 className="mt-3 font-extrabold uppercase leading-[0.9] tracking-tighter text-[13vw] md:text-[9vw] text-white">
              {words.map((word) => (
                <span key={word} className="block overflow-hidden">
                  <SlideIn>{word}</SlideIn>
                </span>
              ))}
              <span className="block overflow-hidden text-white/40">
                <SlideIn>{last}</SlideIn>
              </span>
            </h1>
            <Transition>
              <p className="mt-6 text-lg md:text-2xl text-white/70 max-w-2xl">
                {profile.tagline}
              </p>
            </Transition>
            <Transition className="mt-8 flex flex-wrap gap-4">
              <a
                href="#work"
                aria-label="See my work"
                className="px-6 py-3 rounded-full bg-white text-black font-medium flex items-center gap-3 group"
              >
                <TextReveal>See my work</TextReveal>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#contact"
                aria-label="Let's talk"
                className="px-6 py-3 rounded-full border border-white/50 text-white flex items-center gap-3"
              >
                <TextReveal>Let&apos;s talk</TextReveal>
              </a>
            </Transition>
          </div>
          <Transition className="hidden md:block">
            <Image
              src={profile.photo}
              width={240}
              height={240}
              alt={profile.name}
              priority
              className="rounded-full size-48 lg:size-60 object-cover border border-white/10"
            />
          </Transition>
        </div>
      )}
    </section>
  );
};

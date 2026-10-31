"use client";

import Image from "next/image";
import type { Profile } from "@/content/types";
import { SectionHeading, SlideIn, Transition } from "../ui";

export const About = ({ profile }: { profile: Profile }) => {
  return (
    <section
      id="about"
      className="px-4 md:px-16 py-20 grid md:grid-cols-[1.6fr_1fr] gap-10"
    >
      <div>
        <SectionHeading className="px-0 md:px-0">
          <SlideIn className="text-white/40">About</SlideIn>
          <br />
          <SlideIn>me</SlideIn>
        </SectionHeading>
        <div className="space-y-6">
          {profile.about.map((paragraph) => (
            <Transition key={paragraph}>
              <p className="text-lg md:text-2xl text-white/70 leading-relaxed">
                {paragraph}
              </p>
            </Transition>
          ))}
        </div>
      </div>
      <div className="relative">
        <Transition className="md:sticky md:top-28">
          <Image
            src={profile.photo}
            width={480}
            height={480}
            alt={profile.name}
            className="rounded-3xl w-full max-md:aspect-square object-cover"
          />
        </Transition>
      </div>
    </section>
  );
};

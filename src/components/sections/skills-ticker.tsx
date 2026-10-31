"use client";

import { ParallaxText } from "../ui";

export const SkillsTicker = ({ skills }: { skills: string[] }) => {
  const row = skills.map((skill) => (
    <span
      key={skill}
      className="md:text-7xl text-3xl font-semibold uppercase text-white/25"
    >
      {skill} •
    </span>
  ));

  return (
    <section aria-label="Skills" className="py-10">
      <p className="sr-only">Skills: {skills.join(", ")}</p>
      <div aria-hidden>
        <ParallaxText baseVelocity={-4}>{row}</ParallaxText>
        <ParallaxText baseVelocity={4}>{row}</ParallaxText>
      </div>
    </section>
  );
};

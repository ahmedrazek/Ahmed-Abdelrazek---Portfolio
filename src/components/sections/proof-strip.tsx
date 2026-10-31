"use client";

import type { Stat } from "@/content/types";
import { Transition } from "../ui";

export const ProofStrip = ({ stats }: { stats: Stat[] }) => {
  return (
    <section aria-label="Highlights" className="px-4 md:px-16 py-10">
      <div className="grid md:grid-cols-3 gap-px rounded-3xl overflow-hidden border border-white/10 bg-white/10">
        {stats.map((stat, i) => (
          <Transition
            key={stat.value}
            transition={{ delay: 0.1 * i }}
            className="bg-background p-6 md:p-8"
          >
            <p className="text-3xl md:text-5xl font-bold text-white">
              {stat.value}
            </p>
            <p className="mt-2 text-white/60">{stat.label}</p>
          </Transition>
        ))}
      </div>
    </section>
  );
};

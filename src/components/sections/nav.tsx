"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { TextReveal } from "../ui";

const links = [
  { label: "Work", href: "#work" },
  { label: "Experience", href: "#experience" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export const Nav = ({ cvHref }: { cvHref: string }) => {
  const [open, setOpen] = useState(false);

  const cvButton = (
    <a
      href={cvHref}
      target="_blank"
      rel="noopener noreferrer"
      className="px-4 py-2 rounded-full border border-white/50 text-sm text-white hover:bg-white hover:text-black transition-colors"
    >
      Download CV
    </a>
  );

  return (
    <header className="fixed top-0 inset-x-0 z-40 px-4 md:px-8 py-4 md:py-6">
      <nav
        aria-label="Main"
        className="flex items-center justify-between rounded-full bg-black/40 backdrop-blur-md border border-white/10 px-5 py-3"
      >
        <a href="#top" className="font-bold text-white text-lg tracking-tight">
          AA.
        </a>
        <ul className="hidden md:flex items-center gap-8 text-white/70">
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="hover:text-white">
                <TextReveal>{link.label}</TextReveal>
              </a>
            </li>
          ))}
        </ul>
        <div className="hidden md:block">{cvButton}</div>
        <button
          className="md:hidden text-white"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden mt-2 rounded-3xl bg-black/90 backdrop-blur-md border border-white/10 p-6 flex flex-col gap-5"
          >
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-2xl font-semibold text-white"
              >
                {link.label}
              </a>
            ))}
            <div>{cvButton}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

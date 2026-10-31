"use client";

import { FormEvent, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import type { Contact as ContactInfo } from "@/content/types";
import { getEmailConfig } from "@/content/email-config";
import { Input, SectionHeading, SlideIn, Textarea, TextReveal, Transition } from "../ui";

type Status = "idle" | "sending" | "sent" | "failed";

// NEXT_PUBLIC_* values are only inlined into the client bundle when referenced by name
const emailConfig = getEmailConfig({
  NEXT_PUBLIC_SERVICE_ID: process.env.NEXT_PUBLIC_SERVICE_ID,
  NEXT_PUBLIC_TEMPLATE_ID: process.env.NEXT_PUBLIC_TEMPLATE_ID,
  NEXT_PUBLIC_PUBLIC_KEY: process.env.NEXT_PUBLIC_PUBLIC_KEY,
});

const fieldClass = "border-0 border-b border-white/20 rounded-none bg-transparent";

export const Contact = ({
  contact,
  cvHref,
}: {
  contact: ContactInfo;
  cvHref: string;
}) => {
  const form = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>("idle");

  const send = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.current) return;
    if (!emailConfig) {
      setStatus("failed");
      return;
    }
    setStatus("sending");
    try {
      await emailjs.sendForm(
        emailConfig.serviceId,
        emailConfig.templateId,
        form.current,
        emailConfig.publicKey
      );
      form.current.reset();
      setStatus("sent");
    } catch {
      setStatus("failed");
    }
  };

  const links = [
    { label: "LinkedIn", href: contact.linkedin },
    { label: "GitHub", href: contact.github },
    { label: "Download CV", href: cvHref },
  ];

  return (
    <section
      id="contact"
      className="relative px-4 md:px-16 py-20 rounded-t-[2rem] md:rounded-t-[3rem] border-t border-white/10 overflow-hidden"
    >
      <span className="absolute top-20 right-0 size-1/2 rounded-full bg-[radial-gradient(circle,#7c3aed_0%,transparent_70%)] opacity-30 blur-3xl -z-10" />
      <SectionHeading className="px-0 md:px-0">
        <SlideIn className="text-white/40">Interested in talking,</SlideIn>
        <br />
        <SlideIn>let&apos;s do it.</SlideIn>
      </SectionHeading>
      <div className="grid md:grid-cols-2 gap-12">
        <form ref={form} onSubmit={send} className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <Input name="from_name" placeholder="Full name" aria-label="Full name" required className={fieldClass} />
            <Input name="from_email" type="email" placeholder="Email" aria-label="Email" required className={fieldClass} />
          </div>
          <Input name="subject" placeholder="Subject" aria-label="Subject" className={fieldClass} />
          <Textarea
            name="message"
            placeholder="Tell me about your project or role"
            aria-label="Message"
            required
            className={`${fieldClass} min-h-[120px] resize-none`}
          />
          <button
            type="submit"
            disabled={status === "sending"}
            className="px-8 py-3 rounded-full bg-white text-black font-medium disabled:opacity-60"
          >
            {status === "sending" ? "Sending…" : "Send message"}
          </button>
          <p aria-live="polite" className="min-h-6 text-sm">
            {status === "sent" && (
              <span className="text-emerald-400">
                Thanks, your message is on its way. I&apos;ll reply soon.
              </span>
            )}
            {status === "failed" && (
              <span className="text-red-400">
                Couldn&apos;t send the message. Please email me directly at{" "}
                <a href={`mailto:${contact.email}`} className="underline">
                  {contact.email}
                </a>
                .
              </span>
            )}
          </p>
        </form>
        <div className="flex flex-col gap-6 md:items-end md:text-right">
          <Transition>
            <span className="text-white/60">Get in touch</span>
            <a
              href={`mailto:${contact.email}`}
              className="block text-2xl md:text-4xl font-bold text-white break-all mt-2"
            >
              {contact.email}
            </a>
            <a
              href={`tel:${contact.phone.replace(/\s/g, "")}`}
              className="block text-white/70 mt-2"
            >
              {contact.phone}
            </a>
          </Transition>
          <div className="flex flex-wrap gap-6 md:justify-end mt-auto">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                aria-label={link.label}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 hover:text-white"
              >
                <TextReveal>{link.label}</TextReveal>
              </a>
            ))}
          </div>
        </div>
      </div>
      <p className="mt-20 text-sm text-white/40">
        © {new Date().getFullYear()} Ahmed Abdelrazek
      </p>
    </section>
  );
};

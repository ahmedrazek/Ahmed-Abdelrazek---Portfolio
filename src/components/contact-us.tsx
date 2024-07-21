"use client";

import { motion } from "framer-motion";
import {
  Input,
  SectionHeading,
  SlideIn,
  Textarea,
  TextReveal,
  Transition,
} from "./ui";
import { ReactNode, useRef } from "react";
import { cn } from "@/utils/cn";
import { About, SocialHandle } from "@/utils/interfaces";
import Link from "next/link";
import emailjs from "@emailjs/browser";
interface ContactProps {
  email: string;
  social_handle: SocialHandle[];
  about: About;
}
export const ContactUs = ({ email, social_handle, about }: ContactProps) => {
  const form = useRef<HTMLFormElement | null>(null);
  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (form.current) {
      const serviceId = process.env.NEXT_PUBLIC_SERVICE_ID || "";
      const templateId = process.env.NEXT_PUBLIC_TEMPLATE_ID || "";
      const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY || "";

      emailjs.sendForm(serviceId, templateId, form.current, publicKey).then(
        () => {
          console.log("SUCCESS!");
          form.current?.reset();
        },
        (error) => {
          console.log("FAILED...", error.text);
        }
      );
    }
  };
  return (
    <motion.section className="relative">
      <span className="blob size-1/2 absolute top-20 right-0 blur-[100px]" />
      <div className="p-4 md:p-8 md:px-16">
        <SectionHeading className="">
          <SlideIn className="text-white/40">Interested in talking,</SlideIn>{" "}
          <br /> <SlideIn>let’s do it.</SlideIn>
        </SectionHeading>
        <div className="grid md:grid-cols-2 gap-10 md:pt-16">
          <form ref={form} onSubmit={sendEmail}>
            <div className="space-y-4">
              <div className="flex gap-4">
                <Transition className="w-full">
                  <Input
                    id="full-name"
                    placeholder="Full name"
                    className="border-0 border-b rounded-none"
                    name="from_name"
                  />
                </Transition>
                <Transition className="w-full">
                  <Input
                    id="email"
                    placeholder="Email"
                    type="email"
                    className="border-0 border-b rounded-none"
                    name="from_email"
                  />
                </Transition>
              </div>
              <div className="space-y-2">
                <Transition>
                  <Input
                    id="subject"
                    placeholder="Enter the subject"
                    className="border-0 border-b rounded-none"
                    name="subject"
                  />
                </Transition>
              </div>
              <div className="space-y-2">
                <Transition>
                  <Textarea
                    className="min-h-[100px] rounded-none border-0 border-b resize-none"
                    id="message"
                    placeholder="Enter your message"
                    name="message"
                  />
                </Transition>
              </div>
              <div>
                <Transition>
                  <motion.button
                    whileHover="whileHover"
                    initial="initial"
                    className="border border-white/30 px-8 py-2 rounded-3xl relative overflow-hidden"
                  >
                    <TextReveal className="uppercase">
                      discuss project
                    </TextReveal>
                  </motion.button>
                </Transition>
              </div>
            </div>
          </form>
          <div className="md:justify-self-end flex flex-col">
            <div className="pb-4">
              <Transition>
                <span className="text-white/90">Get in touch</span>
              </Transition>
              <div className="text-2xl md:text-4xl font-bold py-2">
                <Transition>
                  <TextReveal>{email}</TextReveal>
                </Transition>
              </div>
              <Transition>
                <div className="pb-1 text-white/80">{about.phoneNumber}</div>
              </Transition>
              <Transition>
                <div className="text-white/80">{about.address}</div>
              </Transition>
            </div>

            <div className="flex md:gap-8 gap-4 mt-auto md:pb-16">
              {social_handle.map((social, index) =>
                social.enabled ? (
                  <Transition
                    key={social._id}
                    transition={{ delay: 0.4 + index * 0.1 }}
                  >
                    <Link href={social.url}>
                      <TextReveal>{social.platform}</TextReveal>
                    </Link>
                  </Transition>
                ) : null
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

interface BackgroundScaleProps {
  children: ReactNode;
  className?: string;
}

export const BackgroundScale = ({
  children,
  className,
}: BackgroundScaleProps) => {
  return (
    <motion.div
      whileHover="whileHover"
      whileFocus="whileHover"
      whileTap="whileHover"
      initial="initial"
      className={cn("relative p-1 group", className)}
    >
      <motion.span
        variants={{
          initial: { scaleY: 0 },
          whileHover: { scaleY: 1 },
        }}
        className="absolute top-0 left-0 h-full w-full bg-primary -z-10 group-hover:text-black"
      />
      {children}
    </motion.div>
  );
};

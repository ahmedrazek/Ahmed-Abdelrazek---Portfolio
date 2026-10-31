"use client";

import { ReactNode } from "react";
import { MotionConfig } from "framer-motion";
import SmoothScroll from "./smooth-scroll";
import { ContextProvider } from "@/utils/context";
import { Cursor } from "./cursor";

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <MotionConfig reducedMotion="user">
      <SmoothScroll>
        <ContextProvider>
          <Cursor />
          {children}
        </ContextProvider>
      </SmoothScroll>
    </MotionConfig>
  );
};

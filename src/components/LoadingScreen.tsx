"use client";

import { motion } from "framer-motion";
import { Logo } from "@/components/Logo";

export function LoadingScreen() {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#030406]"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.75, ease: [0.65, 0, 0.35, 1] } }}
    >
      <motion.div
        className="flex min-w-52 flex-col items-center gap-7"
        initial={{ y: 18, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="relative">
          <div aria-hidden="true" className="absolute inset-[-28px] rounded-full bg-white/[0.08] blur-3xl" />
          <Logo size="lg" imageClassName="opacity-[0.85]" />
        </div>
        <div className="w-48">
          <div className="mb-3 flex items-center justify-between font-mono text-[10px] uppercase text-white/[0.48]">
            <span>Loading</span>
            <span>Anite</span>
          </div>
          <div className="h-px overflow-hidden rounded-full bg-white/[0.12]">
            <motion.div
              className="h-full origin-left bg-[linear-gradient(90deg,#7ac8ff,#ffb35c)]"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.15, ease: [0.65, 0, 0.35, 1] }}
            />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

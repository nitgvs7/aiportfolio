"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function ScrollProgressIndicator() {
  const barRef = useRef<HTMLSpanElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    const trigger = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        if (barRef.current) {
          barRef.current.style.transform = `scaleY(${self.progress.toFixed(4)})`;
        }
        if (labelRef.current) {
          labelRef.current.textContent = `${Math.round(self.progress * 100).toString().padStart(2, "0")}%`;
        }
      },
    });

    return () => trigger.kill();
  }, []);

  return (
    <aside
      aria-hidden="true"
      className="fixed right-4 top-1/2 z-50 hidden -translate-y-1/2 items-center gap-3 md:flex"
    >
      <span ref={labelRef} className="font-mono text-[10px] text-white/[0.42]">
        00%
      </span>
      <span className="relative h-36 w-px overflow-hidden rounded-full bg-white/[0.12]">
        <span
          ref={barRef}
          className="absolute inset-x-0 top-0 h-full origin-top rounded-full bg-[linear-gradient(180deg,#7ac8ff,#ffb35c)]"
          style={{ transform: "scaleY(0)" }}
        />
      </span>
    </aside>
  );
}

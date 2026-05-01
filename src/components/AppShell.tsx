"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AboutSection } from "@/components/AboutSection";
import { CapabilityGrid } from "@/components/CapabilityGrid";
import { ContactSection } from "@/components/ContactSection";
import { GrainOverlay } from "@/components/GrainOverlay";
import { Header } from "@/components/Header";
import { HeroScrollVideo } from "@/components/HeroScrollVideo";
import { LoadingScreen } from "@/components/LoadingScreen";
import { ProcessTimeline } from "@/components/ProcessTimeline";
import { ProjectGrid } from "@/components/ProjectGrid";
import { ScrollProgressIndicator } from "@/components/ScrollProgressIndicator";
import { SmoothScroll } from "@/components/SmoothScroll";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function AppShell() {
  const shellRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
    const timer = window.setTimeout(() => setLoading(false), 1350);
    return () => window.clearTimeout(timer);
  }, []);

  useGSAP(
    () => {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (reduceMotion) {
        gsap.set("[data-reveal]", { autoAlpha: 1, y: 0 });
        return;
      }

      gsap.set("[data-reveal]", { autoAlpha: 0, y: 38 });

      const batches = ScrollTrigger.batch("[data-reveal]", {
        start: "top 84%",
        once: true,
        onEnter: (elements) => {
          gsap.to(elements, {
            autoAlpha: 1,
            y: 0,
            duration: 0.85,
            ease: "power3.out",
            stagger: 0.08,
            overwrite: true,
          });
        },
      });

      return () => batches.forEach((trigger) => trigger.kill());
    },
    { scope: shellRef },
  );

  return (
    <div ref={shellRef} className="relative min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <SmoothScroll />
      <AnimatePresence>{loading ? <LoadingScreen /> : null}</AnimatePresence>
      <Header />
      <ScrollProgressIndicator />
      <main>
        <HeroScrollVideo />
        <ProjectGrid />
        <CapabilityGrid />
        <ProcessTimeline />
        <AboutSection />
        <ContactSection />
      </main>
      <GrainOverlay />
    </div>
  );
}

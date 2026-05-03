"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MagneticButton } from "@/components/MagneticButton";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const FALLBACK_DURATION = 2.79;
const FRAME_RATE = 24;
const HERO_VIDEO_SRC = "/hero-video-scrub.mp4";
const SEEK_FPS = 30;
const SEEK_INTERVAL_MS = 1000 / SEEK_FPS;
const SEEK_EPSILON = 1 / FRAME_RATE / 2;

export function HeroScrollVideo() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const frameRef = useRef<HTMLSpanElement>(null);
  const timeRef = useRef<HTMLSpanElement>(null);
  const percentRef = useRef<HTMLSpanElement>(null);
  const durationRef = useRef(FALLBACK_DURATION);
  const [videoReady, setVideoReady] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) {
      return;
    }

    const updateDuration = () => {
      durationRef.current = Number.isFinite(video.duration) && video.duration > 0 ? video.duration : FALLBACK_DURATION;
      video.pause();
      video.currentTime = 0;
    };

    const onMetadata = () => {
      updateDuration();
    };

    const onLoadedData = () => {
      updateDuration();
      setVideoReady(true);
    };

    const onError = () => setVideoFailed(true);

    video.addEventListener("loadedmetadata", onMetadata);
    video.addEventListener("loadeddata", onLoadedData);
    video.addEventListener("error", onError);
    video.load();

    if (video.readyState >= 2) {
      onLoadedData();
    } else if (video.readyState >= 1) {
      updateDuration();
    }

    return () => {
      video.removeEventListener("loadedmetadata", onMetadata);
      video.removeEventListener("loadeddata", onLoadedData);
      video.removeEventListener("error", onError);
    };
  }, []);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const video = videoRef.current;

      if (!section || !video || !videoReady || videoFailed) {
        return;
      }

      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const duration = durationRef.current;
      const maxTime = Math.max(0, duration - 0.04);
      const totalFrames = Math.max(1, Math.round(duration * FRAME_RATE));
      let targetTime = 0;
      let lastSeekTime = -1;
      let lastSeekAt = 0;
      let hasFailed = false;

      const updateReadout = (progress: number) => {
        const frame = Math.round(progress * totalFrames);
        if (frameRef.current) {
          frameRef.current.textContent = `FR ${frame.toString().padStart(2, "0")}`;
        }
        if (timeRef.current) {
          timeRef.current.textContent = `${(progress * duration).toFixed(2)}s`;
        }
        if (percentRef.current) {
          percentRef.current.textContent = `${Math.round(progress * 100).toString().padStart(2, "0")}%`;
        }
        section.style.setProperty("--hero-progress", progress.toFixed(4));
      };

      updateReadout(0);

      if (reduceMotion) {
        video.currentTime = 0;
        return;
      }

      const snapToFrame = (time: number) => Math.round(time * FRAME_RATE) / FRAME_RATE;

      const seekVideo = (time: number) => {
        const clampedTime = Math.max(0, Math.min(maxTime, snapToFrame(time)));

        if (Math.abs(clampedTime - lastSeekTime) < SEEK_EPSILON) {
          return;
        }

        try {
          video.currentTime = clampedTime;
          lastSeekTime = clampedTime;
          lastSeekAt = performance.now();
        } catch {
          if (!hasFailed) {
            hasFailed = true;
            setVideoFailed(true);
          }
        }
      };

      const tick = () => {
        const now = performance.now();

        if (now - lastSeekAt < SEEK_INTERVAL_MS && Math.abs(targetTime - lastSeekTime) < SEEK_EPSILON * 2) {
          return;
        }

        if (video.seeking && Math.abs(targetTime - lastSeekTime) < SEEK_EPSILON * 2) {
          return;
        }

        seekVideo(targetTime);
      };

      gsap.ticker.add(tick);

      const scrubTrigger = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        refreshPriority: 0,
        onUpdate: (self) => {
          targetTime = self.progress * maxTime;
          updateReadout(self.progress);
        },
      });

      targetTime = scrubTrigger.progress * maxTime;
      updateReadout(scrubTrigger.progress);
      seekVideo(targetTime);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.45,
          refreshPriority: 1,
        },
      });

      tl.to(".hero-copy", { yPercent: -10, autoAlpha: 0.28, scale: 0.96, ease: "none" }, 0)
        .to(".hero-video-shell", { scale: 0.91, yPercent: 4, ease: "none" }, 0)
        .to(".hero-grid-lines", { autoAlpha: 0.74, ease: "none" }, 0);

      return () => {
        gsap.ticker.remove(tick);
        scrubTrigger.kill();
        tl.scrollTrigger?.kill();
        tl.kill();
      };
    },
    { dependencies: [videoReady, videoFailed], scope: sectionRef },
  );

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative h-[270vh] min-h-[1900px]"
      style={{ "--hero-progress": 0 } as CSSProperties}
    >
      <div className="hero-stage sticky top-0 overflow-hidden">
        <div aria-hidden="true" className="hero-grid-lines absolute inset-0 opacity-0" />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,4,6,0.92),rgba(3,4,6,0.18)_44%,rgba(3,4,6,0.76)),linear-gradient(180deg,rgba(3,4,6,0.12),rgba(3,4,6,0.88))]"
        />

        <div className="hero-video-shell video-shadow absolute inset-3 overflow-hidden rounded-[30px] border border-white/[0.14] bg-[#070a10] md:inset-6 md:rounded-[42px]">
          {videoFailed ? (
            <Image
              src="/hero-poster.jpg"
              alt="Cinematic AI video still by Anite"
              fill
              priority
              sizes="100vw"
              className="hero-media object-cover"
            />
          ) : (
            <video
              ref={videoRef}
              className="hero-media h-full w-full object-cover opacity-[0.82] saturate-[1.08]"
              muted
              playsInline
              preload="auto"
              poster="/hero-poster.jpg"
              aria-label="Scroll-controlled hero video preview"
            >
              <source src={HERO_VIDEO_SRC} type="video/mp4" />
              <source src="/hero-video.mp4" type="video/mp4" />
            </video>
          )}
          <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_72%_24%,rgba(122,200,255,0.18),transparent_32rem),radial-gradient(circle_at_40%_72%,rgba(255,179,92,0.16),transparent_28rem)]" />
          <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.1),rgba(0,0,0,0.7))]" />
          <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.7),transparent)]" />
        </div>

        <div className="pointer-events-none absolute inset-x-0 top-20 z-10 mx-auto flex max-w-7xl items-center justify-end px-5 md:top-24 md:px-8">
          <div className="hidden font-mono text-[10px] uppercase text-white/[0.42] md:block">
            ANITE / AI MOTION / 51.5072 N
          </div>
        </div>

        <div className="hero-copy absolute inset-x-0 z-10 mx-auto max-w-7xl px-5 md:px-8">
          <div className="max-w-5xl">
            <h1 className="hero-title font-black text-white">
              <span className="hidden sm:block">AI Video</span>
              <span className="block sm:hidden">AI</span>
              <span className="block sm:hidden">Video</span>
              <span className="block">Editor</span>
              <span className="hero-title-outline block text-outline">Anite</span>
            </h1>
            <div className="mt-5 grid max-w-4xl gap-5 md:mt-7 md:grid-cols-[1fr_auto] md:items-end">
              <p className="hero-summary text-base leading-7 text-white/[0.72] md:text-lg md:leading-8 lg:text-xl">
                Cinematic AI visuals, scroll-stopping reels, product films, music visuals, and brand stories built
                with next-generation video workflows.
              </p>
              <div className="flex flex-wrap gap-3">
                <MagneticButton href="#work" variant="primary">
                  View Work
                </MagneticButton>
                <MagneticButton href="mailto:contact@anite.me" variant="secondary">
                  Contact
                </MagneticButton>
              </div>
            </div>
            <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs text-white/[0.54] md:mt-6">
              <a className="transition-colors hover:text-white" href="mailto:contact@anite.me">
                contact@anite.me
              </a>
              <a className="transition-colors hover:text-white" href="https://x.com/anite_me" target="_blank" rel="noreferrer">
                @anite_me
              </a>
            </div>
          </div>
        </div>

        <div className="absolute bottom-6 right-5 z-10 hidden items-end gap-3 md:bottom-8 md:right-8 md:flex">
          <div className="glass-panel rounded-2xl px-4 py-3">
            <div className="mb-2 h-px w-24 bg-white/[0.14]">
              <div
                aria-hidden="true"
                className="h-full origin-left bg-[linear-gradient(90deg,#7ac8ff,#ffb35c)]"
                style={{ transform: "scaleX(var(--hero-progress))" }}
              />
            </div>
            <div className="flex items-center gap-4 font-mono text-[10px] uppercase text-white/[0.54]">
              <span data-testid="hero-frame" ref={frameRef}>FR 00</span>
              <span data-testid="hero-time" ref={timeRef}>0.00s</span>
              <span data-testid="hero-percent" ref={percentRef}>00%</span>
            </div>
          </div>
        </div>

        <div
          aria-hidden="true"
          className="absolute left-5 top-1/2 z-10 hidden -translate-y-1/2 flex-col items-center gap-4 md:flex"
        >
          <span className="h-24 w-px bg-white/[0.18]" />
          <span className="font-mono text-[10px] uppercase text-white/[0.38] [writing-mode:vertical-rl]">
            scroll-scrub timeline
          </span>
        </div>
      </div>
    </section>
  );
}

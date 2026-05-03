"use client";

import type { projects } from "@/lib/portfolio-data";
import { useState } from "react";
import { GlassPanel } from "@/components/GlassPanel";

type Project = (typeof projects)[number];

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  const [iframeInteractive, setIframeInteractive] = useState(false);
  const iframeSrc = `${project.src}${project.src.includes("?") ? "&" : "?"}player_color=%23ffb35c`;

  return (
    <GlassPanel className="group p-3 transition-transform duration-500 hover:-translate-y-1 md:p-4">
      <div
        className="relative overflow-hidden rounded-[20px] border border-white/[0.10] bg-black"
        style={{ aspectRatio: project.aspectRatio }}
        onPointerLeave={() => setIframeInteractive(false)}
        onBlurCapture={(event) => {
          const nextFocus = event.relatedTarget;

          if (!(nextFocus instanceof Node) || !event.currentTarget.contains(nextFocus)) {
            setIframeInteractive(false);
          }
        }}
      >
        <iframe
          loading="lazy"
          title={project.title}
          src={iframeSrc}
          className={`absolute inset-0 h-full w-full ${iframeInteractive ? "" : "pointer-events-none"}`}
          referrerPolicy="origin"
          allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture; fullscreen; clipboard-write"
          allowFullScreen
          tabIndex={iframeInteractive ? 0 : -1}
          data-lenis-prevent={iframeInteractive ? "true" : undefined}
        />
        {!iframeInteractive ? (
          <button
            type="button"
            aria-label={`Enable ${project.title} video controls`}
            className="absolute inset-0 z-10 flex cursor-pointer items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ffb35c] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            onClick={() => setIframeInteractive(true)}
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-full border border-white/[0.18] bg-black/[0.42] shadow-[0_18px_60px_rgba(0,0,0,0.34)] backdrop-blur-xl transition-transform duration-300 hover:scale-105">
              <span
                aria-hidden="true"
                className="ml-1 h-0 w-0 border-y-[9px] border-l-[14px] border-y-transparent border-l-white"
              />
            </span>
          </button>
        ) : null}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0 ring-1 ring-inset ring-[#ffb35c]/30 transition-opacity duration-500 group-hover:opacity-100"
        />
      </div>
      <div className="grid gap-5 p-3 pt-5 md:grid-cols-[auto_1fr] md:p-4">
        <div className="font-mono text-xs text-[#7ac8ff]">{project.code}</div>
        <div>
          <div className="mb-4 flex flex-wrap gap-2">
            {project.meta.map((item) => (
              <span
                key={item}
                className="rounded-full border border-white/[0.12] bg-white/[0.06] px-3 py-1 font-mono text-[10px] uppercase text-white/[0.54]"
              >
                {item}
              </span>
            ))}
          </div>
          <h3 className="text-2xl font-semibold text-white md:text-3xl">{project.title}</h3>
          <p className="mt-3 max-w-xl text-sm leading-6 text-white/[0.58]">{project.description}</p>
        </div>
      </div>
    </GlassPanel>
  );
}

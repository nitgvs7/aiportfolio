import type { projects } from "@/lib/portfolio-data";
import { GlassPanel } from "@/components/GlassPanel";

type Project = (typeof projects)[number];

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <GlassPanel className="group p-3 transition-transform duration-500 hover:-translate-y-1 md:p-4">
      <div
        className="relative overflow-hidden rounded-[20px] border border-white/[0.10] bg-black"
        style={{ aspectRatio: project.aspectRatio }}
      >
        <iframe
          loading="lazy"
          title={project.title}
          src={project.src}
          className="absolute inset-0 h-full w-full"
          referrerPolicy="origin"
          allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture; fullscreen; clipboard-write"
          allowFullScreen
        />
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

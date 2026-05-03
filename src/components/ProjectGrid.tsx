import { projects } from "@/lib/portfolio-data";
import { ProjectCard } from "@/components/ProjectCard";
import { SectionDivider } from "@/components/SectionDivider";

export function ProjectGrid() {
  return (
    <section id="work" className="relative mt-12 px-5 pb-20 pt-14 md:mt-16 md:px-8 md:pb-24 md:pt-16">
      <SectionDivider />
      <div className="mx-auto max-w-7xl">
        <div data-reveal className="mb-12 grid gap-6 md:grid-cols-[0.9fr_1.1fr] md:items-end">
          <div>
            <p className="font-mono text-xs uppercase text-[#ffcf92]">Selected work</p>
            <h2 className="mt-4 max-w-3xl text-4xl font-black leading-[0.98] text-white md:text-6xl">
              Three cinematic cuts, built for modern attention.
            </h2>
          </div>
          <p className="max-w-xl text-base leading-7 text-white/[0.58] md:justify-self-end">
            Each piece is treated like a case-study object: generated visuals, edit rhythm, sound pressure, and a
            polished final frame.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {projects.map((project) => (
            <div key={project.src} data-reveal>
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

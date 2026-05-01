import { capabilities, capabilityTags } from "@/lib/portfolio-data";
import { GlassPanel } from "@/components/GlassPanel";

export function CapabilityGrid() {
  return (
    <section id="capabilities" className="relative overflow-hidden px-5 py-24 md:px-8 md:py-32">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(122,200,255,0.35),rgba(255,179,92,0.35),transparent)]"
      />
      <div className="mx-auto max-w-7xl">
        <div data-reveal className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
          <div>
            <p className="font-mono text-xs uppercase text-[#7ac8ff]">Capabilities</p>
            <h2 className="mt-4 text-4xl font-black leading-[1] text-white md:text-6xl">
              Direction, generation, editing, delivery.
            </h2>
            <p className="mt-6 max-w-xl text-base leading-7 text-white/[0.58]">
              Anite blends prompt direction, cinematic taste, edit rhythm, and production polish into AI-powered
              videos that feel intentional.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {capabilityTags.map((tag) => (
                <span
                  key={tag}
                  className="chip-cloud rounded-full border border-white/[0.12] bg-white/[0.07] px-4 py-2 font-mono text-[11px] uppercase text-white/[0.58] backdrop-blur-xl"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {capabilities.map((capability, index) => (
              <GlassPanel key={capability.title} className="p-5" data-reveal>
                <div className="mb-8 flex items-center justify-between">
                  <span className="font-mono text-[10px] text-white/[0.36]">
                    {(index + 1).toString().padStart(2, "0")}
                  </span>
                  <span className="h-1.5 w-1.5 rounded-full bg-[#ffb35c] shadow-[0_0_20px_rgba(255,179,92,0.7)]" />
                </div>
                <h3 className="text-lg font-semibold text-white">{capability.title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/[0.54]">{capability.detail}</p>
              </GlassPanel>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

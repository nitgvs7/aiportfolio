import { processSteps } from "@/lib/portfolio-data";

export function ProcessTimeline() {
  return (
    <section id="process" className="relative px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div data-reveal className="mb-12 grid gap-6 md:grid-cols-[0.8fr_1.2fr] md:items-end">
          <div>
            <p className="font-mono text-xs uppercase text-[#ffcf92]">Process</p>
            <h2 className="mt-4 text-4xl font-black leading-[1] text-white md:text-6xl">From feeling to final frame.</h2>
          </div>
          <p className="max-w-2xl text-base leading-7 text-white/[0.58] md:justify-self-end">
            The workflow stays lean: establish the visual world, generate the right assets, animate with taste, then
            cut until the edit has momentum.
          </p>
        </div>

        <div className="relative">
          <div
            aria-hidden="true"
            className="absolute left-4 right-4 top-8 hidden h-px bg-[linear-gradient(90deg,rgba(122,200,255,0.1),rgba(255,179,92,0.46),rgba(122,200,255,0.1))] lg:block"
          />
          <div className="grid gap-4 lg:grid-cols-5">
            {processSteps.map((step, index) => (
              <div
                key={step.label}
                data-reveal
                className="relative overflow-hidden rounded-[26px] border border-white/[0.12] bg-white/[0.055] p-5 backdrop-blur-xl transition-colors duration-300 hover:border-white/[0.24] hover:bg-white/[0.075]"
              >
                <div className="mb-12 flex items-center justify-between">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/[0.16] bg-black/[0.24] font-mono text-[11px] text-white/[0.70]">
                    {(index + 1).toString().padStart(2, "0")}
                  </span>
                  <span className="font-mono text-[10px] uppercase text-white/[0.32]">Phase</span>
                </div>
                <h3 className="text-xl font-semibold text-white">{step.label}</h3>
                <p className="mt-3 text-sm leading-6 text-white/[0.52]">{step.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

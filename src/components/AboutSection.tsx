import Image from "next/image";
import { GlassPanel } from "@/components/GlassPanel";

export function AboutSection() {
  return (
    <section id="about" className="relative px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div data-reveal className="relative min-h-[620px] overflow-hidden rounded-[34px] border border-white/[0.14] bg-[#080b11] md:min-h-[760px]">
          <Image
            src="/anite-photo.jpeg"
            alt="Portrait of Anite"
            fill
            sizes="(max-width: 1024px) 100vw, 46vw"
            className="object-cover object-[54%_32%] saturate-[0.92]"
          />
          <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,4,6,0.02),rgba(3,4,6,0.82)),radial-gradient(circle_at_68%_18%,rgba(255,179,92,0.18),transparent_24rem)]" />
          <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between rounded-2xl border border-white/[0.12] bg-black/[0.34] px-4 py-3 font-mono text-[10px] uppercase text-white/[0.54] backdrop-blur-xl">
            <span>Portrait study</span>
            <span>AI edit direction</span>
          </div>
        </div>

        <div className="space-y-6">
          <div data-reveal>
            <p className="font-mono text-xs uppercase text-[#7ac8ff]">About Anite</p>
            <h2 className="mt-4 max-w-3xl text-4xl font-black leading-[1] text-white md:text-6xl">
              Cinematic AI visuals with edit rhythm and taste.
            </h2>
          </div>

          <GlassPanel data-reveal className="p-6 md:p-8">
            <p className="text-xl leading-8 text-white/[0.76] md:text-2xl md:leading-9">
              Anite creates AI-powered video edits for creators, brands, real estate, and products — combining
              cinematic image direction, generative video, editing rhythm, and polished final delivery.
            </p>
            <div className="mt-8 grid gap-5 border-t border-white/[0.10] pt-6 sm:grid-cols-3">
              {[
                ["Focus", "AI video"],
                ["Format", "Reels / films"],
                ["Finish", "Premium edit"],
              ].map(([label, value]) => (
                <div key={label}>
                  <p className="font-mono text-[10px] uppercase text-white/[0.36]">{label}</p>
                  <p className="mt-2 text-sm font-semibold text-white">{value}</p>
                </div>
              ))}
            </div>
          </GlassPanel>

          <div data-reveal className="relative overflow-hidden rounded-[28px] border border-white/[0.12] bg-white/[0.04] p-4">
            <div className="relative h-64 overflow-hidden rounded-[22px] md:h-80">
              <Image
                src="/anite-photo-alt.jpeg"
                alt="Anite in an urban setting"
                fill
                sizes="(max-width: 1024px) 100vw, 46vw"
                className="object-cover object-[48%_28%] saturate-[0.9]"
              />
              <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,4,6,0.72),transparent_62%)]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

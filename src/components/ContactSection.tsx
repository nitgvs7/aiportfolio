import Image from "next/image";
import { MagneticButton } from "@/components/MagneticButton";

export function ContactSection() {
  return (
    <section id="contact" className="relative overflow-hidden px-5 py-24 md:px-8 md:py-32">
      <div className="ambient-sweep mx-auto max-w-7xl overflow-hidden rounded-[34px] border border-white/[0.14] bg-[linear-gradient(135deg,rgba(10,14,23,0.94),rgba(5,6,9,0.98))] px-5 py-16 md:rounded-[44px] md:px-12 md:py-24">
        <div aria-hidden="true" className="absolute -right-8 -top-12 h-72 w-72 opacity-[0.055]">
          <Image src="/anite-logo.png" alt="" fill sizes="288px" className="object-contain invert" />
        </div>
        <div className="relative z-10 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div data-reveal>
            <p className="font-mono text-xs uppercase text-[#ffcf92]">Final frame</p>
            <h2 className="mt-4 max-w-4xl text-5xl font-black leading-[0.96] text-white md:text-7xl">
              Let&apos;s build your next AI video.
            </h2>
          </div>
          <div data-reveal className="lg:justify-self-end">
            <div className="mb-8 space-y-3 font-mono text-sm text-white/[0.62]">
              <a className="block transition-colors hover:text-white" href="mailto:contact@anite.me">
                contact@anite.me
              </a>
              <a className="block transition-colors hover:text-white" href="https://x.com/anite_me" target="_blank" rel="noreferrer">
                @anite_me
              </a>
            </div>
            <MagneticButton href="mailto:contact@anite.me" variant="primary" className="w-full sm:w-auto">
              Start a project
            </MagneticButton>
          </div>
        </div>
        <footer className="relative z-10 mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-white/[0.10] pt-6 font-mono text-[10px] uppercase text-white/[0.36]">
          <span>Anite / AI Video Editor</span>
          <span>contact@anite.me</span>
        </footer>
      </div>
    </section>
  );
}

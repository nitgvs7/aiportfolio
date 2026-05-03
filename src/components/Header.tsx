"use client";

import { navItems } from "@/lib/portfolio-data";
import { Logo } from "@/components/Logo";

export function Header() {
  return (
    <header className="fixed left-0 right-0 top-0 z-[60] px-4 py-4 sm:px-6">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        <a
          href="#hero"
          aria-label="Anite home"
          className="glass-panel inline-flex h-12 w-12 items-center justify-center rounded-full"
        >
          <Logo size="sm" imageClassName="opacity-90" />
        </a>

        <nav
          aria-label="Primary navigation"
          className="site-nav glass-panel hidden items-center gap-1 rounded-full p-1 sm:flex"
        >
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 text-xs font-medium text-white/[0.68] transition-colors duration-300 hover:bg-white/[0.10] hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href="mailto:contact@anite.me"
          className="glass-panel rounded-full px-4 py-3 text-xs font-semibold text-white/[0.82] transition-colors duration-300 hover:text-white"
        >
          Contact
        </a>
      </div>
    </header>
  );
}

"use client";

import type { AnchorHTMLAttributes, ReactNode } from "react";
import { useRef } from "react";

type MagneticButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
  variant?: "primary" | "secondary";
};

const variants = {
  primary:
    "border-transparent bg-[linear-gradient(135deg,#f8d49a,#ff9f52)] text-[#071018] shadow-[0_18px_60px_rgba(255,179,92,0.26)] hover:shadow-[0_20px_70px_rgba(255,179,92,0.38)]",
  secondary:
    "border-white/[0.16] bg-white/[0.08] text-white backdrop-blur-xl hover:border-white/[0.30] hover:bg-white/[0.12]",
};

export function MagneticButton({
  children,
  className = "",
  variant = "secondary",
  onMouseMove,
  onMouseLeave,
  ...props
}: MagneticButtonProps) {
  const innerRef = useRef<HTMLSpanElement>(null);

  return (
    <a
      className={`group magnetic-button inline-flex min-h-12 items-center justify-center rounded-full border px-5 py-3 text-sm font-semibold transition-[background,border-color,box-shadow,color] duration-300 ${variants[variant]} ${className}`}
      onMouseMove={(event) => {
        onMouseMove?.(event);
        const inner = innerRef.current;
        if (!inner || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
          return;
        }
        const rect = event.currentTarget.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width - 0.5) * 14;
        const y = ((event.clientY - rect.top) / rect.height - 0.5) * 10;
        inner.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }}
      onMouseLeave={(event) => {
        onMouseLeave?.(event);
        if (innerRef.current) {
          innerRef.current.style.transform = "translate3d(0, 0, 0)";
        }
      }}
      {...props}
    >
      <span ref={innerRef} className="inline-flex items-center gap-2 transition-transform duration-300 ease-out">
        {children}
        <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
          -&gt;
        </span>
      </span>
    </a>
  );
}

import Image from "next/image";

type LogoProps = {
  className?: string;
  imageClassName?: string;
  size?: "sm" | "lg";
};

const sizes = {
  sm: "h-9 w-9",
  lg: "h-24 w-24",
};

export function Logo({ className = "", imageClassName = "", size = "sm" }: LogoProps) {
  return (
    <span className={`inline-flex items-center ${className}`}>
      <span className={`relative block ${sizes[size]}`}>
        <Image
          src="/anite-logo.png"
          alt="Anite"
          fill
          priority={size !== "sm"}
          sizes={size === "lg" ? "96px" : "48px"}
          className={`-translate-y-[8%] object-contain invert ${imageClassName}`}
        />
      </span>
    </span>
  );
}

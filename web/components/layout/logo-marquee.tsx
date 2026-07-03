import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

export type MarqueeLogo = {
  name: string;
  icon: string;
  url: string;
  width?: number;
  height?: number;
};

type LogoMarqueeProps = {
  logos: MarqueeLogo[];
  className?: string;
  speed?: "slow" | "normal";
};

export function LogoMarquee({
  logos,
  className,
  speed = "normal",
}: LogoMarqueeProps) {
  const duplicated = [...logos, ...logos];

  return (
    <div
      className={cn(
        "relative overflow-hidden mask-[linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]",
        className
      )}
    >
      <div
        className={cn(
          "flex w-max items-center gap-12 py-4",
          speed === "slow" ? "animate-marquee-slow" : "animate-marquee"
        )}
      >
        {duplicated.map((logo, index) => (
          <Link
            key={`${logo.name}-${index}`}
            href={logo.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex h-16 w-40 shrink-0 items-center justify-center rounded-2xl px-4 ring-1 ring-primary/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
          >
            <Image
              src={logo.icon}
              alt={logo.name}
              width={logo.width ?? 120}
              height={logo.height ?? 48}
              className="max-h-10 w-auto object-contain opacity-80 transition-opacity group-hover:opacity-100"
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
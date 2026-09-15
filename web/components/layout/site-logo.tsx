import Image from 'next/image';

import { cn } from "@/lib/utils";

type SiteLogoProps = {
  variant?: "default" | "hero" | "legacy";
  className?: string;
  size?: "sm" | "md";
  layout?: "stacked" | "inline";
  priority?: boolean;
};

export function SiteLogo({
  variant = "default",
  className,
  size = "md",
  layout = "stacked",
  priority = false,
}: SiteLogoProps) {
  const isHero = variant === "hero";
  const isLegacy = variant === 'legacy';
  const isSm = size === "sm";
  const isInline = layout === "inline";

  if (isLegacy) {
    return (
      <span className={cn('block', className)}>
        <Image
          src="/icons-src/navLogo-timeless.svg"
          alt="Cloud Native Summit Munich"
          width={3240}
          height={700}
          priority={priority}
          className="h-auto w-44 sm:w-48"
        />
      </span>
    );
  }

  return (
    <span
      className={cn(
        "font-heading font-bold tracking-tight transition-colors duration-300",
        isInline ? "inline text-sm leading-none" : "block leading-[1.05]",
        !isInline && (isSm ? "text-sm" : "text-lg drop-shadow-sm sm:text-xl"),
        isHero ? "text-white" : "text-primary",
        className
      )}
    >
      Cloud Native
      {isInline ? (
        <> <span className="text-[#0bbbef]">Summit Munich</span></>
      ) : (
        <>
          <br />
          <span className="text-[#0bbbef]">Summit Munich</span>
        </>
      )}
    </span>
  );
}

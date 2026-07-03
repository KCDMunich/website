import { cn } from "@/lib/utils";

type SiteLogoProps = {
  variant?: "default" | "hero";
  className?: string;
  size?: "sm" | "md";
  layout?: "stacked" | "inline";
};

export function SiteLogo({
  variant = "default",
  className,
  size = "md",
  layout = "stacked",
}: SiteLogoProps) {
  const isHero = variant === "hero";
  const isSm = size === "sm";
  const isInline = layout === "inline";

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
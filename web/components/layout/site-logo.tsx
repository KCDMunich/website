import { cn } from "@/lib/utils";

type SiteLogoProps = {
  variant?: "default" | "hero";
  className?: string;
  size?: "sm" | "md";
};

export function SiteLogo({
  variant = "default",
  className,
  size = "md",
}: SiteLogoProps) {
  const isHero = variant === "hero";
  const isSm = size === "sm";

  return (
    <span
      className={cn(
        "block font-heading font-bold leading-[1.05] tracking-tight transition-colors duration-300",
        isSm ? "text-sm" : "text-lg drop-shadow-sm sm:text-xl",
        isHero ? "text-white" : "text-primary",
        className
      )}
    >
      Cloud Native
      <br />
      <span className="text-[#0bbbef]">Summit Munich</span>
    </span>
  );
}
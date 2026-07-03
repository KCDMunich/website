import { cn } from "@/lib/utils";

type EyebrowProps = {
  children: React.ReactNode;
  className?: string;
  variant?: "light" | "dark";
};

export function Eyebrow({
  children,
  className,
  variant = "dark",
}: EyebrowProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.14em]",
        variant === "light"
          ? "bg-white/10 text-white ring-1 ring-white/20"
          : "bg-primary/8 text-primary ring-1 ring-primary/15",
        className
      )}
    >
      {children}
    </span>
  );
}
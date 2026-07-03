"use client";

import { cn } from "@/lib/utils";

type SchedulePillProps = {
  children: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
  className?: string;
  title?: string;
  "aria-label"?: string;
};

export function SchedulePill({
  children,
  active = false,
  onClick,
  className,
  title,
  "aria-label": ariaLabel,
}: SchedulePillProps) {
  return (
    <button
      type="button"
      title={title}
      aria-label={ariaLabel}
      onClick={onClick}
      className={cn(
        "inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-all",
        active
          ? "bg-primary text-primary-foreground shadow-sm"
          : "bg-muted/80 text-muted-foreground ring-1 ring-border hover:bg-muted hover:text-foreground",
        className
      )}
    >
      {children}
    </button>
  );
}
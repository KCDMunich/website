"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

const EVENT_START = new Date("2026-06-29T09:00:00+02:00");

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function getTimeLeft(): TimeLeft {
  const diff = Math.max(0, EVENT_START.getTime() - Date.now());

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function CountdownUnit({
  value,
  label,
  variant = "light",
}: {
  value: number;
  label: string;
  variant?: "light" | "dark";
}) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className={cn(
          "flex min-w-[4.5rem] items-center justify-center rounded-xl px-3 py-2.5 font-mono text-2xl font-bold tabular-nums sm:min-w-[5rem] sm:text-3xl",
          variant === "light"
            ? "bg-white/10 text-white ring-1 ring-white/15 backdrop-blur-sm"
            : "bg-primary/5 text-primary ring-1 ring-primary/10"
        )}
      >
        {String(value).padStart(2, "0")}
      </div>
      <span
        className={cn(
          "text-[10px] font-semibold uppercase tracking-widest",
          variant === "light" ? "text-white/60" : "text-muted-foreground"
        )}
      >
        {label}
      </span>
    </div>
  );
}

type CountdownProps = {
  variant?: "light" | "dark";
  className?: string;
};

export function Countdown({ variant = "light", className }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(getTimeLeft);

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className={cn("flex gap-3 sm:gap-4", className)}>
      <CountdownUnit value={timeLeft.days} label="Days" variant={variant} />
      <CountdownUnit value={timeLeft.hours} label="Hours" variant={variant} />
      <CountdownUnit value={timeLeft.minutes} label="Min" variant={variant} />
      <CountdownUnit value={timeLeft.seconds} label="Sec" variant={variant} />
    </div>
  );
}
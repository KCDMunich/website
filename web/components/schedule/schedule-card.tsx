"use client";

import { Clock, Heart, MapPin, Play, Users } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export type ScheduleCardSpeaker = {
  name: string;
  avatar?: string | null;
};

export type ScheduleCardProps = {
  startTime?: string;
  endTime?: string;
  title?: string;
  speakers?: ScheduleCardSpeaker[];
  location?: string;
  type?: string;
  isFavorite?: boolean;
  onFavoriteClick?: () => void;
  onClick?: () => void;
  isLive?: boolean;
  isPast?: boolean;
  recordingUrl?: string | null;
};

const typeStyles: Record<string, string> = {
  talk: "bg-primary/10 text-primary",
  workshop: "bg-[#0bbbef]/15 text-primary",
  keynote: "bg-primary text-primary-foreground",
  sponsor: "bg-muted text-muted-foreground",
  service: "bg-muted text-muted-foreground",
};

export const ScheduleCard = ({
  startTime = "",
  endTime = "",
  title = "",
  speakers = [],
  location = "",
  type = "talk",
  isFavorite = false,
  onFavoriteClick,
  onClick,
  isLive = false,
  isPast = false,
  recordingUrl,
}: ScheduleCardProps) => {
  const typeLabel =
    type === "sponsor" ? "Sponsored" : type.charAt(0).toUpperCase() + type.slice(1);

  return (
    <article
      className={cn(
        "group flex cursor-pointer flex-col rounded-2xl bg-card p-5 ring-1 ring-border/70 transition-all hover:-translate-y-0.5 hover:shadow-lg",
        isPast && "opacity-60",
        isLive && "ring-2 ring-[#0bbbef]/50"
      )}
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick?.();
        }
      }}
    >
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground">
            <Clock className="size-3.5" />
            {startTime} – {endTime}
          </span>
          {isLive ? (
            <Badge className="bg-red-500/10 text-red-600 hover:bg-red-500/10">
              <span className="mr-1.5 inline-block size-1.5 animate-pulse rounded-full bg-red-500" />
              Live
            </Badge>
          ) : null}
        </div>
        <Badge className={cn("shrink-0", typeStyles[type] ?? typeStyles.talk)}>
          {typeLabel}
        </Badge>
      </div>

      <h3 className="mb-4 text-base font-bold leading-snug text-foreground group-hover:text-primary">
        {title}
      </h3>

      {speakers.length > 0 ? (
        <div className="mb-4 flex items-center gap-3">
          <div className="flex -space-x-2">
            {speakers.slice(0, 3).map((speaker, index) => (
              <div
                key={`${speaker.name}-${index}`}
                className="size-8 overflow-hidden rounded-full ring-2 ring-card"
              >
                {speaker.avatar ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={speaker.avatar}
                    alt={speaker.name}
                    className="size-full object-cover"
                  />
                ) : (
                  <div className="flex size-full items-center justify-center bg-muted text-xs font-bold text-primary">
                    {speaker.name.charAt(0)}
                  </div>
                )}
              </div>
            ))}
          </div>
          <p className="flex items-start gap-1.5 text-sm text-muted-foreground">
            <Users className="mt-0.5 size-3.5 shrink-0" />
            <span className="line-clamp-2">
              {speakers.map((s) => s.name).join(", ")}
            </span>
          </p>
        </div>
      ) : null}

      <div className="mt-auto flex items-center justify-between gap-2 border-t border-border/60 pt-3">
        <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
          <MapPin className="size-3.5 shrink-0 text-primary" />
          <span className="line-clamp-1">{location}</span>
        </span>
        <div className="flex items-center gap-1">
          {recordingUrl ? (
            <a
              href={recordingUrl}
              className="rounded-lg p-2 text-primary transition-colors hover:bg-primary/10"
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              aria-label="Watch recording"
            >
              <Play className="size-4 fill-current" />
            </a>
          ) : null}
          <button
            type="button"
            className={cn(
              "rounded-lg p-2 transition-colors hover:bg-primary/10",
              isFavorite ? "text-red-500" : "text-muted-foreground"
            )}
            aria-label={
              isFavorite ? "Remove from favorites" : "Add to favorites"
            }
            onClick={(e) => {
              e.stopPropagation();
              onFavoriteClick?.();
            }}
          >
            <Heart className={cn("size-4", isFavorite && "fill-current")} />
          </button>
        </div>
      </div>
    </article>
  );
};
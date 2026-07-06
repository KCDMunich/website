"use client";

import { Heart } from "lucide-react";

import type { ScheduleCardSpeaker } from "@/components/schedule/schedule-card";
import { cn } from "@/lib/utils";

export type ScheduleGridCardProps = {
  startTime?: string;
  endTime?: string;
  title?: string;
  speakers?: ScheduleCardSpeaker[];
  speakerCompany?: string;
  type?: string;
  isFavorite?: boolean;
  onFavoriteClick?: () => void;
  onClick?: () => void;
  isLive?: boolean;
  isPast?: boolean;
  isService?: boolean;
  duration?: number;
};

const typeLabels: Record<string, string> = {
  talk: "Talk",
  workshop: "Workshop",
  keynote: "Keynote",
  sponsor: "Sponsored",
  service: "Service",
};

export function ScheduleGridCard({
  startTime = "",
  endTime = "",
  title = "",
  speakers = [],
  speakerCompany = "",
  type = "talk",
  isFavorite = false,
  onFavoriteClick,
  onClick,
  isLive = false,
  isPast = false,
  isService = false,
  duration,
}: ScheduleGridCardProps) {
  const typeLabel = typeLabels[type] ?? "Session";
  const speakerLine = speakers.map((speaker) => speaker.name).join(" / ");

  if (isService) {
    return (
      <div
        className={cn(
          "schedule-grid-card schedule-grid-card--service",
          isPast && "schedule-grid-card--past"
        )}
      >
        <p className="schedule-grid-card__time">
          {startTime}
          {endTime ? ` – ${endTime}` : ""}
        </p>
        <p className="schedule-grid-card__service-title">{title}</p>
      </div>
    );
  }

  return (
    <article
      className={cn(
        "schedule-grid-card group",
        isPast && "schedule-grid-card--past",
        isLive && "schedule-grid-card--live",
        isFavorite && "schedule-grid-card--favorite"
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
      <div className="schedule-grid-card__top">
        <div className="schedule-grid-card__meta">
          <span className="schedule-grid-card__type">{typeLabel}</span>
          {duration ? (
            <span className="schedule-grid-card__duration">{duration}m</span>
          ) : null}
          {isLive ? (
            <span className="schedule-grid-card__live">
              <span className="schedule-grid-card__live-dot" aria-hidden="true" />
              Live
            </span>
          ) : null}
        </div>
        <button
          type="button"
          className={cn(
            "schedule-grid-card__favorite",
            isFavorite && "schedule-grid-card__favorite--active"
          )}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          onClick={(e) => {
            e.stopPropagation();
            onFavoriteClick?.();
          }}
        >
          <Heart className={cn("size-3.5", isFavorite && "fill-current")} />
        </button>
      </div>

      <p className="schedule-grid-card__time">
        {startTime}
        {endTime ? ` – ${endTime}` : ""}
      </p>

      {speakers.length > 0 ? (
        <div className="schedule-grid-card__speakers">
          <div className="schedule-grid-card__avatars" aria-hidden="true">
            {speakers.slice(0, 3).map((speaker, index) => (
              <div
                key={`${speaker.name}-${index}`}
                className="schedule-grid-card__avatar"
              >
                {speaker.avatar ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={speaker.avatar} alt="" />
                ) : (
                  <span>{speaker.name.charAt(0)}</span>
                )}
              </div>
            ))}
          </div>
          <div className="schedule-grid-card__speaker-copy">
            <p className="schedule-grid-card__speaker">{speakerLine}</p>
            {speakerCompany ? (
              <p className="schedule-grid-card__company">{speakerCompany}</p>
            ) : null}
          </div>
        </div>
      ) : null}

      <h3 className="schedule-grid-card__title">{title}</h3>
    </article>
  );
}
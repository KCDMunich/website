"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { ScheduleSessionDetail } from "@/components/schedule/schedule-session-detail";
import { SESSIONIZE_SPEAKERS_URL, type Speaker } from "@/lib/speakers-data";
import {
  convertSessionsToEvents,
  fetchGridData,
  sendScheduleFavoriteStat,
  type ScheduleEvent,
} from '@/lib/sessionize';
import { getPublicSessionPath } from '@/lib/schedule-session';

type ScheduleSessionPageProps = {
  sessionId: string;
  backHref: string;
};

export function ScheduleSessionPage({
  sessionId,
  backHref,
}: ScheduleSessionPageProps) {
  const router = useRouter();
  const [events, setEvents] = useState<ScheduleEvent[]>([]);
  const [speakers, setSpeakers] = useState<Speaker[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [favorites, setFavorites] = useState<string[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const stored = localStorage.getItem("favorites");
      return stored ? JSON.parse(stored).map(String) : [];
    } catch {
      return [];
    }
  });

  const event = useMemo(
    () => events.find((entry) => String(entry.id) === String(sessionId)) ?? null,
    [events, sessionId]
  );

  useEffect(() => {
    const load = async () => {
      try {
        const [grid, speakerList] = await Promise.all([
          fetchGridData(),
          fetch(SESSIONIZE_SPEAKERS_URL).then((response) => response.json()),
        ]);
        setEvents(convertSessionsToEvents(grid, { showServiceSessions: true }));
        setSpeakers(speakerList);
      } catch (error) {
        console.error("Error loading session:", error);
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("favorites", JSON.stringify(favorites.map(String)));
    } catch {
      // Ignore localStorage errors
    }
  }, [favorites]);

  useEffect(() => {
    if (!isLoading && !event) {
      router.replace(backHref);
    }
  }, [isLoading, event, router, backHref]);

  const toggleFavorite = () => {
    if (!event) return;

    const idStr = String(event.id);
    setFavorites((current) => {
      const isFavorite = current.includes(idStr);
      const next = isFavorite
        ? current.filter((id) => id !== idStr)
        : [...current, idStr];
      sendScheduleFavoriteStat(idStr, isFavorite ? "remove" : "add");
      return next;
    });
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="size-10 animate-spin rounded-full border-4 border-primary/20 border-t-primary" />
      </div>
    );
  }

  if (!event) {
    return null;
  }

  return (
    <ScheduleSessionDetail
      event={event}
      speakers={speakers}
      backHref={backHref}
      sharePath={getPublicSessionPath(event)}
      isFavorite={favorites.includes(String(event.id))}
      onToggleFavorite={toggleFavorite}
    />
  );
}
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { ScheduleSessionDetail } from '@/components/schedule/schedule-session-detail';
import { ScheduleSessionSkeleton } from '@/components/schedule/schedule-session-skeleton';
import type { Speaker } from '@/lib/speakers-data';
import {
  getCachedScheduleEvent,
  getCachedSpeakersForEvent,
  loadScheduleData,
} from '@/lib/schedule-data-cache';
import { getPublicSessionPath } from '@/lib/schedule-session';
import { sendScheduleFavoriteStat, type ScheduleEvent } from '@/lib/sessionize';

type ScheduleSessionPageProps = {
  sessionId: string;
  backHref: string;
  initialEvent?: ScheduleEvent | null;
  initialSpeakers?: Speaker[];
};

export function ScheduleSessionPage({
  sessionId,
  backHref,
  initialEvent = null,
  initialSpeakers = [],
}: ScheduleSessionPageProps) {
  const router = useRouter();
  const [event, setEvent] = useState<ScheduleEvent | null>(
    initialEvent ?? getCachedScheduleEvent(sessionId),
  );
  const [speakers, setSpeakers] = useState<Speaker[]>(() => {
    if (initialSpeakers.length) return initialSpeakers;
    const cachedEvent = initialEvent ?? getCachedScheduleEvent(sessionId);
    return cachedEvent ? getCachedSpeakersForEvent(cachedEvent) : [];
  });
  const [isLoading, setIsLoading] = useState(!event);
  const [favorites, setFavorites] = useState<string[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const stored = localStorage.getItem('favorites');
      return stored ? JSON.parse(stored).map(String) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    let cancelled = false;

    const resolveSession = async () => {
      const cachedEvent = getCachedScheduleEvent(sessionId);
      if (cachedEvent && !cancelled) {
        setEvent(cachedEvent);
        const cachedSpeakers = getCachedSpeakersForEvent(cachedEvent);
        if (cachedSpeakers.length) {
          setSpeakers(cachedSpeakers);
        }
        setIsLoading(false);
      } else if (initialEvent && !cancelled) {
        setIsLoading(false);
      }

      try {
        const data = await loadScheduleData({ includeFullSpeakers: true });
        if (cancelled) return;

        const resolvedEvent =
          data.events.find((entry) => String(entry.id) === String(sessionId)) ?? null;
        setEvent(resolvedEvent);

        if (resolvedEvent) {
          const speakerIds = new Set(
            resolvedEvent.speakers?.map((speaker) => String(speaker.id)) ?? [],
          );
          setSpeakers(
            (data.fullSpeakers ?? []).filter((speaker) =>
              speakerIds.has(String(speaker.id)),
            ),
          );
        }
      } catch (error) {
        console.error('Error loading session:', error);
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    resolveSession();

    return () => {
      cancelled = true;
    };
  }, [initialEvent, sessionId]);

  useEffect(() => {
    try {
      localStorage.setItem('favorites', JSON.stringify(favorites.map(String)));
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
      sendScheduleFavoriteStat(idStr, isFavorite ? 'remove' : 'add');
      return next;
    });
  };

  if (isLoading && !event) {
    return <ScheduleSessionSkeleton />;
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
import { cache } from 'react';
import slugify from 'slugify';

import type { Speaker } from '@/lib/speakers-data';
import {
  convertSessionsToEvents,
  fetchGridData,
  getSpeakersUrl,
  type ScheduleEvent,
} from '@/lib/sessionize';

const slugifyOptions = {
  lower: true,
  strict: true,
  trim: true,
} as const;

const SESSION_ID_SEPARATOR = '--';

const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export function getSessionSlug(title: string, id: number | string): string {
  const titleSlug = slugify(title, slugifyOptions) || 'session';
  return `${titleSlug}${SESSION_ID_SEPARATOR}${id}`;
}

export function getSessionIdFromSlug(slug: string): string {
  const normalizedSlug = slug.replace(/\/$/, '');

  if (/^\d+$/.test(normalizedSlug) || UUID_PATTERN.test(normalizedSlug)) {
    return normalizedSlug;
  }

  const separatorIndex = normalizedSlug.lastIndexOf(SESSION_ID_SEPARATOR);
  if (separatorIndex !== -1) {
    return normalizedSlug.slice(separatorIndex + SESSION_ID_SEPARATOR.length);
  }

  // Backwards compatibility for briefly deployed title-id slugs with numeric ids.
  const numericMatch = normalizedSlug.match(/-(\d+)$/);
  if (numericMatch) {
    return numericMatch[1];
  }

  return normalizedSlug;
}

export function isCanonicalSessionSlug(
  slug: string,
  title: string,
  id: number | string,
): boolean {
  return slug === getSessionSlug(title, id);
}

export function getSessionPath(
  event: Pick<ScheduleEvent, 'id' | 'title'>,
  options?: { app?: boolean },
): string {
  const slug = getSessionSlug(event.title, event.id);
  const base = options?.app ? '/app/schedule/session' : '/schedule/session';
  return `${base}/${slug}`;
}

export function getPublicSessionPath(
  event: Pick<ScheduleEvent, 'id' | 'title'>,
): string {
  return getSessionPath(event);
}

export const getScheduleEvents = cache(async (): Promise<ScheduleEvent[]> => {
  const grid = await fetchGridData();
  return convertSessionsToEvents(grid, { showServiceSessions: true });
});

export const getFullSpeakers = cache(async (): Promise<Speaker[]> => {
  const response = await fetch(getSpeakersUrl(), {
    next: { revalidate: 300 },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch speakers (${response.status})`);
  }

  return response.json();
});

export const findScheduleEventById = cache(
  async (sessionId: string): Promise<ScheduleEvent | null> => {
    const events = await getScheduleEvents();
    return events.find((entry) => String(entry.id) === sessionId) ?? null;
  },
);

export const getSpeakersForSessionId = cache(
  async (sessionId: string): Promise<Speaker[]> => {
    const event = await findScheduleEventById(sessionId);
    if (!event?.speakers?.length) return [];

    const speakers = await getFullSpeakers();
    const speakerIds = new Set(event.speakers.map((speaker) => String(speaker.id)));

    return speakers.filter((speaker) => speakerIds.has(String(speaker.id)));
  },
);
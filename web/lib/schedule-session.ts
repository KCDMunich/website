import slugify from 'slugify';

import {
  convertSessionsToEvents,
  fetchGridData,
  type ScheduleEvent,
} from '@/lib/sessionize';

const slugifyOptions = {
  lower: true,
  strict: true,
  trim: true,
} as const;

export function getSessionSlug(title: string, id: number | string): string {
  const titleSlug = slugify(title, slugifyOptions) || 'session';
  return `${titleSlug}-${id}`;
}

export function getSessionIdFromSlug(slug: string): string {
  if (/^\d+$/.test(slug)) {
    return slug;
  }

  const match = slug.match(/-(\d+)$/);
  return match ? match[1] : slug;
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

export async function findScheduleEventById(
  sessionId: string,
): Promise<ScheduleEvent | null> {
  const grid = await fetchGridData();
  const events = convertSessionsToEvents(grid, { showServiceSessions: true });
  return events.find((entry) => String(entry.id) === sessionId) ?? null;
}
import type { Speaker } from '@/lib/speakers-data';
import {
  convertSessionsToEvents,
  fetchGridData,
  fetchSpeakers,
  getSpeakersUrl,
  type ScheduleEvent,
  type SessionizeGridDay,
  type SessionizeSpeaker,
} from '@/lib/sessionize';

const CACHE_TTL_MS = 5 * 60 * 1000;
const STORAGE_KEY = 'cns-schedule-data-v1';

type ScheduleDataCache = {
  grid: SessionizeGridDay[];
  events: ScheduleEvent[];
  sessionizeSpeakers: SessionizeSpeaker[];
  fullSpeakers: Speaker[] | null;
  fetchedAt: number;
};

let memoryCache: ScheduleDataCache | null = null;

function readStorageCache(): ScheduleDataCache | null {
  if (typeof window === 'undefined') return null;

  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as ScheduleDataCache;
    if (Date.now() - parsed.fetchedAt > CACHE_TTL_MS) {
      sessionStorage.removeItem(STORAGE_KEY);
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}

function writeStorageCache(cache: ScheduleDataCache) {
  if (typeof window === 'undefined') return;

  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(cache));
  } catch {
    // Ignore quota errors
  }
}

function getValidCache(): ScheduleDataCache | null {
  const cache = memoryCache ?? readStorageCache();
  if (!cache || Date.now() - cache.fetchedAt > CACHE_TTL_MS) {
    return null;
  }

  memoryCache = cache;
  return cache;
}

function commitCache(cache: ScheduleDataCache) {
  memoryCache = cache;
  writeStorageCache(cache);
}

async function fetchFullSpeakers(): Promise<Speaker[]> {
  const response = await fetch(getSpeakersUrl());
  if (!response.ok) {
    throw new Error(`Failed to fetch speakers (${response.status})`);
  }
  return response.json();
}

export function getCachedScheduleEvent(sessionId: string): ScheduleEvent | null {
  const cache = getValidCache();
  if (!cache) return null;
  return cache.events.find((entry) => String(entry.id) === String(sessionId)) ?? null;
}

export function getCachedSpeakersForEvent(event: ScheduleEvent): Speaker[] {
  const cache = getValidCache();
  if (!cache?.fullSpeakers?.length) return [];

  const speakerIds = new Set(event.speakers?.map((speaker) => String(speaker.id)) ?? []);
  return cache.fullSpeakers.filter((speaker) => speakerIds.has(String(speaker.id)));
}

export async function loadScheduleData(options?: {
  includeFullSpeakers?: boolean;
}): Promise<ScheduleDataCache> {
  const includeFullSpeakers = options?.includeFullSpeakers ?? false;
  const existing = getValidCache();

  if (existing) {
    const hasFullSpeakers = Boolean(existing.fullSpeakers?.length);
    if (!includeFullSpeakers || hasFullSpeakers) {
      return existing;
    }

    const fullSpeakers = await fetchFullSpeakers();
    const nextCache = { ...existing, fullSpeakers, fetchedAt: Date.now() };
    commitCache(nextCache);
    return nextCache;
  }

  const requests: [
    Promise<Awaited<ReturnType<typeof fetchGridData>>>,
    Promise<SessionizeSpeaker[]>,
    Promise<Speaker[]> | null,
  ] = [
    fetchGridData(),
    fetchSpeakers(),
    includeFullSpeakers ? fetchFullSpeakers() : null,
  ];

  const [grid, sessionizeSpeakers, fullSpeakers] = await Promise.all([
    requests[0],
    requests[1],
    requests[2] ?? Promise.resolve(null),
  ]);

  const cache: ScheduleDataCache = {
    grid,
    events: convertSessionsToEvents(grid, { showServiceSessions: true }),
    sessionizeSpeakers,
    fullSpeakers,
    fetchedAt: Date.now(),
  };

  commitCache(cache);
  return cache;
}

export function primeScheduleData(
  grid: SessionizeGridDay[],
  events: ScheduleEvent[],
  sessionizeSpeakers: SessionizeSpeaker[],
  fullSpeakers?: Speaker[] | null,
) {
  const existing = getValidCache();
  commitCache({
    grid,
    events,
    sessionizeSpeakers,
    fullSpeakers: fullSpeakers ?? existing?.fullSpeakers ?? null,
    fetchedAt: Date.now(),
  });
}
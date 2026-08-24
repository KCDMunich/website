import type { Speaker } from '@/lib/speakers-data';
import { SESSIONIZE_SPEAKERS_URL } from '@/lib/speakers-data';

const CACHE_TTL_MS = 5 * 60 * 1000;
const STORAGE_KEY = 'cns-speakers-data-v1';

type SpeakersCache = {
  speakers: Speaker[];
  fetchedAt: number;
};

let memoryCache: SpeakersCache | null = null;

function readStorageCache(): SpeakersCache | null {
  if (typeof window === 'undefined') return null;

  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as SpeakersCache;
    if (Date.now() - parsed.fetchedAt > CACHE_TTL_MS) {
      sessionStorage.removeItem(STORAGE_KEY);
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}

function writeStorageCache(cache: SpeakersCache) {
  if (typeof window === 'undefined') return;

  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(cache));
  } catch {
    // Ignore quota errors
  }
}

function getValidCache(): SpeakersCache | null {
  const cache = memoryCache ?? readStorageCache();
  if (!cache || Date.now() - cache.fetchedAt > CACHE_TTL_MS) {
    return null;
  }

  memoryCache = cache;
  return cache;
}

export function getCachedSpeaker(speakerId: string): Speaker | null {
  const cache = getValidCache();
  if (!cache) return null;
  return cache.speakers.find((speaker) => String(speaker.id) === speakerId) ?? null;
}

export async function loadSpeakersData(): Promise<Speaker[]> {
  const cached = getValidCache();
  if (cached) return cached.speakers;

  const response = await fetch(SESSIONIZE_SPEAKERS_URL);
  if (!response.ok) {
    throw new Error(`Failed to fetch speakers (${response.status})`);
  }

  const speakers = (await response.json()) as Speaker[];
  const nextCache = { speakers, fetchedAt: Date.now() };
  memoryCache = nextCache;
  writeStorageCache(nextCache);
  return speakers;
}

export function primeSpeakersData(speakers: Speaker[]) {
  const cache = { speakers, fetchedAt: Date.now() };
  memoryCache = cache;
  writeStorageCache(cache);
}
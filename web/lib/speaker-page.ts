import { cache } from 'react';
import slugify from 'slugify';

import type { Speaker, SpeakerSession } from '@/lib/speakers-data';
import { getFullSpeakers } from '@/lib/schedule-session';

const slugifyOptions = {
  lower: true,
  strict: true,
  trim: true,
} as const;

const SPEAKER_ID_SEPARATOR = '--';

const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export function getSpeakerSlug(fullName: string, id: string): string {
  const nameSlug = slugify(fullName, slugifyOptions) || 'speaker';
  return `${nameSlug}${SPEAKER_ID_SEPARATOR}${id}`;
}

export function getSpeakerIdFromSlug(slug: string): string {
  const normalizedSlug = slug.replace(/\/$/, '');

  if (UUID_PATTERN.test(normalizedSlug)) {
    return normalizedSlug;
  }

  const separatorIndex = normalizedSlug.lastIndexOf(SPEAKER_ID_SEPARATOR);
  if (separatorIndex !== -1) {
    return normalizedSlug.slice(separatorIndex + SPEAKER_ID_SEPARATOR.length);
  }

  return normalizedSlug;
}

export function getSpeakerPath(speaker: Pick<Speaker, 'id' | 'fullName'>): string {
  return `/speakers/${getSpeakerSlug(speaker.fullName, speaker.id)}`;
}

export function getPublicSpeakerPath(speaker: Pick<Speaker, 'id' | 'fullName'>): string {
  return getSpeakerPath(speaker);
}

export const findSpeakerById = cache(
  async (speakerId: string): Promise<Speaker | null> => {
    const speakers = await getFullSpeakers();
    return speakers.find((speaker) => String(speaker.id) === speakerId) ?? null;
  },
);

export function getValidSpeakerSessions(speaker: Speaker): SpeakerSession[] {
  if (!Array.isArray(speaker.sessions)) return [];

  return speaker.sessions.filter(
    (session) =>
      typeof session === 'object' &&
      session !== null &&
      (typeof session.id === 'number' || typeof session.id === 'string') &&
      typeof session.name === 'string',
  );
}
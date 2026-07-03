export const SESSIONIZE_SPEAKERS_URL =
  "https://sessionize.com/api/v2/1yvxke5i/view/Speakers"

/** Speaker wall on homepage (`lineup` mode): 5 columns × 2 rows. */
export const LINEUP_SPEAKER_COUNT = 10;

/**
 * Curated pre-announcement list (`announced` mode).
 * Add Sessionize speaker IDs as they are announced.
 */
export const PRE_ANNOUNCED_SPEAKER_IDS = [
  "a2665c2b-13c9-4337-9c78-db85bca70e60",
  "647c84a5-1a13-4641-8d8f-49109cadf78b",
];

export const SPEAKER_SESSION_MAP: Record<string, number[]> = {
  "a2665c2b-13c9-4337-9c78-db85bca70e60": [882116],
  "b4047d7c-94cf-4f5e-bbdb-7619ab241f06": [847107],
  "be3da75f-4550-4f7f-9d44-863076ed4e91": [836276],
  "647c84a5-1a13-4641-8d8f-49109cadf78b": [870316],
  "8f398417-82f0-467a-b234-08e82f7f9acd": [867444],
  "38a4131f-b1ca-452a-aaba-f5bb472403ab": [855080],
}

export interface SpeakerSession {
  id: number
  name: string
}

export interface SpeakerLink {
  title: string
  url: string
  linkType: string
}

export interface SpeakerQuestionAnswer {
  question: string
  answer: string
}

export interface Speaker {
  id: string
  fullName: string
  bio: string
  profilePicture: string
  sessions: SpeakerSession[]
  links: SpeakerLink[]
  questionAnswers: SpeakerQuestionAnswer[]
}

function applySessionFilter(speaker: Speaker): Speaker {
  const sessionIds = SPEAKER_SESSION_MAP[speaker.id];
  if (!sessionIds || !Array.isArray(speaker.sessions)) {
    return speaker;
  }

  const filtered = speaker.sessions.filter((session) =>
    sessionIds.includes(session.id)
  );

  return {
    ...speaker,
    sessions: filtered.length > 0 ? filtered : speaker.sessions,
  };
}

function shuffleSpeakers(speakers: Speaker[]): Speaker[] {
  const shuffled = [...speakers];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/** `announced` mode — only manually curated speakers that exist in Sessionize. */
export function getAnnouncedSpeakers(speakers: Speaker[]): Speaker[] {
  const byId = new Map(speakers.map((speaker) => [speaker.id, speaker]));

  return PRE_ANNOUNCED_SPEAKER_IDS.map((id) => byId.get(id))
    .filter((speaker): speaker is Speaker => Boolean(speaker))
    .map(applySessionFilter);
}

/** `lineup` mode — shuffled speaker wall preview (default 10). */
export function getLineupSpeakers(
  speakers: Speaker[],
  count = LINEUP_SPEAKER_COUNT
): Speaker[] {
  return shuffleSpeakers(speakers)
    .slice(0, Math.min(count, speakers.length))
    .map(applySessionFilter);
}
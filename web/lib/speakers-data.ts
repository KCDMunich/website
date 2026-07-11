export const SESSIONIZE_SPEAKERS_URL = 'https://sessionize.com/api/v2/1yvxke5i/view/Speakers';

/** Speaker wall on homepage (`lineup` mode): 5 columns × 2 rows. */
export const LINEUP_SPEAKER_COUNT = 10;

export const SPEAKER_SESSION_MAP: Record<string, number[]> = {
  'a2665c2b-13c9-4337-9c78-db85bca70e60': [882116],
  '647c84a5-1a13-4641-8d8f-49109cadf78b': [870316],
};

export interface SpeakerSession {
  id: number;
  name: string;
}

export interface SpeakerLink {
  title: string;
  url: string;
  linkType: string;
}

export interface SpeakerQuestionAnswer {
  question: string;
  answer: string;
}

export interface Speaker {
  id: string;
  fullName: string;
  bio: string;
  profilePicture: string;
  sessions: SpeakerSession[];
  links: SpeakerLink[];
  questionAnswers: SpeakerQuestionAnswer[];
}

export function findCompanyInfo(speaker: Speaker): string {
  const company = speaker.questionAnswers?.find(
    (entry) => entry.question?.toLowerCase() === 'company'
  );
  return company?.answer || 'Speaker';
}

export function findSpeakerTagline(speaker: Speaker): string {
  const preferred = ['job title', 'title', 'position', 'role'];
  const match = speaker.questionAnswers?.find((entry) =>
    preferred.includes(entry.question?.toLowerCase() ?? '')
  );
  return match?.answer || '';
}

function applySessionFilter(speaker: Speaker): Speaker {
  const sessionIds = SPEAKER_SESSION_MAP[speaker.id];
  if (!sessionIds || !Array.isArray(speaker.sessions)) {
    return speaker;
  }

  const filtered = speaker.sessions.filter((session) => sessionIds.includes(session.id));

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
export function getAnnouncedSpeakers(
  speakers: Speaker[],
  announcedSpeakerIds: readonly string[]
): Speaker[] {
  const byId = new Map(speakers.map((speaker) => [speaker.id, speaker]));

  return announcedSpeakerIds
    .map((id) => byId.get(id))
    .filter((speaker): speaker is Speaker => Boolean(speaker))
    .map(applySessionFilter);
}

/** `lineup` mode — shuffled speaker wall preview (default 10). */
export function getLineupSpeakers(speakers: Speaker[], count = LINEUP_SPEAKER_COUNT): Speaker[] {
  return shuffleSpeakers(speakers)
    .slice(0, Math.min(count, speakers.length))
    .map(applySessionFilter);
}

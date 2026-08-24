import {
  roomDisplayDetails,
  sessionLocationOverrides,
  sponsorSessionIds,
  workshopSessionIds,
} from '@/lib/schedule-config';

export const SESSIONIZE_EVENT_ID = process.env.SESSIONIZE_EVENT_ID ?? '1yvxke5i';

const scheduleStatsEndpoint = process.env.NEXT_PUBLIC_SCHEDULE_STATS_ENDPOINT ?? '';

const sessionFormatCategoryNames = ['session format', 'session type'];

export type RecordingMeta = {
  url: string | null;
  thumbnail: string | null;
};

export type ScheduleEventType = 'talk' | 'workshop' | 'keynote' | 'sponsor' | 'service';

export type SessionizeSpeaker = {
  id: number | string;
  name: string;
  profilePicture?: string;
  questionAnswers?: Array<{
    question?: string;
    answer?: string;
  }>;
};

export type SessionizeCategoryItem = {
  name?: string;
};

export type SessionizeCategory = {
  name?: string;
  categoryItems?: SessionizeCategoryItem[];
};

export type SessionizeSessionSpeaker = {
  id: number | string;
  name: string;
};

export type SessionizeSession = {
  id: number | string;
  title: string;
  description?: string;
  startsAt: string;
  endsAt: string;
  status?: string;
  isServiceSession?: boolean;
  recordingUrl?: string;
  speakers?: SessionizeSessionSpeaker[];
  categories?: SessionizeCategory[];
};

export type SessionizeRoom = {
  name: string;
  sessions: SessionizeSession[];
};

export type SessionizeGridDay = {
  date: string;
  rooms: SessionizeRoom[];
};

export type ScheduleEvent = {
  id: number | string;
  title: string;
  description: string;
  time: string;
  endTime: string;
  duration: number;
  room: string;
  originalRoom: string;
  type: ScheduleEventType;
  speakers?: SessionizeSessionSpeaker[];
  start: string;
  end: string;
  isServiceSession: boolean;
  recordingUrl: string | null;
  recordingThumbnail: string | null;
};

export type SessionFilters = {
  showServiceSessions: boolean;
};

export type RoomDisplayDetails = {
  title: string;
  room: string;
};

const getSessionizeBaseUrl = () =>
  `https://sessionize.com/api/v2/${SESSIONIZE_EVENT_ID}/view`;

export const getGridSmartUrl = () => `${getSessionizeBaseUrl()}/GridSmart`;

export const getSpeakersUrl = () => `${getSessionizeBaseUrl()}/Speakers`;

const SESSIONIZE_REVALIDATE_SECONDS = 300;

export const fetchGridData = async (): Promise<SessionizeGridDay[]> => {
  const response = await fetch(getGridSmartUrl(), {
    next: { revalidate: SESSIONIZE_REVALIDATE_SECONDS },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch schedule grid (${response.status})`);
  }

  return response.json();
};

export const fetchSpeakers = async (): Promise<SessionizeSpeaker[]> => {
  const response = await fetch(getSpeakersUrl(), {
    next: { revalidate: SESSIONIZE_REVALIDATE_SECONDS },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch schedule speakers (${response.status})`);
  }

  return response.json();
};

export const getRecordingMeta = (url?: string | null): RecordingMeta => {
  if (!url) {
    return { url: null, thumbnail: null };
  }

  try {
    const parsed = new URL(url);
    let videoId = '';
    const hostname = parsed.hostname.toLowerCase();

    if (hostname.includes('youtu.be')) {
      videoId = parsed.pathname.replace('/', '');
    } else if (hostname.includes('youtube.com')) {
      videoId = parsed.searchParams.get('v') || '';
      if (!videoId && parsed.pathname.startsWith('/embed/')) {
        videoId = parsed.pathname.replace('/embed/', '');
      }
    }

    videoId = videoId.split('?')[0].split('&')[0];

    if (!videoId) {
      return { url, thumbnail: null };
    }

    return {
      url,
      thumbnail: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
    };
  } catch {
    return { url, thumbnail: null };
  }
};

export const sendScheduleFavoriteStat = (eventId: number | string, action: 'add' | 'remove') => {
  if (!scheduleStatsEndpoint || typeof fetch !== 'function') {
    return;
  }

  fetch(scheduleStatsEndpoint, {
    method: 'POST',
    mode: 'cors',
    credentials: 'omit',
    keepalive: true,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      eventId: String(eventId),
      action,
    }),
  })
    .then((response) => {
      if (!response.ok && process.env.NODE_ENV === 'development') {
        console.warn(
          `Could not update anonymous schedule favorite statistics. Status: ${response.status}`,
        );
      }
    })
    .catch((error) => {
      if (process.env.NODE_ENV === 'development') {
        console.warn('Could not update anonymous schedule favorite statistics.', error);
      }
    });
};

const hasSessionFormat = (session: SessionizeSession | undefined, formatName: string) => {
  if (!session?.categories?.length) {
    return false;
  }

  return session.categories.some((category) => {
    if (!sessionFormatCategoryNames.includes(category.name?.toLowerCase() ?? '')) {
      return false;
    }

    return category.categoryItems?.some(
      (item) => item.name?.toLowerCase() === formatName.toLowerCase(),
    );
  });
};

export const isSponsorSession = (session: SessionizeSession | undefined, room?: string) => {
  if (sponsorSessionIds.includes(String(session?.id))) return true;
  if (room?.toLowerCase().includes('sponsor')) return true;
  if (!session?.categories?.length) return false;
  return session.categories.some(
    (category) =>
      category.name?.toLowerCase() === 'sponsor talk' &&
      category.categoryItems?.some((item) => item.name?.toLowerCase() === 'yes'),
  );
};

export const isWorkshopSession = (room: string | undefined, session: SessionizeSession | undefined) => {
  const normalizedRoomName = room?.toLowerCase() || '';

  return (
    hasSessionFormat(session, 'Workshop') ||
    workshopSessionIds.includes(String(session?.id)) ||
    normalizedRoomName.includes('workshop')
  );
};

export const getEventRoom = (room: string, session: SessionizeSession) => {
  return isWorkshopSession(room, session) ? 'Workshops' : room;
};

export const getEventTypeLabel = (type: ScheduleEventType) => {
  if (type === 'sponsor') return 'Sponsored';
  return type.charAt(0).toUpperCase() + type.slice(1);
};

export const getRoomDisplayDetails = (room: string): RoomDisplayDetails =>
  roomDisplayDetails[room] || { title: room, room: '' };

export const getRoomDisplayLabel = (room: string) => {
  const roomDisplay = getRoomDisplayDetails(room);
  return roomDisplay.room ? `${roomDisplay.title} - ${roomDisplay.room}` : roomDisplay.title;
};

export const getRoomLocationLabel = (room: string) => {
  const roomDisplay = getRoomDisplayDetails(room);
  return roomDisplay.room || roomDisplay.title;
};

export const getEventLocationLabel = (event: Pick<ScheduleEvent, 'id' | 'room'>) => {
  const roomLocation =
    sessionLocationOverrides[String(event?.id)] || getRoomLocationLabel(event?.room);
  return `Room: ${roomLocation}`;
};

const calculateDuration = (start: string, end: string) => {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const duration = (endDate.getTime() - startDate.getTime()) / 1000 / 60;
  return Math.round(duration);
};

export const determineEventType = (
  room: string,
  session: SessionizeSession,
  originalRoom: string,
): ScheduleEventType => {
  if (session && session.isServiceSession) return 'service';
  if (hasSessionFormat(session, 'Keynote')) return 'keynote';
  if (isSponsorSession(session, originalRoom)) return 'sponsor';
  if (isWorkshopSession(room, session)) return 'workshop';
  return 'talk';
};

export const convertSessionsToEvents = (
  data: SessionizeGridDay[],
  filters: SessionFilters,
): ScheduleEvent[] => {
  const events: ScheduleEvent[] = [];

  data.forEach((day) => {
    day.rooms.forEach((room) => {
      const filteredSessions = room.sessions.filter((session) => {
        if (filters.showServiceSessions && session.isServiceSession) {
          return true;
        }
        if (sponsorSessionIds.includes(String(session.id))) {
          return session.status === 'Accepted' && !session.isServiceSession;
        }
        return session.status === 'Accepted' && !session.isServiceSession;
      });

      const roomEvents = filteredSessions.map((session) => {
        const recordingMeta = getRecordingMeta(session.recordingUrl);
        const eventRoom = getEventRoom(room.name, session);

        return {
          id: session.id,
          title: session.title,
          description: session.description || '',
          time: new Date(session.startsAt).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
          endTime: new Date(session.endsAt).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
          duration: calculateDuration(session.startsAt, session.endsAt),
          room: eventRoom,
          originalRoom: room.name,
          type: determineEventType(eventRoom, session, room.name),
          speakers: session.speakers,
          start: session.startsAt,
          end: session.endsAt,
          isServiceSession: session.isServiceSession || false,
          recordingUrl: recordingMeta.url,
          recordingThumbnail: recordingMeta.thumbnail,
        };
      });

      events.push(...roomEvents);
    });
  });

  return events.sort(
    (a, b) => new Date(a.start).getTime() - new Date(b.start).getTime(),
  );
};

export const groupEventsByRoomAndStart = (scheduleEvents: ScheduleEvent[]) => {
  return scheduleEvents.reduce<Record<string, Record<string, ScheduleEvent[]>>>((acc, event) => {
    if (!acc[event.room]) {
      acc[event.room] = {};
    }
    if (!acc[event.room][event.start]) {
      acc[event.room][event.start] = [];
    }
    acc[event.room][event.start].push(event);
    return acc;
  }, {});
};

export const getTimeSlots = (scheduleEvents: ScheduleEvent[]) => {
  return [...new Set(scheduleEvents.map((event) => event.start))].sort(
    (a, b) => new Date(a).getTime() - new Date(b).getTime(),
  );
};

export const findSpeakerProfile = (
  speakerData: SessionizeSpeaker[],
  speakerId: number | string,
) => {
  const speaker = speakerData.find((entry) => entry.id === speakerId);
  return speaker ? speaker.profilePicture : null;
};

export const findSpeakerCompany = (
  speakerData: SessionizeSpeaker[],
  speakerId: number | string,
) => {
  const speaker = speakerData.find((entry) => entry.id === speakerId);
  const companyAnswer = speaker?.questionAnswers?.find(
    (questionAnswer) => questionAnswer.question?.toLowerCase() === 'company',
  );

  return companyAnswer?.answer || '';
};
'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState, type CSSProperties } from 'react';

import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog';
import { ScheduleCard } from '@/components/schedule/schedule-card';
import { SchedulePill } from '@/components/schedule/schedule-pill';
import { Eyebrow } from '@/components/layout/eyebrow';
import {
  convertSessionsToEvents,
  fetchGridData,
  fetchSpeakers,
  findSpeakerCompany,
  findSpeakerProfile,
  getEventLocationLabel,
  getEventTypeLabel,
  getRoomDisplayDetails,
  getRoomDisplayLabel,
  groupEventsByRoomAndStart,
  getTimeSlots,
  sendScheduleFavoriteStat,
  type ScheduleEvent,
  type SessionizeGridDay,
  type SessionizeSpeaker,
} from '@/lib/sessionize';

import './schedule.css';
import './schedule-app.css';

type ScheduleViewProps = {
  variant?: 'default' | 'app';
};

type EventModalProps = {
  event: ScheduleEvent | null;
  favorites: string[];
  toggleFavorite: (eventId: number | string) => void;
  speakerData: SessionizeSpeaker[];
  displayRoom: string;
};

const EventModal = ({
  event,
  favorites,
  toggleFavorite,
  speakerData,
  displayRoom,
}: EventModalProps) => {
  if (!event) return null;

  const isFavorite = favorites.includes(String(event.id));

  const handleShare = async () => {
    const shareUrl = `${window.location.origin}/schedule?event=${event.id}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: event.title,
          url: shareUrl,
        });
      } catch {
        // User cancelled share
      }
    } else if (navigator.clipboard) {
      await navigator.clipboard.writeText(shareUrl);
      alert('Link copied!');
    } else {
      window.prompt('Copy this link:', shareUrl);
    }
  };

  const handleCopy = async () => {
    const shareUrl = `${window.location.origin}/schedule?event=${event.id}`;
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(shareUrl);
      alert('Link copied!');
    } else {
      window.prompt('Copy this link:', shareUrl);
    }
  };

  return (
    <div className="event-modal">
      <h2>{event.title}</h2>
      {event.isServiceSession ? (
        <p className="confirmed-session-label">
          <strong>Service Session</strong>
        </p>
      ) : (
        <p className="confirmed-session-label">
          <strong>Confirmed Session</strong>
        </p>
      )}

      {event.recordingThumbnail && event.recordingUrl && (
        <a
          href={event.recordingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="modal-recording-preview"
        >
          <img
            src={event.recordingThumbnail}
            alt={`Watch recording of ${event.title}`}
            className="modal-recording-image"
          />
          <span className="modal-recording-overlay" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
          <span className="modal-recording-caption">Watch recording</span>
        </a>
      )}

      <div className="modal-main-content">
        <div className="description-section">
          <h3>Description</h3>
          <div className="event-description" style={{ whiteSpace: 'pre-line' }}>
            {event.description}
          </div>
        </div>

        <div className="info-speakers-section">
          <div className="session-info">
            <h3>Session Info</h3>
            <p>
              <strong>Time</strong>
              <br />
              {event.time} - {event.endTime}
            </p>
            <p>
              <strong>Room</strong>
              <br />
              {displayRoom}
            </p>
            <p>
              <strong>Session Type</strong>
              <br />
              {getEventTypeLabel(event.type)}
            </p>
          </div>

          <div className="speakers-section">
            <h3>Speakers</h3>
            {event.speakers?.map((speaker) => {
              const speakerProfile = findSpeakerProfile(speakerData, speaker.id);
              const speakerCompany = findSpeakerCompany(speakerData, speaker.id);

              return (
                <div key={speaker.id} className="speaker-detail">
                  {speakerProfile && (
                    <img
                      src={speakerProfile}
                      alt={speaker.name}
                      className="speaker-avatar-large"
                    />
                  )}
                  <div className="speaker-copy">
                    <h4>{speaker.name}</h4>
                    {speakerCompany && <p className="speaker-company">{speakerCompany}</p>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <button
        type="button"
        className={`modal-favorite-button ${isFavorite ? 'favorited' : ''}`}
        aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        onClick={() => toggleFavorite(event.id)}
      >
        <svg
          className="schedule-card-favorite-icon"
          viewBox="0 0 24 24"
          fill={isFavorite ? 'currentColor' : 'none'}
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      </button>

      <div className="modal-actions">
        {event.recordingUrl && (
          <a
            className="modal-action-button modal-action-recording"
            href={event.recordingUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
            Watch recording
          </a>
        )}

        <button
          type="button"
          className="modal-action-button"
          title="Share or copy session link"
          onClick={handleShare}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="18" cy="5" r="3" />
            <circle cx="6" cy="12" r="3" />
            <circle cx="18" cy="19" r="3" />
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
          </svg>
          Share
        </button>

        <button
          type="button"
          className="modal-action-button"
          title="Copy session link"
          onClick={handleCopy}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg>
          Copy
        </button>
      </div>
    </div>
  );
};

export const ScheduleView = ({ variant = 'default' }: ScheduleViewProps) => {
  const searchParams = useSearchParams();
  const [speakerData, setSpeakerData] = useState<SessionizeSpeaker[]>([]);
  const [gridData, setGridData] = useState<SessionizeGridDay[]>([]);
  const [events, setEvents] = useState<ScheduleEvent[]>([]);
  const [selectedDay, setSelectedDay] = useState<'monday' | 'tuesday'>('monday');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedEvent, setSelectedEvent] = useState<ScheduleEvent | null>(null);
  const [deepLinkDismissed, setDeepLinkDismissed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(() => new Date());
  const [isRoomSheetOpen, setIsRoomSheetOpen] = useState(false);
  const [showLiveOnly, setShowLiveOnly] = useState(false);
  const [favorites, setFavorites] = useState<string[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const stored = localStorage.getItem('favorites');
      return stored ? JSON.parse(stored).map(String) : [];
    } catch {
      return [];
    }
  });
  const [isMobile, setIsMobile] = useState(false);

  const selectedGridDay = useMemo(() => {
    if (!gridData.length) return null;
    if (selectedDay === 'monday') return gridData[0];
    if (selectedDay === 'tuesday') return gridData[1];
    return null;
  }, [gridData, selectedDay]);

  const getReadableDate = (dateValue?: string) => {
    if (!dateValue) return '';
    return new Date(dateValue).toLocaleDateString(undefined, {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
    });
  };

  const filterEventsByDay = (scheduleEvents: ScheduleEvent[]) => {
    if (!selectedGridDay) return [];
    const gridDate = new Date(selectedGridDay.date).getDate();
    return scheduleEvents.filter((event) => {
      const eventDate = new Date(event.start).getDate();
      return eventDate === gridDate;
    });
  };

  const rooms = useMemo(() => {
    if (!selectedGridDay) return [];
    const gridDate = new Date(selectedGridDay.date).getDate();
    const dayEvents = events.filter((event) => {
      const eventDate = new Date(event.start).getDate();
      return eventDate === gridDate;
    });
    return [...new Set(dayEvents.map((event) => event.room))];
  }, [events, selectedGridDay]);

  const deepLinkEvent = useMemo(() => {
    const eventId = searchParams.get('event');
    if (!eventId || !events.length) return null;
    return events.find((entry) => String(entry.id) === String(eventId)) ?? null;
  }, [events, searchParams]);

  const modalEvent = selectedEvent ?? (deepLinkDismissed ? null : deepLinkEvent);

  const closeModal = () => {
    setSelectedEvent(null);
    setDeepLinkDismissed(true);
  };

  const isLive = (start: string, end: string) => {
    const startTime = new Date(start);
    const endTime = new Date(end);
    return currentTime >= startTime && currentTime <= endTime;
  };

  const toggleFavorite = (eventId: number | string) => {
    const idStr = String(eventId);
    setFavorites((currentFavorites) => {
      const isFavorite = currentFavorites.includes(idStr);
      const nextFavorites = isFavorite
        ? currentFavorites.filter((id) => id !== idStr)
        : [...currentFavorites, idStr];
      sendScheduleFavoriteStat(idStr, isFavorite ? 'remove' : 'add');
      return nextFavorites;
    });
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const [speakers, grid] = await Promise.all([fetchSpeakers(), fetchGridData()]);
        setSpeakerData(speakers);
        setGridData(grid);
        setEvents(convertSessionsToEvents(grid, { showServiceSessions: true }));
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('favorites', JSON.stringify(favorites.map(String)));
    } catch {
      // Ignore localStorage errors
    }
  }, [favorites]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(max-width: 768px)').matches);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="size-10 animate-spin rounded-full border-4 border-primary/20 border-t-primary" />
      </div>
    );
  }

  const isApp = variant === 'app';
  const isDesktopSchedulePage = !isApp && !isMobile;
  const activeSelectedType =
    isDesktopSchedulePage && selectedType !== 'favorites' ? 'all' : selectedType;

  let filteredEvents = filterEventsByDay(events);
  if (activeSelectedType === 'favorites') {
    filteredEvents = filteredEvents.filter((event) => favorites.includes(String(event.id)));
  } else if (activeSelectedType !== 'all') {
    filteredEvents = filteredEvents.filter((event) => event.room === activeSelectedType);
  }
  if (isApp && showLiveOnly) {
    filteredEvents = filteredEvents.filter((event) => isLive(event.start, event.end));
  }

  const upcomingEvents = filteredEvents;
  const eventsByRoomAndStart = groupEventsByRoomAndStart(upcomingEvents);
  const timeSlots = getTimeSlots(upcomingEvents);
  const displayDate = getReadableDate(selectedGridDay?.date);

  const getHeaderLabel = () => {
    if (showLiveOnly) return 'Live Now';
    if (activeSelectedType === 'favorites') return 'Favorites';
    if (activeSelectedType === 'all') return 'All Sessions';
    return getRoomDisplayLabel(activeSelectedType);
  };

  const timetableStyle: CSSProperties | undefined =
    !isApp && !isMobile
      ? ({ '--schedule-room-count': rooms.length } as CSSProperties)
      : undefined;

  return (
    <div className={`schedule-container${isApp ? ' schedule-container--app' : ''}`}>
      {!isApp && (
        <div className="border-b border-border/60 bg-muted/30">
          <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 px-4 py-4 sm:flex-row sm:items-center sm:px-6 lg:px-8">
            <div>
              <p className="font-semibold text-primary">Mobile schedule app</p>
              <p className="text-sm text-muted-foreground">
                Sticky filters, live sessions, favorites on the go.
              </p>
            </div>
            <Link
              href="/app/schedule"
              className="inline-flex items-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Open app
            </Link>
          </div>
        </div>
      )}

      {!isApp && (
        <section className="hero-mesh px-4 py-16 text-white sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-7xl">
            <Eyebrow variant="light" className="mb-4">
              Schedule
            </Eyebrow>
            <h1 className="max-w-3xl font-heading text-4xl font-bold tracking-tight sm:text-5xl">
              Plan your conference days
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-white/75">
              Browse talks, workshops, and service sessions. Save favorites and
              share sessions with your team.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {["Talks", "Workshops", "Service", "Recordings"].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-white/10 px-3 py-1 text-sm font-medium ring-1 ring-white/15"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {isApp && (
        <section className="schedule-app-header">
          <div className="schedule-app-header-inner">
            <div className="schedule-app-header-top">
              <div>
                <span className="schedule-app-pill">Schedule</span>
                <h1>{getHeaderLabel()}</h1>
                <p>{displayDate}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      <div className={`schedule-shell${isApp ? ' schedule-shell--app' : ''}`}>
        {!isApp && (
          <div className="sticky top-[4.25rem] z-20 border-b border-border/60 bg-background/90 px-4 py-4 backdrop-blur-xl sm:px-6 lg:px-8">
            <div className="mx-auto flex max-w-7xl flex-col gap-3">
              <div className="flex flex-wrap gap-2">
                <SchedulePill
                  active={selectedDay === 'monday'}
                  onClick={() => setSelectedDay('monday')}
                >
                  Monday
                </SchedulePill>
                <SchedulePill
                  active={selectedDay === 'tuesday'}
                  onClick={() => setSelectedDay('tuesday')}
                >
                  Tuesday
                </SchedulePill>
                <SchedulePill
                  active={activeSelectedType === 'favorites'}
                  title="Show favorites only"
                  aria-label="Show favorites only"
                  onClick={() =>
                    setSelectedType(activeSelectedType === 'favorites' ? 'all' : 'favorites')
                  }
                >
                  ♥ Favorites
                </SchedulePill>
              </div>
              {isMobile ? (
                <div className="flex gap-2 overflow-x-auto pb-1">
                  <SchedulePill
                    active={selectedType === 'all'}
                    onClick={() => setSelectedType('all')}
                  >
                    All rooms
                  </SchedulePill>
                  {rooms.map((room) => (
                    <SchedulePill
                      key={room}
                      active={selectedType === room}
                      onClick={() => setSelectedType(room)}
                    >
                      {getRoomDisplayLabel(room)}
                    </SchedulePill>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        )}

        <div
          className={isApp || isMobile ? 'schedule-grid' : 'schedule-timetable'}
          style={timetableStyle}
        >
          {isApp
            ? upcomingEvents
                .sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime())
                .map((event) => {
                  const isFavorite = favorites.includes(String(event.id));
                  const isLiveEvent = isLive(event.start, event.end);
                  const speakerProfile = (speakerId: number | string) =>
                    findSpeakerProfile(speakerData, speakerId);

                  return (
                    <div key={event.id} className="schedule-app-event">
                      <div className="schedule-app-time">
                        <span>{event.time}</span>
                        <small>{event.duration}m</small>
                      </div>
                      <div
                        className={`schedule-app-card ${
                          isLiveEvent ? 'schedule-app-card--live' : ''
                        }`}
                        onClick={() => setSelectedEvent(event)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            setSelectedEvent(event);
                          }
                        }}
                      >
                        <div className="schedule-app-card-header">
                          <span className={`schedule-app-type schedule-app-type-${event.type}`}>
                            {getEventTypeLabel(event.type)}
                          </span>
                          {isLiveEvent && (
                            <span className="schedule-app-live">
                              <span className="schedule-app-live-dot" aria-hidden="true"></span>
                              Live
                            </span>
                          )}
                          <button
                            type="button"
                            className={`schedule-app-favorite ${
                              isFavorite ? 'schedule-app-favorite--active' : ''
                            }`}
                            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleFavorite(event.id);
                            }}
                          >
                            <svg viewBox="0 0 24 24" fill="currentColor">
                              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                            </svg>
                          </button>
                        </div>
                        <h3 className="schedule-app-title">{event.title}</h3>
                        <div className="schedule-app-meta">
                          <span>{getEventLocationLabel(event)}</span>
                          <span>
                            {event.time} – {event.endTime}
                          </span>
                        </div>
                        <div className="schedule-app-speakers">
                          {event.speakers?.slice(0, 3).map((speaker) => (
                            <div key={speaker.id} className="schedule-app-speaker">
                              {speakerProfile(speaker.id) && (
                                <img src={speakerProfile(speaker.id)!} alt={speaker.name} />
                              )}
                              <span>{speaker.name}</span>
                            </div>
                          ))}
                        </div>
                        <div className="schedule-app-actions">
                          {event.recordingUrl && (
                            <button
                              type="button"
                              className="schedule-app-action"
                              onClick={(e) => {
                                e.stopPropagation();
                                window.open(event.recordingUrl!, '_blank', 'noopener,noreferrer');
                              }}
                            >
                              Watch recording
                            </button>
                          )}
                          <button
                            type="button"
                            className="schedule-app-action schedule-app-action--ghost"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedEvent(event);
                            }}
                          >
                            Details
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
            : isMobile
              ? upcomingEvents
                  .sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime())
                  .map((event) => {
                    const isFavorite = favorites.includes(String(event.id));
                    const isLiveEvent = isLive(event.start, event.end);

                    return (
                      <ScheduleCard
                        key={event.id}
                        startTime={event.time}
                        endTime={event.endTime}
                        title={event.title}
                        speakers={event.speakers?.map((speaker) => ({
                          name: speaker.name,
                          avatar: findSpeakerProfile(speakerData, speaker.id),
                        }))}
                        location={getEventLocationLabel(event)}
                        type={event.type}
                        isFavorite={isFavorite}
                        isLive={isLiveEvent}
                        isPast={new Date(event.end) < new Date()}
                        recordingUrl={event.recordingUrl}
                        onFavoriteClick={() => toggleFavorite(event.id)}
                        onClick={() => setSelectedEvent(event)}
                      />
                    );
                  })
              : [
                  rooms.map((room) => {
                    const roomDisplay = getRoomDisplayDetails(room);

                    return (
                      <div key={`header-${room}`} className="room-header schedule-timetable-header">
                        <h2>{roomDisplay.title}</h2>
                      </div>
                    );
                  }),
                  timeSlots.map((timeSlot) =>
                    rooms.map((room) => {
                      const slotEvents = eventsByRoomAndStart[room]?.[timeSlot] || [];

                      return (
                        <div
                          key={`${room}-${timeSlot}`}
                          className={`schedule-timetable-cell ${
                            slotEvents.length ? '' : 'schedule-timetable-cell--empty'
                          }`}
                        >
                          {slotEvents.map((event) => {
                            const isFavorite = favorites.includes(String(event.id));
                            const isLiveEvent = isLive(event.start, event.end);

                            return (
                              <ScheduleCard
                                key={event.id}
                                startTime={event.time}
                                endTime={event.endTime}
                                title={event.title}
                                speakers={event.speakers?.map((speaker) => ({
                                  name: speaker.name,
                                  avatar: findSpeakerProfile(speakerData, speaker.id),
                                }))}
                                location={getEventLocationLabel(event)}
                                type={event.type}
                                isFavorite={isFavorite}
                                isLive={isLiveEvent}
                                isPast={new Date(event.end) < new Date()}
                                recordingUrl={event.recordingUrl}
                                onFavoriteClick={() => toggleFavorite(event.id)}
                                onClick={() => setSelectedEvent(event)}
                              />
                            );
                          })}
                        </div>
                      );
                    }),
                  ),
                ]}
        </div>
      </div>

      {isApp && (
        <>
          <div
            className={`schedule-app-room-sheet ${isRoomSheetOpen ? 'is-open' : ''}`}
            role="dialog"
            aria-modal="true"
            aria-hidden={!isRoomSheetOpen}
          >
            <button
              type="button"
              className="schedule-app-room-sheet__backdrop"
              onClick={() => setIsRoomSheetOpen(false)}
              aria-label="Close room filter"
            ></button>
            <div className="schedule-app-room-sheet__panel">
              <div className="schedule-app-room-sheet__header">
                <p>Filter</p>
                <button
                  type="button"
                  onClick={() => setIsRoomSheetOpen(false)}
                  aria-label="Close room filter"
                >
                  Close
                </button>
              </div>
              <div className="schedule-app-room-sheet__list">
                <button
                  type="button"
                  className={`schedule-app-room-sheet__live ${showLiveOnly ? 'is-active' : ''}`}
                  onClick={() => {
                    setShowLiveOnly((prev) => !prev);
                    setIsRoomSheetOpen(false);
                  }}
                >
                  <span className="schedule-app-live-dot" aria-hidden="true"></span>
                  Live now
                </button>
                {rooms.map((room) => (
                  <button
                    key={room}
                    type="button"
                    className={selectedType === room ? 'is-active' : ''}
                    onClick={() => {
                      setSelectedType(room);
                      setShowLiveOnly(false);
                      setIsRoomSheetOpen(false);
                    }}
                  >
                    {getRoomDisplayLabel(room)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="schedule-app-bottom-bar">
            <div className="schedule-app-bottom-bar__inner">
              <button
                type="button"
                className={`schedule-app-bottom-btn ${selectedDay === 'monday' ? 'is-active' : ''}`}
                onClick={() => setSelectedDay('monday')}
              >
                Mon
              </button>
              <button
                type="button"
                className={`schedule-app-bottom-btn ${
                  selectedDay === 'tuesday' ? 'is-active' : ''
                }`}
                onClick={() => setSelectedDay('tuesday')}
              >
                Tue
              </button>
              <button
                type="button"
                className={`schedule-app-bottom-btn ${
                  selectedType === 'favorites' ? 'is-active' : ''
                }`}
                onClick={() =>
                  setSelectedType(selectedType === 'favorites' ? 'all' : 'favorites')
                }
              >
                Favorites
              </button>
              <button
                type="button"
                className="schedule-app-bottom-btn schedule-app-bottom-btn--room"
                onClick={() => setIsRoomSheetOpen(true)}
              >
                Change room
              </button>
            </div>
          </div>
        </>
      )}

      <Dialog
        open={!!modalEvent}
        onOpenChange={(open) => {
          if (!open) {
            closeModal();
          }
        }}
      >
        <DialogContent
          showCloseButton={false}
          className="modal-content !top-1/2 !left-1/2 !max-h-[90vh] !w-full !max-w-[860px] !-translate-x-1/2 !-translate-y-1/2 !overflow-y-auto !rounded-[20px] !border !border-[rgba(0,66,88,0.12)] !bg-gradient-to-b !from-white !to-[#f3f7f8] !p-8 !shadow-none"
        >
          <button type="button" className="modal-close" onClick={closeModal}>
            ×
          </button>
          <EventModal
            event={modalEvent}
            favorites={favorites}
            toggleFavorite={toggleFavorite}
            speakerData={speakerData}
            displayRoom={modalEvent ? getEventLocationLabel(modalEvent) : ''}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};
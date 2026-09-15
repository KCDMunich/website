'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { CalendarDays, ChevronRight, MapPin } from 'lucide-react';
import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react';

import { ScheduleCard } from '@/components/schedule/schedule-card';
import { ScheduleFavoriteIcon } from '@/components/schedule/schedule-favorite-icon';
import { ScheduleGridCard } from '@/components/schedule/schedule-grid-card';
import { SchedulePill, ScheduleSegmentGroup } from '@/components/schedule/schedule-pill';
import { Eyebrow } from '@/components/layout/eyebrow';
import type { SitePresentation } from '@/lib/site-presentation';
import { loadScheduleData, primeScheduleData } from '@/lib/schedule-data-cache';
import { getSessionPath } from '@/lib/schedule-session';
import {
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
  isEventLive?: boolean;
  presentation: SitePresentation['program'];
  variant?: 'default' | 'app';
};

export const ScheduleView = ({
  isEventLive = false,
  presentation,
  variant = 'default',
}: ScheduleViewProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isApp = variant === 'app';
  const [speakerData, setSpeakerData] = useState<SessionizeSpeaker[]>([]);
  const [gridData, setGridData] = useState<SessionizeGridDay[]>([]);
  const [events, setEvents] = useState<ScheduleEvent[]>([]);
  const [selectedDay, setSelectedDay] = useState<'monday' | 'tuesday'>('monday');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(() => new Date());
  const [isRoomSheetOpen, setIsRoomSheetOpen] = useState(false);
  const [showLiveOnly, setShowLiveOnly] = useState(false);
  const roomSheetCloseRef = useRef<HTMLButtonElement>(null);
  const roomSheetPanelRef = useRef<HTMLDivElement>(null);
  const roomSheetTriggerRef = useRef<HTMLButtonElement>(null);
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

  const prefetchSession = (event: ScheduleEvent) => {
    router.prefetch(getSessionPath(event, { app: isApp }));
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
        const data = await loadScheduleData();
        setSpeakerData(data.sessionizeSpeakers);
        setEvents(data.events);
        setGridData(data.grid);
        primeScheduleData(data.grid, data.events, data.sessionizeSpeakers, data.fullSpeakers);
        setIsLoading(false);

        if (!data.fullSpeakers?.length) {
          void loadScheduleData({ includeFullSpeakers: true });
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    const eventId = searchParams.get('event');
    if (!eventId || !events.length) return;

    const event = events.find((entry) => String(entry.id) === eventId);
    if (!event) return;

    const href = getSessionPath(event, { app: isApp });
    router.replace(href, { scroll: false });
  }, [events, isApp, router, searchParams]);

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

  useEffect(() => {
    if (!isRoomSheetOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    const roomSheetPanel = roomSheetPanelRef.current;
    const roomSheetTrigger = roomSheetTriggerRef.current;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsRoomSheetOpen(false);
        return;
      }

      if (event.key !== 'Tab' || !roomSheetPanel) return;

      const focusableElements = Array.from(
        roomSheetPanel.querySelectorAll<HTMLElement>('button:not([disabled]), [href]'),
      );
      const firstFocusable = focusableElements[0];
      const lastFocusable = focusableElements.at(-1);

      if (!firstFocusable || !lastFocusable) return;

      if (event.shiftKey && document.activeElement === firstFocusable) {
        event.preventDefault();
        lastFocusable.focus();
      } else if (!event.shiftKey && document.activeElement === lastFocusable) {
        event.preventDefault();
        firstFocusable.focus();
      }
    };

    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyDown);
    roomSheetCloseRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
      roomSheetTrigger?.focus();
    };
  }, [isRoomSheetOpen]);

  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="size-10 animate-spin rounded-full border-4 border-primary/20 border-t-primary" />
      </div>
    );
  }

  const activeSelectedType = selectedType;

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
  const sortedUpcomingEvents = [...upcomingEvents].sort(
    (a, b) => new Date(a.start).getTime() - new Date(b.start).getTime(),
  );
  const eventsByRoomAndStart = groupEventsByRoomAndStart(upcomingEvents);
  const timeSlots = getTimeSlots(upcomingEvents);
  const displayDate = getReadableDate(selectedGridDay?.date);

  const getHeaderLabel = () => {
    if (showLiveOnly) return 'Live Now';
    if (activeSelectedType === 'favorites') return 'Favorites';
    if (activeSelectedType === 'all') return 'All Sessions';
    return getRoomDisplayLabel(activeSelectedType);
  };

  const emptyState = (() => {
    if (activeSelectedType === 'favorites') {
      return {
        title: 'No favorites yet',
        description: 'Tap the heart on a session to build your personal schedule.',
        action: 'Browse all sessions',
      };
    }

    if (showLiveOnly) {
      return {
        title: 'Nothing live right now',
        description: 'Check the full schedule to see what starts next.',
        action: 'View full schedule',
      };
    }

    if (activeSelectedType !== 'all') {
      return {
        title: 'No sessions in this room',
        description: 'Try another room or return to the complete schedule.',
        action: 'View all rooms',
      };
    }

    return {
      title: 'No sessions scheduled',
      description: 'The program for this day will appear here.',
      action: null,
    };
  })();

  const formatTimeSlot = (iso: string) =>
    new Date(iso).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const timetableStyle: CSSProperties | undefined =
    !isApp && !isMobile
      ? ({
          '--schedule-room-count': rooms.length,
          gridTemplateColumns: `5.75rem repeat(${rooms.length}, minmax(13.75rem, 1fr))`,
        } as CSSProperties)
      : undefined;

  return (
    <div className={`schedule-container${isApp ? ' schedule-container--app' : ''}`}>
      {!isApp && (
        <section className="hero-mesh px-4 py-12 text-white sm:px-6 sm:py-14 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <Eyebrow variant="light" className="mb-4">
              {presentation.scheduleEyebrow}
            </Eyebrow>
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl">
                  {presentation.scheduleTitle}
                </h1>
                <p className="mt-3 text-base text-white/75 sm:text-lg">
                  {presentation.scheduleDescription}
                </p>
              </div>
              <Link
                href="/app/schedule"
                className="inline-flex w-fit items-center rounded-full bg-white/10 px-5 py-2.5 text-sm font-semibold text-white ring-1 ring-white/20 transition-colors hover:bg-white/15"
              >
                Open mobile schedule
              </Link>
            </div>
          </div>
        </section>
      )}

      {isApp && (
        <>
          <section className="schedule-app-header">
            <div className="schedule-app-header-inner">
              <div className="schedule-app-heading">
                <div className="schedule-app-title-row">
                  <h1>{getHeaderLabel()}</h1>
                  {isEventLive ? (
                    <button
                      type="button"
                      className={`schedule-app-now ${showLiveOnly ? 'is-active' : ''}`}
                      aria-pressed={showLiveOnly}
                      onClick={() => {
                        setSelectedType('all');
                        setShowLiveOnly((current) => !current);
                      }}
                    >
                      <span className="schedule-app-live-dot" aria-hidden="true"></span>
                      Now
                    </button>
                  ) : null}
                </div>
                <div className="schedule-app-meta-row">
                  <span className="schedule-app-pill">{presentation.scheduleEyebrow}</span>
                  <p>{displayDate}</p>
                </div>
              </div>
            </div>
          </section>
          <div className="schedule-app-day-nav">
            <div className="schedule-app-day-nav__inner">
              <ScheduleSegmentGroup label="Day">
                <SchedulePill
                  variant="segment"
                  active={selectedDay === 'monday'}
                  onClick={() => setSelectedDay('monday')}
                >
                  Monday
                </SchedulePill>
                <SchedulePill
                  variant="segment"
                  active={selectedDay === 'tuesday'}
                  onClick={() => setSelectedDay('tuesday')}
                >
                  Tuesday
                </SchedulePill>
              </ScheduleSegmentGroup>
            </div>
          </div>
        </>
      )}

      <div
        className={`schedule-shell${isApp ? ' schedule-shell--app' : ''}${
          !isApp ? ' px-4 sm:px-6 lg:px-8' : ''
        }`}
      >
        {!isApp && (
          <div className="sticky top-[var(--site-header-height,4.125rem)] z-20 -mx-4 bg-background px-4 pt-3 pb-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
            <div className="mx-auto flex max-w-7xl flex-col gap-3">
              <div className="flex items-center gap-3">
                <span className="hidden w-14 shrink-0 text-xs font-semibold uppercase tracking-wide text-muted-foreground sm:inline">
                  Day
                </span>
                <div className="flex min-w-0 flex-1 flex-wrap items-center gap-3">
                  <ScheduleSegmentGroup label="Day">
                    <SchedulePill
                      variant="segment"
                      active={selectedDay === 'monday'}
                      onClick={() => setSelectedDay('monday')}
                    >
                      Monday
                    </SchedulePill>
                    <SchedulePill
                      variant="segment"
                      active={selectedDay === 'tuesday'}
                      onClick={() => setSelectedDay('tuesday')}
                    >
                      Tuesday
                    </SchedulePill>
                  </ScheduleSegmentGroup>
                  <SchedulePill
                    variant="favorite"
                    active={activeSelectedType === 'favorites'}
                    title="Show favorites only"
                    aria-label="Show favorites only"
                    icon={
                      <ScheduleFavoriteIcon
                        active={activeSelectedType === 'favorites'}
                        tone={activeSelectedType === 'favorites' ? 'inverse' : 'default'}
                        className="size-4"
                      />
                    }
                    onClick={() =>
                      setSelectedType(activeSelectedType === 'favorites' ? 'all' : 'favorites')
                    }
                  >
                    Favorites
                  </SchedulePill>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="hidden w-14 shrink-0 text-xs font-semibold uppercase tracking-wide text-muted-foreground sm:inline">
                  Track
                </span>
                <div
                  className="flex min-w-0 flex-1 gap-2 overflow-x-auto py-1 scrollbar-hidden"
                  role="group"
                  aria-label="Track"
                >
                  <SchedulePill
                    variant="chip"
                    active={selectedType === 'all'}
                    onClick={() => setSelectedType('all')}
                  >
                    All tracks
                  </SchedulePill>
                  {rooms.map((room) => (
                    <SchedulePill
                      key={room}
                      variant="chip"
                      active={selectedType === room}
                      onClick={() => setSelectedType(room)}
                    >
                      {getRoomDisplayDetails(room).title}
                    </SchedulePill>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {isApp || isMobile ? (
          <div className="schedule-grid" aria-live={isApp ? 'polite' : undefined}>
            {isApp
              ? sortedUpcomingEvents.map((event) => {
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
                          onMouseEnter={() => prefetchSession(event)}
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
                              aria-pressed={isFavorite}
                              onClick={() => toggleFavorite(event.id)}
                            >
                              <ScheduleFavoriteIcon active={isFavorite} className="size-4" />
                            </button>
                          </div>
                          <Link
                            href={getSessionPath(event, { app: true })}
                            className="schedule-app-card-link"
                            aria-label={`${event.title}, ${event.time}, ${getEventLocationLabel(event)}`}
                          >
                            <h3 className="schedule-app-title">{event.title}</h3>
                            <div className="schedule-app-meta">
                              <span>{getEventLocationLabel(event)}</span>
                              <ChevronRight aria-hidden="true" />
                            </div>
                            {event.speakers?.length ? (
                              <div className="schedule-app-speakers">
                                {event.speakers.slice(0, 2).map((speaker) => {
                                  const profileImage = speakerProfile(speaker.id);

                                  return (
                                    <div key={speaker.id} className="schedule-app-speaker">
                                      {profileImage ? (
                                        <Image
                                          src={profileImage}
                                          alt=""
                                          width={32}
                                          height={32}
                                          unoptimized
                                        />
                                      ) : null}
                                      <span>{speaker.name}</span>
                                    </div>
                                  );
                                })}
                                {event.speakers.length > 2 ? (
                                  <span className="schedule-app-speaker-more">
                                    +{event.speakers.length - 2}
                                  </span>
                                ) : null}
                              </div>
                            ) : null}
                          </Link>
                          {event.recordingUrl ? (
                            <div className="schedule-app-actions">
                              <a
                                href={event.recordingUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="schedule-app-action"
                              >
                                Watch recording
                              </a>
                            </div>
                          ) : null}
                        </div>
                      </div>
                    );
                  })
              : isMobile
                ? sortedUpcomingEvents.map((event) => {
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
                          href={getSessionPath(event)}
                          onFavoriteClick={() => toggleFavorite(event.id)}
                          onMouseEnter={() => prefetchSession(event)}
                        />
                      );
                  })
                : null}
            {isApp && sortedUpcomingEvents.length === 0 ? (
              <section className="schedule-app-empty" role="status">
                <div className="schedule-app-empty__icon" aria-hidden="true">
                  {activeSelectedType === 'favorites' ? (
                    <ScheduleFavoriteIcon className="size-6" />
                  ) : (
                    <CalendarDays className="size-6" />
                  )}
                </div>
                <h2>{emptyState.title}</h2>
                <p>{emptyState.description}</p>
                {emptyState.action ? (
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedType('all');
                      setShowLiveOnly(false);
                    }}
                  >
                    {emptyState.action}
                  </button>
                ) : null}
              </section>
            ) : null}
          </div>
        ) : (
          <div
            className="schedule-timetable-scroll"
            style={{ '--schedule-room-count': rooms.length } as CSSProperties}
          >
            <div className="schedule-timetable" style={timetableStyle}>
              <div className="schedule-timetable-corner" aria-hidden="true" />
              {rooms.map((room) => {
                const roomDisplay = getRoomDisplayDetails(room);

                return (
                  <div key={`header-${room}`} className="schedule-timetable-header">
                    <h2>{roomDisplay.title}</h2>
                    {roomDisplay.room ? <p>{roomDisplay.room}</p> : null}
                  </div>
                );
              })}
              {timeSlots.flatMap((timeSlot) => {
                const rowEvents = rooms.flatMap(
                  (room) => eventsByRoomAndStart[room]?.[timeSlot] || []
                );
                const rowEndTime = rowEvents[0]?.endTime;

                return [
                  <div key={`time-${timeSlot}`} className="schedule-timetable-time">
                    <span>{formatTimeSlot(timeSlot)}</span>
                    {rowEndTime ? <span>{rowEndTime}</span> : null}
                  </div>,
                  ...rooms.map((room) => {
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
                          const primarySpeaker = event.speakers?.[0];
                          const speakerCompany = primarySpeaker
                            ? findSpeakerCompany(speakerData, primarySpeaker.id)
                            : '';

                          return (
                            <ScheduleGridCard
                              key={event.id}
                              startTime={event.time}
                              endTime={event.endTime}
                              title={event.title}
                              speakers={event.speakers?.map((speaker) => ({
                                name: speaker.name,
                                avatar: findSpeakerProfile(speakerData, speaker.id),
                              }))}
                              speakerCompany={speakerCompany}
                              type={event.type}
                              duration={event.duration}
                              isFavorite={isFavorite}
                              isLive={isLiveEvent}
                              isPast={new Date(event.end) < new Date()}
                              isService={event.isServiceSession}
                              href={getSessionPath(event)}
                              onFavoriteClick={() => toggleFavorite(event.id)}
                              onMouseEnter={() => prefetchSession(event)}
                            />
                          );
                        })}
                      </div>
                    );
                  }),
                ];
              })}
            </div>
          </div>
        )}
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
            <div
              id="schedule-room-filter"
              ref={roomSheetPanelRef}
              className="schedule-app-room-sheet__panel"
              aria-labelledby="schedule-room-filter-title"
            >
              <div className="schedule-app-room-sheet__header">
                <p id="schedule-room-filter-title">Rooms</p>
                <button
                  ref={roomSheetCloseRef}
                  type="button"
                  onClick={() => setIsRoomSheetOpen(false)}
                  aria-label="Close room filter"
                >
                  Close
                </button>
              </div>
              <div className="schedule-app-room-sheet__list" role="group" aria-label="Room">
                <button
                  type="button"
                  className={selectedType === 'all' && !showLiveOnly ? 'is-active' : ''}
                  aria-pressed={selectedType === 'all' && !showLiveOnly}
                  onClick={() => {
                    setSelectedType('all');
                    setShowLiveOnly(false);
                    setIsRoomSheetOpen(false);
                  }}
                >
                  All rooms
                </button>
                {rooms.map((room) => (
                  <button
                    key={room}
                    type="button"
                    className={selectedType === room ? 'is-active' : ''}
                    aria-pressed={selectedType === room}
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
                className={`schedule-app-bottom-btn ${
                  selectedType === 'all' ? 'is-active' : ''
                }`}
                aria-pressed={selectedType === 'all'}
                onClick={() => {
                  setSelectedType('all');
                  setShowLiveOnly(false);
                }}
              >
                <CalendarDays aria-hidden="true" />
                Schedule
              </button>
              <button
                type="button"
                className={`schedule-app-bottom-btn ${
                  selectedType === 'favorites' ? 'is-active' : ''
                }`}
                aria-pressed={selectedType === 'favorites'}
                onClick={() => setSelectedType(selectedType === 'favorites' ? 'all' : 'favorites')}
              >
                <ScheduleFavoriteIcon
                  active={selectedType === 'favorites'}
                  tone={selectedType === 'favorites' ? 'inverse' : 'default'}
                  className="size-5"
                />
                My plan
              </button>
              <button
                ref={roomSheetTriggerRef}
                type="button"
                className={`schedule-app-bottom-btn ${
                  selectedType !== 'all' && selectedType !== 'favorites' ? 'is-active' : ''
                }`}
                aria-expanded={isRoomSheetOpen}
                aria-controls="schedule-room-filter"
                onClick={() => setIsRoomSheetOpen(true)}
              >
                <MapPin aria-hidden="true" />
                Rooms
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

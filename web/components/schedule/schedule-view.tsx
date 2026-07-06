'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState, type CSSProperties } from 'react';

import { ScheduleCard } from '@/components/schedule/schedule-card';
import { ScheduleFavoriteIcon } from '@/components/schedule/schedule-favorite-icon';
import { ScheduleGridCard } from '@/components/schedule/schedule-grid-card';
import { SchedulePill, ScheduleSegmentGroup } from '@/components/schedule/schedule-pill';
import { Eyebrow } from '@/components/layout/eyebrow';
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
  variant?: 'default' | 'app';
};

export const ScheduleView = ({ variant = 'default' }: ScheduleViewProps) => {
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

  const openSession = (event: ScheduleEvent) => {
    const href = getSessionPath(event, { app: isApp });
    router.prefetch(href);
    router.push(href, { scroll: false });
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
        primeScheduleData(
          data.grid,
          data.events,
          data.sessionizeSpeakers,
          data.fullSpeakers,
        );
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
  const eventsByRoomAndStart = groupEventsByRoomAndStart(upcomingEvents);
  const timeSlots = getTimeSlots(upcomingEvents);
  const displayDate = getReadableDate(selectedGridDay?.date);

  const getHeaderLabel = () => {
    if (showLiveOnly) return 'Live Now';
    if (activeSelectedType === 'favorites') return 'Favorites';
    if (activeSelectedType === 'all') return 'All Sessions';
    return getRoomDisplayLabel(activeSelectedType);
  };

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
              Schedule
            </Eyebrow>
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl">
                  Explore the program
                </h1>
                <p className="mt-3 text-base text-white/75 sm:text-lg">
                  Browse talks and workshops, save favorites, and open the mobile
                  app for live sessions on the go.
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

      <div
        className={`schedule-shell${isApp ? ' schedule-shell--app' : ''}${
          !isApp ? ' px-4 sm:px-6 lg:px-8' : ''
        }`}
      >
        {!isApp && (
          <div className="sticky top-[4.25rem] z-20 -mx-4 border-b border-border/60 bg-background/95 px-4 py-4 backdrop-blur-xl sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
            <div className="mx-auto flex max-w-7xl flex-col gap-3">
              <div className="flex flex-wrap items-center gap-3">
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
                      tone={
                        activeSelectedType === 'favorites' ? 'inverse' : 'default'
                      }
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
              <div className="flex items-center gap-2">
                <span className="hidden shrink-0 self-center text-xs font-semibold uppercase tracking-wide text-muted-foreground sm:inline">
                  Track
                </span>
                <div className="flex min-w-0 flex-1 gap-2 overflow-x-auto px-0.5 py-1 scrollbar-hidden">
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
          <div className="schedule-grid">
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
                        onClick={() => openSession(event)}
                        onMouseEnter={() => prefetchSession(event)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            openSession(event);
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
                            <ScheduleFavoriteIcon active={isFavorite} className="size-4" />
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
                              openSession(event);
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
                        onClick={() => openSession(event)}
                        onMouseEnter={() => prefetchSession(event)}
                      />
                    );
                  })
              : null}
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
                  (room) => eventsByRoomAndStart[room]?.[timeSlot] || [],
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
                              onFavoriteClick={() => toggleFavorite(event.id)}
                              onClick={() => openSession(event)}
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
                <ScheduleFavoriteIcon
                  active={selectedType === 'favorites'}
                  tone={selectedType === 'favorites' ? 'inverse' : 'default'}
                  className="size-4"
                />
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

    </div>
  );
};
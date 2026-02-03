import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

import './schedule.css';
import './schedule-app.css';
import ScheduleCard from './ScheduleCard';

const scriptUrl = 'https://sessionize.com/api/v2/px1o0jp3/view/GridSmart';
const speakerURL = 'https://sessionize.com/api/v2/px1o0jp3/view/Speakers';

const sponsorSessionIds = [
  '954600',
  '948247',
  '935770',
  '935766',
  '973494',
  '973258',
  '972819',
  '971893',
  '969373',
  '954600',
  '948247',
  '935770',
  '935766',
];

const workshopSessionIds = ['835091', '857417', '858404', '862527', '881898', '898401'];

const getRecordingMeta = (url) => {
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
  } catch (error) {
    return { url, thumbnail: null };
  }
};

const Schedule = ({ variant = 'default' }) => {
  const [speakerData, setSpeakerData] = useState([]);
  const [gridData, setGridData] = useState([]); // Raw grid data
  const [events, setEvents] = useState([]); // Flat list of events
  const [rooms, setRooms] = useState([]); // List of rooms for selected day
  const [selectedDay, setSelectedDay] = useState('monday');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isRoomSheetOpen, setIsRoomSheetOpen] = useState(false);
  const [showLiveOnly, setShowLiveOnly] = useState(false);
  const [favorites, setFavorites] = useState(() => {
    try {
      const stored = localStorage.getItem('favorites');
      return stored ? JSON.parse(stored).map(String) : [];
    } catch {
      return [];
    }
  });

  const [sessionFilters] = useState({
    showServiceSessions: true,
  });

  const [isMobile, setIsMobile] = useState(false);

  // Helper: Get date for selectedDay
  const getDateForSelectedDay = () => {
    if (!gridData.length) return null;
    if (selectedDay === 'monday') return gridData[0];
    if (selectedDay === 'tuesday') return gridData[1];
    return null;
  };


  const getReadableDate = (dateValue) => {
    if (!dateValue) return '';
    return new Date(dateValue).toLocaleDateString(undefined, {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
    });
  };

  // Helper: Convert sessions to flat events
  const convertSessionsToEvents = (data, filters) => {
    const events = [];
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
          const baseEvent = {
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
            room: room.name,
            originalRoom: room.name,
            type: determineEventType(room.name, session),
            speakers: session.speakers,
            start: session.startsAt,
            end: session.endsAt,
            isServiceSession: session.isServiceSession || false,
            recordingUrl: recordingMeta.url,
            recordingThumbnail: recordingMeta.thumbnail,
          };

          // Keep sessions in their original room
          return [baseEvent];
        });
        events.push(...roomEvents.flat());
      });
    });
    return events.sort((a, b) => new Date(a.start) - new Date(b.start));
  };

  const calculateDuration = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const duration = (endDate - startDate) / 1000 / 60;
    return Math.round(duration);
  };

  const determineEventType = (room, session) => {
    if (session && session.isServiceSession) return 'service';
    if (sponsorSessionIds.includes(String(session.id))) return 'sponsor';
    if (workshopSessionIds.includes(String(session.id))) return 'workshop';
    if (room.toLowerCase().includes('workshop')) return 'workshop';
    if (room.toLowerCase().includes('sponsor')) return 'sponsor';
    return 'talk';
  };

  const groupEventsByRoom = (events) => {
    return events.reduce((acc, event) => {
      if (!acc[event.room]) {
        acc[event.room] = [];
      }
      acc[event.room].push(event);
      return acc;
    }, {});
  };

  const findSpeakerProfile = (speakerId) => {
    const speaker = speakerData.find((s) => s.id === speakerId);
    return speaker ? speaker.profilePicture : null;
  };

  const filterEventsByDay = (events) => {
    const gridDay = getDateForSelectedDay();
    if (!gridDay) return [];
    const gridDate = new Date(gridDay.date).getDate();
    return events.filter((event) => {
      const eventDate = new Date(event.start).getDate();
      return eventDate === gridDate;
    });
  };

  const getRoomsForSelectedDay = () => {
    const gridDay = getDateForSelectedDay();
    if (!gridDay) return [];
    return gridDay.rooms.map((room) => room.name);
  };

  const isLive = (start, end) => {
    const startTime = new Date(start);
    const endTime = new Date(end);
    return currentTime >= startTime && currentTime <= endTime;
  };

  const toggleFavorite = (eventId) => {
    const idStr = String(eventId);
    setFavorites((prev) => {
      if (prev.includes(idStr)) {
        return prev.filter((id) => id !== idStr);
      } else {
        return [...prev, idStr];
      }
    });
  };

  const Modal = ({
    isOpen,
    event,
    favorites,
    toggleFavorite,
    findSpeakerProfile,
    onClose,
    displayRoom,
  }) => {
    if (!isOpen || !event) return null;

    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <button className="modal-close" onClick={onClose}>
            ×
          </button>

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
                    {event.type.charAt(0).toUpperCase() + event.type.slice(1)} Session
                  </p>
                </div>

                <div className="speakers-section">
                  <h3>Speakers</h3>
                  {event.speakers?.map((speaker) => {
                    const speakerProfile = findSpeakerProfile(speaker.id);
                    return (
                      <div key={speaker.id} className="speaker-detail">
                        {speakerProfile && (
                          <img
                            src={speakerProfile}
                            alt={speaker.name}
                            className="speaker-avatar-large"
                          />
                        )}
                        <div>
                          <h4>{speaker.name}</h4>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <button
              type="button"
              className={`modal-favorite-button ${
                favorites.includes(String(event.id)) ? 'favorited' : ''
              }`}
              aria-label={
                favorites.includes(String(event.id)) ? 'Remove from favorites' : 'Add to favorites'
              }
              title={
                favorites.includes(String(event.id)) ? 'Remove from favorites' : 'Add to favorites'
              }
              onClick={() => toggleFavorite(event.id)}
            >
              <svg
                className="schedule-card-favorite-icon"
                viewBox="0 0 24 24"
                fill={favorites.includes(String(event.id)) ? 'currentColor' : 'none'}
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
                onClick={async () => {
                  const shareUrl = `${window.location.origin}/schedule?event=${event.id}`;
                  if (navigator.share) {
                    try {
                      await navigator.share({
                        title: event.title,
                        url: shareUrl,
                      });
                    } catch (e) {
                      // User cancelled share
                    }
                  } else if (navigator.clipboard) {
                    await navigator.clipboard.writeText(shareUrl);
                    alert('Link copied!');
                  } else {
                    window.prompt('Copy this link:', shareUrl);
                  }
                }}
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
                onClick={async () => {
                  const shareUrl = `${window.location.origin}/schedule?event=${event.id}`;
                  if (navigator.clipboard) {
                    await navigator.clipboard.writeText(shareUrl);
                    alert('Link copied!');
                  } else {
                    window.prompt('Copy this link:', shareUrl);
                  }
                }}
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
        </div>
      </div>
    );
  };

  Modal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    event: PropTypes.object,
    favorites: PropTypes.arrayOf(PropTypes.string).isRequired,
    toggleFavorite: PropTypes.func.isRequired,
    findSpeakerProfile: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    displayRoom: PropTypes.string.isRequired,
  };

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [speakersResponse, eventsResponse] = await Promise.all([
          fetch(speakerURL),
          fetch(scriptUrl),
        ]);

        const speakersData = await speakersResponse.json();
        const eventsData = await eventsResponse.json();

        setSpeakerData(speakersData);
        setGridData(eventsData); // Save raw grid data
        setEvents(convertSessionsToEvents(eventsData, sessionFilters));
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };

    fetchData();
    // eslint-disable-next-line
  }, []);

  // Recalculate events whenever filters change
  useEffect(() => {
    if (gridData.length) {
      setEvents(convertSessionsToEvents(gridData, sessionFilters));
    }
    // eslint-disable-next-line
  }, [sessionFilters, gridData]);

  // Update rooms when selectedDay or gridData changes
  useEffect(() => {
    setRooms(getRoomsForSelectedDay());
    // eslint-disable-next-line
  }, [selectedDay, gridData]);

  // Update current time every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  // Save favorites to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('favorites', JSON.stringify(favorites.map(String)));
    } catch {}
  }, [favorites]);

  // Removed: type-specific useEffect no longer needed

  // Automatically open modal when a deep link is provided
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const eventId = params.get('event');
    if (eventId && events.length > 0) {
      const found = events.find((e) => String(e.id) === String(eventId));
      if (found) {
        setSelectedEvent(found);
      }
    }
    // eslint-disable-next-line
  }, [events]);

  // Mapping used to display room headers
  const roomHeaderLabels = {
    Main: 'Main Stage - Wien/Versailles',
    Side: 'Side Stage - Italien',
    Workshops: 'Workshop - Danzig',
    'Main Stage': 'Main Stage - Wien/Versailles',
    'Side Stage': 'Side Stage - Italien',
  };

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
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  const isApp = variant === 'app';

  // Filter events for selected day and type
  let filteredEvents = filterEventsByDay(events);
  if (selectedType === 'favorites') {
    filteredEvents = filteredEvents.filter((event) => favorites.includes(String(event.id)));
  } else if (selectedType === 'all') {
    // no additional filtering needed
  } else {
    filteredEvents = filteredEvents.filter((event) => event.room === selectedType);
  }
  if (isApp && showLiveOnly) {
    filteredEvents = filteredEvents.filter((event) => isLive(event.start, event.end));
  }

  // Show all sessions of the day, including past ones
  const upcomingEvents = filteredEvents;

  const eventsByRoom = groupEventsByRoom(upcomingEvents);
  const selectedGridDay = getDateForSelectedDay();
  const displayDate = getReadableDate(selectedGridDay?.date);
  const favoriteCount = upcomingEvents.filter((event) => favorites.includes(String(event.id)))
    .length;

  const getHeaderLabel = () => {
    if (showLiveOnly) return 'Live Now';
    if (selectedType === 'favorites') return 'Favorites';
    if (selectedType === 'all') return 'All Sessions';
    return roomHeaderLabels[selectedType] || selectedType;
  };


  return (
    <div className={`schedule-container${isApp ? ' schedule-container--app' : ''}`}>
      {!isApp && (
        <div className="schedule-app-cta">
          <div className="schedule-app-cta-content">
            <div>
              <p className="schedule-app-cta-title">Open the schedule app</p>
              <p className="schedule-app-cta-subtitle">Mobile-focused view with sticky filters.</p>
            </div>
            <a className="schedule-app-cta-button" href="/app/schedule">
              Open app
            </a>
          </div>
        </div>
      )}

      {!isApp && (
        <section className="schedule-hero">
          <div className="schedule-hero-content">
            <div className="schedule-hero-text">
              <span className="schedule-hero-eyebrow">Schedule</span>
              <h1 className="schedule-hero-title">Plan your conference days</h1>
              <p className="schedule-hero-subtitle">
                Browse talks, workshops, and service sessions. Filter by room and keep the sessions
                you care about in one place.
              </p>
              <div className="schedule-hero-tags">
                <span>Talks</span>
                <span>Workshops</span>
                <span>Service Sessions</span>
                <span>Recordings</span>
              </div>
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
            <div className="schedule-app-desktop-hint">
              Best on mobile. Resize to under 900px for the full app view.
            </div>
          </div>
        </section>
      )}

      <div className={`schedule-shell${isApp ? ' schedule-shell--app' : ''}`}>
        {/* --- Header: day tabs and filters --- */}
        {!isApp && (
        <div className="schedule-header-row">
          <div className="schedule-day-tabs">
            <button
              className={`schedule-day-btn ${selectedDay === 'monday' ? 'active' : ''}`}
              onClick={() => setSelectedDay('monday')}
            >
              Monday
            </button>
            <button
              className={`schedule-day-btn ${selectedDay === 'tuesday' ? 'active' : ''}`}
              onClick={() => setSelectedDay('tuesday')}
            >
              Tuesday
            </button>
            {/* Favorites button with heart icon */}
            <button
              className={`schedule-favorite-tab-btn ${
                selectedType === 'favorites' ? 'active' : ''
              }`}
              title="Show favorites only"
              aria-label="Show favorites only"
              onClick={() => setSelectedType(selectedType === 'favorites' ? 'all' : 'favorites')}
            >
              <svg
                className="schedule-card-favorite-icon"
                viewBox="0 0 24 24"
                width="20"
                height="20"
                fill={selectedType === 'favorites' ? 'currentColor' : 'none'}
                stroke="currentColor"
                strokeWidth="2"
                style={{ marginRight: 6 }}
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              Favorites
            </button>
          </div>
          <div className="schedule-filter-pills">
            <button
              className={`schedule-filter-pill ${selectedType === 'all' ? 'active' : ''}`}
              onClick={() => setSelectedType('all')}
            >
              All rooms
            </button>
            {rooms.map((room) => (
              <button
                key={room}
                className={`schedule-filter-pill ${selectedType === room ? 'active' : ''}`}
                onClick={() => setSelectedType(room)}
              >
                {roomHeaderLabels[room] || room}
              </button>
            ))}
            <div className="filter-divider"></div>
          </div>
        </div>
        )}

        <div className="schedule-grid">
          {isApp
            ? upcomingEvents
                .sort((a, b) => new Date(a.start) - new Date(b.start))
                .map((event) => {
                  const isFavorite = favorites.includes(String(event.id));
                  const isLiveEvent = isLive(event.start, event.end);
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
                            {event.type}
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
                            aria-label={
                              isFavorite ? 'Remove from favorites' : 'Add to favorites'
                            }
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
                          <span>{roomHeaderLabels[event.room] || event.room}</span>
                          <span>
                            {event.time} – {event.endTime}
                          </span>
                        </div>
                        <div className="schedule-app-speakers">
                          {event.speakers?.slice(0, 3).map((speaker) => (
                            <div key={speaker.id} className="schedule-app-speaker">
                              {findSpeakerProfile(speaker.id) && (
                                <img
                                  src={findSpeakerProfile(speaker.id)}
                                  alt={speaker.name}
                                />
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
                                window.open(event.recordingUrl, '_blank', 'noopener,noreferrer');
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
              ? // Mobile: Flat list sorted by time
                upcomingEvents
                  .sort((a, b) => new Date(a.start) - new Date(b.start))
                  .map((event) => {
                    const isFavorite = favorites.includes(String(event.id));
                    const isLiveEvent = isLive(event.start, event.end);
                    return (
                      <ScheduleCard
                        key={event.id}
                        startTime={event.time}
                        endTime={event.endTime}
                        duration={`${event.duration} min`}
                        title={event.title}
                        speakers={event.speakers?.map((speaker) => ({
                          name: speaker.name,
                          avatar: findSpeakerProfile(speaker.id),
                        }))}
                        location={roomHeaderLabels[event.room] || event.room}
                        originalRoom={event.originalRoom}
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
              : // Desktop: Grouped by room
                rooms.map((room) => (
                  <div key={room} className="room-section">
                    <div className="room-header">
                      <h2>{roomHeaderLabels[room] || room}</h2>
                    </div>
                    {(eventsByRoom[room] || []).map((event) => {
                      const isFavorite = favorites.includes(String(event.id));
                      const isLiveEvent = isLive(event.start, event.end);

                      return (
                        <ScheduleCard
                          key={event.id}
                          startTime={event.time}
                          endTime={event.endTime}
                          duration={`${event.duration} min`}
                          title={event.title}
                          speakers={event.speakers?.map((speaker) => ({
                            name: speaker.name,
                            avatar: findSpeakerProfile(speaker.id),
                          }))}
                          location={roomHeaderLabels[event.room] || event.room}
                          originalRoom={event.originalRoom}
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
                ))}
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
                  className={`schedule-app-room-sheet__live ${
                    showLiveOnly ? 'is-active' : ''
                  }`}
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
                    {roomHeaderLabels[room] || room}
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
                  selectedDay === 'monday' ? 'is-active' : ''
                }`}
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
                onClick={() => setSelectedType(selectedType === 'favorites' ? 'all' : 'favorites')}
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

      <Modal
        isOpen={!!selectedEvent}
        event={selectedEvent}
        favorites={favorites}
        toggleFavorite={toggleFavorite}
        findSpeakerProfile={findSpeakerProfile}
        displayRoom={
          selectedEvent ? roomHeaderLabels[selectedEvent.room] || selectedEvent.room : ''
        }
        onClose={() => setSelectedEvent(null)}
      />
    </div>
  );
};

export default Schedule;

Schedule.propTypes = {
  variant: PropTypes.oneOf(['default', 'app']),
};

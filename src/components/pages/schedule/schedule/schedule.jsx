import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

import './schedule.css';
import ScheduleCard from './ScheduleCard';

const scriptUrl = 'https://sessionize.com/api/v2/px1o0jp3/view/GridSmart';
const speakerURL = 'https://sessionize.com/api/v2/px1o0jp3/view/Speakers';

const typeLabels = {
  talk: 'Talks',
  workshop: 'Workshops',
  sponsor: 'Sponsor Talks',
  service: 'Service Sessions',
};

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

const Schedule = () => {
  const [speakerData, setSpeakerData] = useState([]);
  const [gridData, setGridData] = useState([]); // Raw grid data
  const [events, setEvents] = useState([]); // Flat list of events
  const [rooms, setRooms] = useState([]); // List of rooms for selected day
  const [selectedDay, setSelectedDay] = useState('monday');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [favorites, setFavorites] = useState(() => {
    try {
      const stored = localStorage.getItem('favorites');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [sessionFilters] = useState({
    showServiceSessions: true,
  });

  const [sessionTypes, setSessionTypes] = useState([]);

  // Helper: Get date for selectedDay
  const getDateForSelectedDay = () => {
    if (!gridData.length) return null;
    if (selectedDay === 'monday') return gridData[0];
    if (selectedDay === 'tuesday') return gridData[1];
    return null;
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
          };

          // Alle Sessions bleiben in ihrem ursprünglichen Raum
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

  const filterEvents = (events) => {
    if (selectedType === 'all') return events;
    if (selectedType === 'favorites') {
      return events.filter((event) => favorites.includes(event.id));
    }
    return events.filter((event) => event.type === selectedType);
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
    setFavorites((prev) => {
      if (prev.includes(eventId)) {
        return prev.filter((id) => id !== eventId);
      } else {
        return [...prev, eventId];
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
              className={`modal-favorite-button ${favorites.includes(event.id) ? 'favorited' : ''}`}
              aria-label={
                favorites.includes(event.id) ? 'Remove from favorites' : 'Add to favorites'
              }
              title={favorites.includes(event.id) ? 'Remove from favorites' : 'Add to favorites'}
              onClick={() => toggleFavorite(event.id)}
            >
              <svg
                className="schedule-card-favorite-icon"
                viewBox="0 0 24 24"
                fill={favorites.includes(event.id) ? 'currentColor' : 'none'}
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </button>

            {/* Share Button */}
            <button
              title="Session-Link teilen oder kopieren"
              style={{ marginLeft: 12, display: 'inline-flex', alignItems: 'center', gap: 6 }}
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
                  alert('Link kopiert!');
                } else {
                  window.prompt('Kopiere diesen Link:', shareUrl);
                }
              }}
            >
              {/* Share Icon */}
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ marginRight: 4 }}
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

            {/* Kopieren-Button */}
            <button
              title="Session-Link kopieren"
              style={{ marginLeft: 12, display: 'inline-flex', alignItems: 'center', gap: 6 }}
              onClick={async () => {
                const shareUrl = `${window.location.origin}/schedule?event=${event.id}`;
                if (navigator.clipboard) {
                  await navigator.clipboard.writeText(shareUrl);
                  alert('Link kopiert!');
                } else {
                  window.prompt('Kopiere diesen Link:', shareUrl);
                }
              }}
            >
              {/* Copy Icon */}
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ marginRight: 4 }}
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

  // NEU: Events neu berechnen, wenn Filter geändert werden
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
      localStorage.setItem('favorites', JSON.stringify(favorites));
    } catch {}
  }, [favorites]);

  // Dynamisch Session-Typen aus Events extrahieren
  useEffect(() => {
    const types = Array.from(new Set(events.map((event) => event.type)));
    setSessionTypes(types);
  }, [events]);

  // Automatisches Öffnen des Modals bei Deep Link
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

  // Mapping für die Anzeige der Raum-Header
  const roomHeaderLabels = {
    Main: 'Main Stage - Wien/Versailles',
    Side: 'Side Stage - Italien',
    Workshops: 'Workshop - Danzig',
    'Main Stage': 'Main Stage - Wien/Versailles',
    'Side Stage': 'Side Stage - Italien',
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  // Filter events for selected day and type
  const filteredEvents = filterEvents(filterEventsByDay(events));

  // NEU: Vergangene Events ausblenden
  const now = new Date();
  const upcomingEvents = filteredEvents.filter((event) => new Date(event.end) > now);

  const eventsByRoom = groupEventsByRoom(upcomingEvents);

  return (
    <div className="schedule-container">
      {/* --- Header: Tage nebeneinander, Filter daneben --- */}
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
        </div>
        <div className="schedule-filter-pills">
          <button
            className={`schedule-filter-pill ${selectedType === 'all' ? 'active' : ''}`}
            onClick={() => setSelectedType('all')}
          >
            All Sessions
          </button>
          {sessionTypes.map((type) => (
            <button
              key={type}
              className={`schedule-filter-pill ${selectedType === type ? 'active' : ''}`}
              onClick={() => setSelectedType(type)}
            >
              {typeLabels[type] || type.charAt(0).toUpperCase() + type.slice(1) + 's'}
            </button>
          ))}
          <div className="filter-divider"></div>
          <button
            className={`schedule-filter-pill ${selectedType === 'favorites' ? 'active' : ''}`}
            onClick={() => setSelectedType('favorites')}
          >
            Favorites
          </button>
        </div>
      </div>

      <div className="schedule-grid">
        {rooms.map((room) => (
          <div key={room} className="room-section">
            <div className="room-header">
              <h2>{roomHeaderLabels[room] || room}</h2>
            </div>
            {(eventsByRoom[room] || []).map((event) => {
              const isFavorite = favorites.includes(event.id);
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
                  onFavoriteClick={() => toggleFavorite(event.id)}
                  onClick={() => setSelectedEvent(event)}
                />
              );
            })}
          </div>
        ))}
      </div>

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

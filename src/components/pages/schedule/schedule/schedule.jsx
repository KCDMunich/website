import React, { useState, useEffect } from 'react';
import './schedule.css';

const scriptUrl = 'https://sessionize.com/api/v2/6dqtqpt2/view/GridSmart';
const speakerURL = 'https://sessionize.com/api/v2/6dqtqpt2/view/Speakers';

const Schedule = () => {
  const [speakerData, setSpeakerData] = useState([]);
  const [events, setEvents] = useState([]);
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
        setEvents(convertSessionsToEvents(eventsData));
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('favorites', JSON.stringify(favorites));
    } catch {}
  }, [favorites]);

  const convertSessionsToEvents = (data) => {
    const events = [];
    data.forEach((day) => {
      day.rooms.forEach((room) => {
        const roomEvents = room.sessions.map((session) => ({
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
          room: session.room,
          type: determineEventType(session.room),
          speakers: session.speakers,
          start: session.startsAt,
          end: session.endsAt,
        }));
        events.push(...roomEvents);
      });
    });
    return events;
  };

  const calculateDuration = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const duration = (endDate - startDate) / 1000 / 60;
    return Math.round(duration);
  };

  const determineEventType = (room) => {
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

  const filterEventsByDay = (events, day) => {
    return events.filter((event) => {
      const eventDate = new Date(event.start);
      if (day === 'monday') return eventDate.getDate() === 1;
      return eventDate.getDate() === 2;
    });
  };

  const isLive = (start, end) => {
    const startTime = new Date(start);
    const endTime = new Date(end);
    return true; // Demo: immer true, sonst: currentTime >= startTime && currentTime <= endTime;
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

  const TimeProgress = ({ startTime, endTime }) => {
    const [progress, setProgress] = useState(100);

    useEffect(() => {
      const calculateProgress = () => {
        const start = new Date(startTime);
        const end = new Date(endTime);

        if (currentTime < start) return 100;
        if (currentTime > end) return 50;

        const total = end.getTime() - start.getTime();
        const elapsed = end.getTime() - currentTime.getTime();
        return (elapsed / total) * 100;
      };

      const timer = setInterval(() => {
        setProgress(calculateProgress());
      }, 1000);

      return () => clearInterval(timer);
    }, [startTime, endTime, currentTime]);

    return (
      <div className="relative h-8 w-8">
        <svg className="h-8 w-8">
          <defs>
            <linearGradient id="greenGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4ade80" />
              <stop offset="100%" stopColor="#22c55e" />
            </linearGradient>
          </defs>
          <circle cx="16" cy="16" r="15" fill="none" stroke="#e2e8f0" strokeWidth="2" />
          <circle
            cx="16"
            cy="16"
            r="15"
            fill="none"
            stroke="url(#greenGradient)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 15}`}
            strokeDashoffset={`${2 * Math.PI * 15 * (1 - progress / 100)}`}
            className="transition-all duration-200 ease-in-out"
            transform="rotate(-90 16 16)"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-2 w-2 animate-pulse rounded-full bg-green-500"></div>
        </div>
      </div>
    );
  };

  const Modal = ({ isOpen, onClose, event, favorites, toggleFavorite, findSpeakerProfile }) => {
    if (!isOpen || !event) return null;

    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <button className="modal-close" onClick={onClose}>
            ×
          </button>

          <div className="event-modal">
            <h2>{event.title}</h2>
            <p className="confirmed-session-label">
              <strong>Confirmed Session</strong>
            </p>

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
                    {event.room}
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

            <div className="categories">
              <strong>Categories</strong>
              <br />
              <span>30min Presentation</span>
            </div>

            <button
              className={`favorite-button modal-favorite-button ${
                favorites.includes(event.id) ? 'favorited' : ''
              }`}
              onClick={() => toggleFavorite(event.id)}
              aria-label={
                favorites.includes(event.id) ? 'Remove from favorites' : 'Add to favorites'
              }
              title={favorites.includes(event.id) ? 'Remove from favorites' : 'Add to favorites'}
            >
              {favorites.includes(event.id) ? '❤️' : '🤍'}
            </button>
          </div>
        </div>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="schedule-container">
      <div className="tab-buttons">
        <button
          className={`tab-button ${selectedDay === 'monday' ? 'active' : ''}`}
          onClick={() => setSelectedDay('monday')}
        >
          Monday
        </button>
        <button
          className={`tab-button ${selectedDay === 'tuesday' ? 'active' : ''}`}
          onClick={() => setSelectedDay('tuesday')}
        >
          Tuesday
        </button>
      </div>

      <div className="filter-buttons">
        <button
          className={`filter-button ${selectedType === 'all' ? 'active' : ''}`}
          onClick={() => setSelectedType('all')}
        >
          All Sessions
        </button>
        <button
          className={`filter-button ${selectedType === 'talk' ? 'active' : ''}`}
          onClick={() => setSelectedType('talk')}
        >
          Talks
        </button>
        <button
          className={`filter-button ${selectedType === 'workshop' ? 'active' : ''}`}
          onClick={() => setSelectedType('workshop')}
        >
          Workshops
        </button>
        <button
          className={`filter-button ${selectedType === 'sponsor' ? 'active' : ''}`}
          onClick={() => setSelectedType('sponsor')}
        >
          Sponsor Talks
        </button>
        <button
          className={`filter-button ${selectedType === 'favorites' ? 'active' : ''}`}
          onClick={() => setSelectedType('favorites')}
        >
          Favorites
        </button>
      </div>

      <div className="schedule-grid">
        {Object.entries(
          groupEventsByRoom(filterEvents(filterEventsByDay(events, selectedDay)))
        ).map(([room, events]) => (
          <div key={room} className="room-section">
            <div className="room-header">
              <h2>{room}</h2>
            </div>
            {events.map((event) => {
              const isFavorite = favorites.includes(event.id);
              return (
                <div
                  key={event.id}
                  className={`event-card ${isLive(event.start, event.end) ? 'live' : ''}`}
                  onClick={() => setSelectedEvent(event)}
                >
                  <div className="event-header">
                    <div className="event-time">
                      <span>
                        {event.time} - {event.endTime}
                      </span>
                      {isLive(event.start, event.end) && (
                        <TimeProgress startTime={event.start} endTime={event.end} />
                      )}
                      <span className="duration-badge">{event.duration} min</span>
                    </div>
                    <span className="event-type">{event.type}</span>
                    <button
                      className={`favorite-button ${isFavorite ? 'favorited' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(event.id);
                      }}
                      aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                      title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                    >
                      {isFavorite ? '❤️' : '🤍'}
                    </button>
                  </div>
                  <h3 className="event-title">{event.title}</h3>
                  <div className="speakers-avatars">
                    {event.speakers?.map((speaker, index) => (
                      <img
                        key={speaker.id}
                        src={findSpeakerProfile(speaker.id)}
                        alt={speaker.name}
                        className="speaker-avatar-overlap"
                        style={{ zIndex: event.speakers.length - index }}
                      />
                    ))}
                    <span className="speakers-names">
                      {event.speakers?.map((s) => s.name).join(', ')}
                    </span>
                  </div>
                  <div className="event-room">
                    <span>{event.room}</span>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <Modal
        isOpen={!!selectedEvent}
        onClose={() => setSelectedEvent(null)}
        event={selectedEvent}
        favorites={favorites}
        toggleFavorite={toggleFavorite}
        findSpeakerProfile={findSpeakerProfile}
      />
    </div>
  );
};

export default Schedule;

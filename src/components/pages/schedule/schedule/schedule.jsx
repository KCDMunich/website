import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import './schedule.css';
import ScheduleCard from './ScheduleCard';

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
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
    //currentTime >= startTime && currentTime <= endTime;
    return true;
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

  const calculateRemainingMinutes = (endTime) => {
    const end = new Date(endTime);
    const now = new Date();
    const diff = end - now;
    return Math.max(0, Math.ceil(diff / (1000 * 60)));
  };

  const Modal = ({ isOpen, event, favorites, toggleFavorite, findSpeakerProfile, onClose }) => {
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
              className={`modal-favorite-button ${favorites.includes(event.id) ? 'favorited' : ''}`}
              aria-label={favorites.includes(event.id) ? 'Remove from favorites' : 'Add to favorites'}
              title={favorites.includes(event.id) ? 'Remove from favorites' : 'Add to favorites'}
              onClick={() => toggleFavorite(event.id)}
            >
              <svg 
                className="schedule-card-favorite-icon" 
                viewBox="0 0 24 24" 
                fill={favorites.includes(event.id) ? "currentColor" : "none"} 
                stroke="currentColor" 
                strokeWidth="2"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
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
          <button
            className={`schedule-filter-pill ${selectedType === 'talk' ? 'active' : ''}`}
            onClick={() => setSelectedType('talk')}
          >
            Talks
          </button>
          <button
            className={`schedule-filter-pill ${selectedType === 'workshop' ? 'active' : ''}`}
            onClick={() => setSelectedType('workshop')}
          >
            Workshops
          </button>
          <button
            className={`schedule-filter-pill ${selectedType === 'sponsor' ? 'active' : ''}`}
            onClick={() => setSelectedType('sponsor')}
          >
            Sponsor Talks
          </button>
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
        {Object.entries(
          groupEventsByRoom(filterEvents(filterEventsByDay(events, selectedDay)))
        ).map(([room, events]) => (
          <div key={room} className="room-section">
            <div className="room-header">
              <h2>{room}</h2>
            </div>
            {events.map((event) => {
              const isFavorite = favorites.includes(event.id);
              const isLiveEvent = isLive(event.start, event.end);
              const remainingMinutes = isLiveEvent ? calculateRemainingMinutes(event.end) : 0;

              return (
                <ScheduleCard
                  key={event.id}
                  startTime={event.time}
                  endTime={event.endTime}
                  duration={`${event.duration} min`}
                  title={event.title}
                  speakers={event.speakers?.map(speaker => ({
                    name: speaker.name,
                    avatar: findSpeakerProfile(speaker.id)
                  }))}
                  location={event.room}
                  type={event.type}
                  isFavorite={isFavorite}
                  remainingMinutes={remainingMinutes}
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
        onClose={() => setSelectedEvent(null)}
      />
    </div>
  );
};

export default Schedule;

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

    console.log({
      start: startDate.toLocaleString(),
      end: endDate.toLocaleString(),
      duration: Math.round(duration),
    });

    return Math.round(duration);
  };

  const determineEventType = (room) => {
    if (room.toLowerCase().includes('workshop')) return 'workshop';
    if (room.toLowerCase().includes('sponsor')) return 'sponsor';
    return 'talk';
  };

  const filterEvents = (events) => {
    if (selectedType === 'all') return events;
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

  const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <button className="modal-close" onClick={onClose}>
            ×
          </button>
          {children}
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
      </div>

      <div className="schedule-grid">
        {Object.entries(
          groupEventsByRoom(filterEvents(filterEventsByDay(events, selectedDay)))
        ).map(([room, events]) => (
          <div key={room} className="room-section">
            <div className="room-header">
              <h2>{room}</h2>
            </div>
            {events.map((event) => (
              <div key={event.id} className="event-card" onClick={() => setSelectedEvent(event)}>
                <div className="event-header">
                  <div className="event-time">
                    <span>
                      {event.time} - {event.endTime}
                    </span>
                    <span className="duration-badge">{event.duration} min</span>
                  </div>
                  <span className="event-type">{event.type}</span>
                </div>
                <h3 className="event-title">{event.title}</h3>
                {event.speakers?.map((speaker) => (
                  <div key={speaker.id} className="speaker-info">
                    <img
                      src={findSpeakerProfile(speaker.id)}
                      alt={speaker.name}
                      className="speaker-avatar"
                    />
                    <span>{speaker.name}</span>
                  </div>
                ))}
                <div className="event-room">
                  <span>{event.room}</span>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      <Modal isOpen={!!selectedEvent} onClose={() => setSelectedEvent(null)}>
        {selectedEvent && (
          <div className="event-modal">
            <h2>{selectedEvent.title}</h2>
            <div className="event-details">
              <div className="time-details">
                <span>
                  {selectedEvent.time} - {selectedEvent.endTime}
                </span>
                <span>({selectedEvent.duration} min)</span>
              </div>
              <div className="room-details">
                <span>{selectedEvent.room}</span>
              </div>
            </div>
            <p className="event-description">{selectedEvent.description}</p>
            <div className="speakers-list">
              {selectedEvent.speakers?.map((speaker) => (
                <div key={speaker.id} className="speaker-detail">
                  <img
                    src={findSpeakerProfile(speaker.id)}
                    alt={speaker.name}
                    className="speaker-avatar-large"
                  />
                  <div className="speaker-info">
                    <h4>{speaker.name}</h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Schedule;

import React, { useEffect, useState } from 'react';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import ScheduleCard from '../../schedule/schedule/ScheduleCard';

import './schedule.css';

const scriptUrl = 'https://sessionize.com/api/v2/px1o0jp3/view/GridSmart';
const speakerURL = 'https://sessionize.com/api/v2/px1o0jp3/view/Speakers';

const TITLE = 'Schedule';
const DESCRIPTION =
  "Get ready for action-packed days. With two tracks and a diverse range of sessions to choose from, you'll have plenty of opportunities to learn from experts in the field.";

const VISIBLE_EVENT_TYPES = ['talk', 'workshop'];

const calculateDuration = (start, end) => {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const duration = (endDate - startDate) / 1000 / 60;
  return Math.round(duration);
};

const determineEventType = (room, session) => {
  if (session && session.isServiceSession) return 'service';
  if (room.toLowerCase().includes('workshop')) return 'workshop';
  if (room.toLowerCase().includes('sponsor')) return 'sponsor';
  return 'talk';
};

const convertSessionsToEvents = (data) => {
  const events = [];
  data.forEach((day) => {
    day.rooms.forEach((room) => {
      const filteredSessions = room.sessions.filter((session) => {
        return (
          session.status === 'Accepted' &&
          session.isInformed === true &&
          session.isConfirmed === true &&
          !session.isServiceSession
        );
      });

      const roomEvents = filteredSessions.map((session) => ({
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
        type: determineEventType(room.name, session),
        speakers: session.speakers,
        start: session.startsAt,
        end: session.endsAt,
        isServiceSession: session.isServiceSession || false,
      }));
      events.push(...roomEvents);
    });
  });
  return events;
};

const Schedule = () => {
  const [featuredEvents, setFeaturedEvents] = useState([]);
  const [speakerData, setSpeakerData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sessionCount, setSessionCount] = useState(0);

  const findSpeakerProfile = (speakerId) => {
    const speaker = speakerData.find((s) => s.id === speakerId);
    return speaker ? speaker.profilePicture : '/placeholder.svg?height=40&width=40';
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

        // Events aufbereiten wie im großen Schedule
        const allEvents = convertSessionsToEvents(eventsData);

        // Filtere nach gewünschten Typen
        const filteredEvents = allEvents.filter((event) =>
          VISIBLE_EVENT_TYPES.includes(event.type)
        );

        setSessionCount(filteredEvents.length);

        // Zufällig 2 Events auswählen
        const shuffled = [...filteredEvents].sort(() => 0.5 - Math.random());
        setFeaturedEvents(shuffled.slice(0, 2));
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <section id="agenda" className="schedule-section">
      <div className="schedule-container">
        <div className="schedule-header">
          <span className="schedule-badge">
            <Calendar className="schedule-badge-icon" />
            Agenda
          </span>
          <h2 className="schedule-title">
            {TITLE}
            <span className="schedule-title-accent"> 2025</span>
          </h2>
        </div>

        <div className="schedule-content">
          <div className="schedule-info">
            <p className="schedule-description">{DESCRIPTION}</p>

            <div className="schedule-stats">
              <div className="schedule-stat-item">
                <span className="schedule-stat-badge">
                  <Clock className="schedule-stat-icon" />2 Days
                </span>
              </div>
              <div className="schedule-stat-item">
                <span className="schedule-stat-badge">
                  <Calendar className="schedule-stat-icon" />
                  {loading ? '...' : `${sessionCount} Sessions`}
                </span>
              </div>
            </div>

            <div className="schedule-cta">
              <button
                type="button"
                className="schedule-cta-primary"
                onClick={() => {
                  window.location.href = '/schedule';
                }}
              >
                <span>View Full Schedule</span>
                <ArrowRight className="schedule-cta-icon" />
              </button>
            </div>
          </div>

          <div className="schedule-events">
            {loading ? (
              <div className="schedule-loading">
                <p className="schedule-loading-text">Loading sessions...</p>
              </div>
            ) : featuredEvents.length === 0 ? (
              <div className="schedule-empty">
                <p className="schedule-empty-text">No featured sessions found.</p>
              </div>
            ) : (
              <div className="schedule-events-grid">
                {featuredEvents.map((event) => (
                  <div key={event.id} className="schedule-event-card">
                    <ScheduleCard
                      startTime={event.time}
                      endTime={event.endTime}
                      duration={`${event.duration} min`}
                      title={event.title}
                      speakers={event.speakers?.map((speaker) => ({
                        name: speaker.name,
                        avatar: findSpeakerProfile(speaker.id),
                      }))}
                      location={event.room}
                      type={event.type}
                      isFavorite={true}
                      isLive={false}
                      onFavoriteClick={() => {}}
                      onClick={() => (window.location.href = '/schedule')}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Schedule;

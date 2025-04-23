import React, { useEffect, useState } from 'react';
import './schedule.css';

const SESSIONS_URL = 'https://sessionize.com/api/v2/px1o0jp3/view/Sessions';
const SPEAKERS_URL = 'https://sessionize.com/api/v2/px1o0jp3/view/Speakers';

const TITLE = 'Schedule';
const DESCRIPTION =
  "Get ready for action-packed days. With two tracks and more than 45 sessions to choose from, you'll have plenty of opportunities to learn from experts in the field.";

const Schedule = () => {
  const [featuredSessions, setFeaturedSessions] = useState([]);
  const [speakers, setSpeakers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Lade Sessions und Speaker parallel
    Promise.all([
      fetch(SESSIONS_URL).then((res) => res.json()),
      fetch(SPEAKERS_URL).then((res) => res.json()),
    ])
      .then(([sessions, speakers]) => {
        setSpeakers(speakers);

        console.log(sessions)

        // Beispiel: Nimm die ersten 3 Sessions als "Featured"
        // Alternativ: sessions.filter(s => s.tags && s.tags.includes('Featured'))
        const featured = sessions.slice(0, 3);
        setFeaturedSessions(featured);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Hilfsfunktion: Speaker-Objekte zu einer Session holen
  const getSessionSpeakers = (session) => {
    if (!session.speakers) return [];
    return session.speakers
      .map((speakerId) => speakers.find((s) => s.id === speakerId))
      .filter(Boolean);
  };

  return (
    <section className="safe-paddings relative bg-white pb-40 lg:pb-32 md:py-24 sm:py-16">
      <div className="container">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-2 items-start gap-12 sm:grid-cols-2 xs:grid-cols-1">
            <div>
              <h2 className="section-title">{TITLE}</h2>
              <p className="mb-8 text-lg leading-relaxed text-slate-600">{DESCRIPTION}</p>

              <div className="mb-8 flex flex-col gap-4 sm:flex-row">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center rounded-full border border-slate-300 px-3 py-1 text-sm">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-1"
                    >
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                      <line x1="16" y1="2" x2="16" y2="6"></line>
                      <line x1="8" y1="2" x2="8" y2="6"></line>
                      <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>
                    45+ Sessions
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center rounded-full border border-slate-300 px-3 py-1 text-sm">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-1"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                    2 Days
                  </span>
                </div>
              </div>
              <button
                type="button"
                className="button"
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  window.location.href = '/schedule';
                }}
              >
                View full schedule
              </button>
            </div>

            <div className="space-y-4">
              <h3 className="mb-2 text-xl font-medium text-slate-700">Featured Sessions</h3>
              {loading ? (
                <div>Lade Sessions...</div>
              ) : featuredSessions.length === 0 ? (
                <div>Keine Featured Sessions gefunden.</div>
              ) : (
                featuredSessions.map((session) => (
                  <div
                    key={session.id}
                    className="overflow-hidden rounded-lg border border-slate-200 transition-colors hover:border-blue-200"
                  >
                    <div className="flex">
                      <div className="w-2 bg-blue-500"></div>
                      <div className="flex-1 p-4">
                        <div className="mb-1 flex items-center gap-2 text-sm text-slate-500">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="mr-1"
                          >
                            <circle cx="12" cy="12" r="10"></circle>
                            <polyline points="12 6 12 12 16 14"></polyline>
                          </svg>
                          <span>
                            {session.startsAt} - {session.endsAt}
                          </span>
                          <span className="mx-1">•</span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="mr-1"
                          >
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                            <circle cx="12" cy="10" r="3"></circle>
                          </svg>
                          <span>{session.room}</span>
                        </div>
                        <h4 className="font-medium text-slate-800">{session.title}</h4>
                        {/* Speaker anzeigen */}
                        <div className="mt-2 flex flex-wrap gap-2">
                          {getSessionSpeakers(session).map((speaker) => (
                            <div key={speaker.id} className="flex items-center gap-2">
                              <img
                                src={speaker.profilePicture}
                                alt={speaker.fullName}
                                className="w-8 h-8 rounded-full object-cover"
                              />
                              <span className="text-sm text-slate-700">{speaker.fullName}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Schedule;

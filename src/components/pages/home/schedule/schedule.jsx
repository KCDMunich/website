import React from 'react';
import './schedule.css';
import LINKS from 'constants/links';

const TITLE = 'Schedule';
const DESCRIPTION =
  "Get ready for action-packed days. With two tracks and more than 45 sessions to choose from, you'll have plenty of opportunities to learn from experts in the field.";

const Schedule = () => {
  // Sample featured sessions
  const featuredSessions = [
    {
      title: 'Opening & Welcome',
      time: '09:30 - 09:50',
      track: 'Main Stage',
      type: 'talk',
    },
    {
      title: 'Kubernetes: The Future of Cloud Native',
      time: '10:20 - 11:00',
      track: 'Top Stage',
      type: 'talk',
    },
    {
      title: 'Hands-on Workshop: Cloud Native Development',
      time: '11:00 - 12:30',
      track: 'Workshop Room',
      type: 'workshop',
    },
  ];

  return (
    <section className="safe-paddings relative bg-white pb-40 lg:pb-32 md:py-24 sm:py-16">
      <div className="container">
        <div className="mx-auto max-w-7xl">
          {/* Modified the grid to always use 2 columns except on small screens */}
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
              {featuredSessions.map((session, index) => (
                <div
                  key={index}
                  className="overflow-hidden rounded-lg border border-slate-200 transition-colors hover:border-blue-200"
                >
                  <div className="flex">
                    <div
                      className={`w-2 ${
                        session.type === 'workshop' ? 'bg-green-500' : 'bg-blue-500'
                      }`}
                    ></div>
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
                        <span>{session.time}</span>
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
                        <span>{session.track}</span>
                      </div>
                      <h4 className="font-medium text-slate-800">{session.title}</h4>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Schedule;

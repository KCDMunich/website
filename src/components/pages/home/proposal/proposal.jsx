import { CalendarDays, Info, Clock } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import './proposal.css';

const PLAYLIST_ID = 'PL54A_DPe8WtBuSp7sqpxeuy_UoTTlKB1O';

const SAMPLE_VIDEOS = [
  {
    id: 'o3MYeUWhETo',
    title: 'Cloud Native Security Best Practices',
    year: '2024',
  },
  {
    id: 'oCFNrXWN-HE',
    title: 'Kubernetes at Scale',
    year: '2024',
  },
  {
    id: 'Ty4B7VPdWDs',
    title: 'KCD Munich 2024',
    year: '2024',
  },
  {
    id: 'oYtguGxGeUw',
    title: 'Confidential Containers as a Gateway to Cloud Adoption in Sensitive Sectors',
    year: '2024',
  },
  {
    id: 'oohD1uXGqj8',
    title: 'From Chaos to Control: Cloud Native Governance with Kyverno!',
    year: '2024',
  },
  {
    id: 'pxpBlLpt-BQ',
    title: 'Oh No Our Kubernetes Cluster Has Been Compromised! Will YOU Save the Day?',
    year: '2024',
  },
  {
    id: 'r7euuyxcjhA',
    title: 'Cloud Native Security: A New Paradigm for a New World',
    year: '2024',
  },
  {
    id: 'w8-46FhmxEQ',
    title:
      'Telemetry Showdown: Fluent Bit vs. OpenTelemetry Collector - A Comprehensive Benchmark Analysis',
    year: '2024',
  },
  {
    id: 'xsl86VcsCNA',
    title: 'Do your thing: ICHP is building a great support team',
    year: '2024',
  },
  {
    id: 'xtAZdRVdc3U',
    title: 'Kubernetes with Guardrails – How Mercedes-Benz enables Developers across 900+ Clusters',
    year: '2024',
  },
  {
    id: 'ykHlvBW564I',
    title: 'Custom debug profiles in kubectl',
    year: '2024',
  },
  {
    id: 'lgQ-qhPaalU',
    title: 'Embracing the Future: The Effortless Mutual TLS and Traffic Control Without Sidecars',
    year: '2024',
  },
  {
    id: 'mH7B-17zSmM',
    title: 'Managing Kubernetes with Cluster API and Cluster Stacks',
    year: '2024',
  },
  {
    id: 'cCFYrZpwS7s',
    title:
      'Reflections on a decade of Kubernetes. How it has been and what the future is holding for us',
    year: '2024',
  },
  {
    id: 'bSuYqi1A2jM',
    title: 'Unlocking New Platform Experiences With Open Interfaces',
    year: '2024',
  },
  {
    id: 'axh7SOufh8M',
    title:
      'Updates from the Kubernetes Storm Center: Open Source Threat Intelligence for Cloud Native',
    year: '2024',
  },
  {
    id: 'cRSVBoBWbU0',
    title: 'OCI Registry: Beyond Container Images - Migrating from GitOps to RegistryOps',
    year: '2024',
  },
  {
    id: 'hOxjZoogYyY',
    title: 'OpenSSF Scorecard: The Superhero That Saves Your Open Source Project!',
    year: '2024',
  },
  {
    id: 'kCm0agoKeSU',
    title:
      'Saturating people not systems: Lessons learned from building a platform to serve dishes worldwide',
    year: '2024',
  },
  {
    id: 'nVjkwcxKuFA',
    title: 'Intent Based Access Control at Scale With BPF and Traffic Pattern Detection',
    year: '2024',
  },
  {
    id: 'nyxKd96TQ24',
    title: 'From Dashboard to Headlamp: Evolution of the Kubernetes User Experience',
    year: '2024',
  },
  {
    id: 'R7a3b6oj6Dg',
    title: "No More YAML Soup: Taking Control with Dagger's Pipeline-as-Code Philosophy",
    year: '2024',
  },
  {
    id: 'CN-Ny3ifPqo',
    title: 'Go Green: Reducing Emissions, Costs, and Greenwashing',
    year: '2024',
  },
  {
    id: 'RRZIweUW4YA',
    title: 'Kubernetes Authentication 2.0: Structured Authentication Configuration',
    year: '2024',
  },
  {
    id: 'UsIeZFZxak8',
    title: 'A Greener, Cost-Effective Cloud with Serverless WebAssembly',
    year: '2024',
  },
  {
    id: 'BGCLszgL9s4',
    title: 'The CNCF EndUser TAB - update and future',
    year: '2024',
  },
  {
    id: 'I7CLNMNfR_M',
    title: 'The Periodic Table of Cloud Native',
    year: '2024',
  },
  {
    id: 'IeyROQP9YBg',
    title:
      'Build and run your own intelligent application based on open source using Semantic Kernel and Kaito',
    year: '2024',
  },
  {
    id: 'PqZnl34LWZM',
    title:
      'Gateway API Unleashed - The next evolution of Kubernetes native API Gateways and why you should care',
    year: '2024',
  },
  {
    id: 'RRmtCI1qKkk',
    title: 'Towards Standardized Platforms: How the CNOE Project Can Help',
    year: '2024',
  },
  {
    id: 'W4mvncgziq4',
    title: 'Fast Kubernetes Autoscaling with Knative',
    year: '2024',
  },
  {
    id: '00t13Imk0G0',
    title: 'DevOps Lessons from a Primary School Teacher',
    year: '2024',
  },
  {
    id: '42dZ3kDtOSM',
    title: 'Platform Engineering: DevOps Evolution or a Fancy Rename?',
    year: '2024',
  },
  {
    id: '-42bqyOK1Ro',
    title: 'Goodbye Ingress - Hello Gateway API',
    year: '2024',
  },
  {
    id: '2yNgtxvwDak',
    title:
      'NFD: Simplifying Cluster Administration through Automated Node Labels, Taints, and Annotations',
    year: '2024',
  },
  {
    id: '3aR8yF2mEYQ',
    title: 'The Swiss Army Knife of Cloud Native Networking',
    year: '2024',
  },
  {
    id: '3lIUPHQ33GM',
    title: 'Choose Your Own Adventure: The Struggle for Security',
    year: '2024',
  },
  {
    id: '3pCmHdMBXE4',
    title: 'IoT and WebSockets in K8s: Operating and Scaling an EV Charging Station Network',
    year: '2024',
  },
  {
    id: '6MFflSBCOWY',
    title: "A hitchhiker's guide to CNCF/OSS observability solutions around Kubernetes",
    year: '2024',
  },
  {
    id: 'B2-r_2tgkTs',
    title: 'Cognitive Empowerment through open weight LLMs as Ethical Smart Assistants',
    year: '2024',
  },
  {
    id: 'BEWCLcZhqpI',
    title: 'When They Go High, We Go Low – Hooking Libc Calls To Debug Kubernetes Apps',
    year: '2024',
  },
];

const Proposal = () => {
  const [videos, setVideos] = useState(SAMPLE_VIDEOS);

  // Termine
  const openDate = new Date('2026-01-13T00:00:00');
  const closeDate = new Date('2026-03-31T12:00:00');
  const now = new Date();
  const total = closeDate.getTime() - openDate.getTime();
  const progress = Math.max(0, Math.min(100, ((now.getTime() - openDate.getTime()) / total) * 100));

  // Flag, ob die Proposal-Phase geschlossen ist
  const isClosed = now > closeDate;

  const sessions = [
    { type: 'Presentation', duration: '30min' },
    { type: 'Lightning Talk', duration: '5min' },
    { type: 'Workshop', duration: '60min' },
    { type: 'Workshop', duration: '90min' },
    { type: 'Panel Discussion', duration: '45min' },
  ];

  const shuffleVideos = () => {
    setVideos([...videos].sort(() => Math.random() - 0.5));
  };

  useEffect(() => {
    shuffleVideos();
  }, []);

  return (
    <div className="mx-auto max-w-7xl p-4" id="call-for-speakers">
      <div className="mx-auto max-w-7xl space-y-8">
        <h2 className="section-title">Submit a Talk</h2>
        {/* Timeline Card */}
        <div className="rounded-lg border bg-white shadow-sm">
          <div className="border-b p-6">
            <h2 className="flex items-center gap-2 text-lg font-semibold">
              <CalendarDays className="h-5 w-5 text-primary-1" />
              Submission Timeline
            </h2>
          </div>
          <div className="space-y-6 p-6">
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <div>
                  <div className="text-gray-500">Opens</div>
                  <div className="font-medium">13 Jan 2026 12:00 AM</div>
                </div>
                <div className="text-right">
                  <div className="text-gray-500">Closes</div>
                  <div className="font-medium">31 Mar 2026 12:00 PM</div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="h-2 w-full rounded-full bg-gray-200">
                <div className="h-2 rounded-full bg-primary-1" style={{ width: `${progress}%` }} />
              </div>

              <div className="flex items-center text-xs text-gray-500">
                <Clock className="mr-1 h-3 w-3" />
                W. Europe Daylight Time (UTC+02:00)
              </div>

              {/* Anzeige für geschlossene Proposals */}
              {isClosed && (
                <div className="mt-4 rounded-md p-3 text-center text-sm font-medium">
                  Submissions are closed. Thank you for your participation!
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Guidelines Card nur anzeigen, wenn Proposal-Phase aktiv ist */}
        {!isClosed && (
          <div className="rounded-lg border bg-white shadow-sm">
            <div className="border-b p-6">
              <h2 className="flex items-center gap-2 text-lg font-semibold">
                <Info className="h-5 w-5 text-primary-1" />
                Information
              </h2>
            </div>
            <div className="space-y-4 p-6">
              <p className="text-lg font-medium">First time submitting? Don't feel intimidated.</p>
              <p className="text-gray-600">
                This CNS is an excellent way to get to know the community and share your ideas.
              </p>

              <div className="pt-4">
                <h3 className="mb-4 font-semibold">Session Types:</h3>
                <div className="flex flex-wrap items-center gap-3">
                  {sessions.map((session, index) => (
                    <div
                      key={index}
                      className="flex flex-shrink-0 items-center rounded-lg border p-3 transition-colors hover:bg-gray-50"
                    >
                      <div className="flex content-center items-center gap-3">
                        <span className="rounded-md border bg-gray-50 px-2 py-1 text-sm">
                          {session.duration}
                        </span>
                        <span className="font-medium">{session.type}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '1rem',
                }}
              >
                <button
                  className="button"
                  onClick={() =>
                    window.open('https://sessionize.com/cloud-native-summit-2026/', '_blank')
                  }
                >
                  Submit a session
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Video Section */}
        <section>
          <div className="grid grid-cols-3 gap-4 md:grid-cols-3 sm:grid-cols-1">
            {videos.slice(0, 3).map((video) => (
              <div key={video.id} className="overflow-hidden rounded-xl bg-white shadow-md">
                <div className="relative w-full bg-black pt-[56.25%]">
                  <button
                    className="absolute inset-0 flex h-full w-full items-center justify-center"
                    onClick={() =>
                      window.open(`https://www.youtube.com/watch?v=${video.id}`, '_blank')
                    }
                  >
                    <img
                      src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`}
                      alt={video.title}
                      className="absolute left-0 top-0 h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg
                        className="h-16 w-16 text-red-600"
                        viewBox="0 0 68 48"
                        fill="currentColor"
                      >
                        <path
                          d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z"
                          fill="#f00"
                        ></path>
                        <path d="M 45,24 27,14 27,34" fill="#fff"></path>
                      </svg>
                    </div>
                  </button>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900">{video.title}</h3>
                </div>
              </div>
            ))}
          </div>

          <div className="mb-20 mt-4 flex items-center justify-between">
            <a
              href={`https://www.youtube.com/playlist?list=${PLAYLIST_ID}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-gray-200 bg-white px-4 py-2 text-gray-600 hover:bg-gray-50"
            >
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M10 8l6 4-6 4V8z" />
              </svg>
              View Full Playlist
            </a>
            <button
              onClick={shuffleVideos}
              className="inline-flex items-center gap-2 rounded-md border border-gray-200 bg-white px-4 py-2 text-gray-600 hover:bg-gray-50"
            >
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M18 4l3 3-3 3M6 20l-3-3 3-3M21 7H3M21 17H3M12 4v16" />
              </svg>
              Shuffle Videos
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Proposal;

import React, { useEffect, useState } from 'react';

const PLAYLIST_ID = 'PL54A_DPe8WtDLSA_EA7ETfprpRWzd2yqV';
const PLAYLIST_URL = `https://www.youtube.com/playlist?list=${PLAYLIST_ID}`;

const FALLBACK_VIDEOS = [
  {
    id: 'g-sZwa52DNE',
    title: 'Cloud Native Summit Munich 2023 – Opening Keynote',
    thumbnail: 'https://img.youtube.com/vi/g-sZwa52DNE/hqdefault.jpg',
  },
];

const ScheduleTeaser = () => {
  const [videos, setVideos] = useState(FALLBACK_VIDEOS);
  const [activeVideo, setActiveVideo] = useState(() => FALLBACK_VIDEOS[0]);

  useEffect(() => {
    let cancelled = false;

    const fetchPlaylist = async () => {
      if (typeof window === 'undefined') return;
      try {
        const response = await fetch(
          `https://www.youtube.com/feeds/videos.xml?playlist_id=${PLAYLIST_ID}`
        );
        if (!response.ok) return;

        const xml = await response.text();
        const parser = new window.DOMParser();
        const doc = parser.parseFromString(xml, 'text/xml');
        const entries = Array.from(doc.getElementsByTagName('entry'));

        const extractedVideos = entries
          .map((entry) => {
            const id = entry.getElementsByTagName('yt:videoId')[0]?.textContent;
            const title = entry.getElementsByTagName('title')[0]?.textContent;
            const thumbnail = entry.getElementsByTagName('media:thumbnail')[0]?.getAttribute('url');

            if (!id) return null;

            return {
              id,
              title: title || 'CNS Munich Session',
              thumbnail,
            };
          })
          .filter(Boolean);

        if (!cancelled && extractedVideos.length > 0) {
          setVideos(extractedVideos);
          const randomVideo = extractedVideos[Math.floor(Math.random() * extractedVideos.length)];
          setActiveVideo(randomVideo);
        }
      } catch (error) {
        // Silent fallback to predefined videos
      }
    };

    fetchPlaylist();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section
      id="schedule-teaser"
      className="safe-paddings bg-slate-50 py-24 text-slate-900 lg:py-20 md:py-16 sm:py-12"
    >
      <div className="mx-auto w-full max-w-[1248px] md:px-6">
        <div className="flex items-stretch justify-between gap-20 lg:gap-16 md:flex-col md:items-stretch md:gap-12">
          <div className="max-w-[480px] flex-1 text-left md:w-full md:max-w-none">
            <h2 className="text-4xl font-bold leading-tight text-slate-900 md:text-3xl sm:text-2xl">
              Take a look back while we build what’s next
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-slate-600 md:text-base sm:text-sm">
              Last year’s edition is where these talks, workshops, and community spotlights first
              came to life. Browse the past schedule while we polish the programme for the upcoming
              event.
            </p>
            <div className="mt-10 flex justify-start md:justify-center">
              <a href="/schedule" className="button px-6 py-3 text-base sm:px-4 sm:py-2 sm:text-sm">
                Revisit last year’s schedule
              </a>
            </div>
          </div>

          <div className="flex-1 md:w-full md:max-w-none">
            <div className="h-full rounded-2xl border border-slate-200 bg-white p-8 shadow-lg lg:p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wide text-primary-1/90">
                    Watch last year’s talks
                  </p>
                </div>
                <a
                  href={PLAYLIST_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-primary-1 transition-colors duration-200 hover:text-primary-1/80"
                >
                  Open playlist
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </a>
              </div>

              <div className="mt-4 overflow-hidden rounded-xl bg-slate-900/5 shadow-inner">
                {activeVideo ? (
                  <iframe
                    title={activeVideo.title}
                    src={`https://www.youtube.com/embed/${activeVideo.id}?rel=0&modestbranding=1&color=white&list=${PLAYLIST_ID}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                    className="h-64 w-full lg:h-64 md:h-60"
                  />
                ) : (
                  <div className="flex h-64 w-full items-center justify-center text-sm text-slate-500 lg:h-64 md:h-60">
                    Loading video…
                  </div>
                )}
              </div>

              {activeVideo?.title && (
                <p className="mt-3 text-sm font-medium text-slate-700">{activeVideo.title}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScheduleTeaser;

import React, { useEffect, useState } from 'react';

const PLAYLIST_ID = 'PL54A_DPe8WtDLSA_EA7ETfprpRWzd2yqV';
const PLAYLIST_URL = `https://www.youtube.com/playlist?list=${PLAYLIST_ID}`;

const FALLBACK_VIDEO_IDS = [
  'g-sZwa52DNE',
  'CHb3TLEV8ZU',
  'vmKlVABhdwc',
  'mHDBsS9c9MM',
  'n5LsBJwARbU',
  'WJzMyA47lfo',
  'SDelo4VdPUk',
  'SPPJHwavM0c',
  'lkK4ACNg22g',
  'aLdgVrnMxcs',
  'XETuwndd_mw',
  'cIZ90x7aNJE',
  'L2d_busMOJA',
  'PwqyYbGXYG8',
  'xWSEGsB7uFI',
  '0inKO9yA950',
  'PF2diWKfjWo',
  'GiZzkSnDc-E',
  'LwYqFrLnBeM',
  'n_o4dxHrNDM',
  'NfqV0Lb00Zc',
  'E_r56x92KZw',
  'HV9KsLz-odw',
  'pg2DKYc9n_o',
  'iiGRMPMBKVQ',
  'Rh6cjzEB1-4',
  'EztpUoi0hgU',
  'X9U0b7RVafM',
  'QMhkueuHnpE',
  '3N_XBNAycqw',
  'mr83OyjqaCQ',
  'KkjQI20IFtE',
  'kFyRUae2hV4',
  '46-cPZz8VH0',
  'tWHHmb-v6Y0',
  'RLyO18tG8GI',
  'RYdsuTD8Wjs',
  'eLGBAd7fHdM',
  'iSMk7a62wUc',
  'aEqj_Ok5B58',
  'fDBNJ2N9fqw',
  '4CcNPHT_-nA',
  'nMlmUFKN7Bo',
  'MpU-vo4K7BQ',
  'sgYc8Vt6eaU',
];

const FALLBACK_VIDEOS = FALLBACK_VIDEO_IDS.map((id, index) => ({
  id,
  title: `Cloud Native Summit Munich – Sessions ${index + 1}`,
  thumbnail: `https://img.youtube.com/vi/${id}/hqdefault.jpg`,
}));

const getRandomFallbackVideo = () => {
  if (FALLBACK_VIDEOS.length === 0) {
    return undefined;
  }

  const randomIndex = Math.floor(Math.random() * FALLBACK_VIDEOS.length);
  return FALLBACK_VIDEOS[randomIndex];
};

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

  useEffect(() => {
    if (typeof window === 'undefined') return;

    setActiveVideo((currentVideo) => {
      const initialFallbackId = FALLBACK_VIDEOS[0]?.id;
      const shouldSelectRandom = !currentVideo || currentVideo.id === initialFallbackId;

      if (!shouldSelectRandom) {
        return currentVideo;
      }

      return getRandomFallbackVideo() || currentVideo || FALLBACK_VIDEOS[0];
    });
  }, []);

  return (
    <section
      id="schedule-teaser"
      className="safe-paddings py-24 text-slate-900 lg:py-20 md:py-16 sm:py-12"
    >
      <div className="mx-auto w-full max-w-[1248px] md:px-6">
        <div className="flex items-stretch justify-between gap-20 lg:gap-16 md:flex-col md:items-stretch md:gap-12">
          <div className="max-w-[480px] flex-1 text-left md:w-full md:max-w-none">
            <h2 className="text-5xl font-bold leading-tight text-primary-1 md:text-4xl sm:text-3xl">
              Replay past Sessions
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-slate-600 md:text-base sm:text-sm">
              Revisit every talk, workshop, and community spotlight from last year’s program while
              we prepare for the next gathering. The full schedule remains live, so you can catch
              anything you missed or replay standout sessions with your team.
            </p>
            <div className="mt-10 flex justify-start md:justify-center">
              <a href="/schedule" className="button px-6 py-3 text-base sm:px-4 sm:py-2 sm:text-sm">
                View the schedule
              </a>
            </div>
          </div>

          <div className="flex-1 md:w-full md:max-w-none">
            <div className="h-full rounded-2xl border border-slate-200 bg-white p-8 lg:p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wide text-primary-1/90">
                    Watch last year's talks
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

              <div className="mt-4 overflow-hidden rounded-xl bg-slate-900/5">
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

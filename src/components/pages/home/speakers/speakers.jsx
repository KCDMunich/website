import React, { useState, useEffect } from 'react';
import { Github, Twitter, Linkedin, Globe, Youtube } from 'lucide-react';

// === HIER FLAG SETZEN ===
const SHOW_FEATURED_ONLY = false; // <--- true = nur Featured, false = alle Speaker

const scriptUrl = 'https://sessionize.com/api/v2/px1o0jp3/view/Speakers';

const preAnnouncedSpeakerIds = [
  'a2665c2b-13c9-4337-9c78-db85bca70e60',
  'b4047d7c-94cf-4f5e-bbdb-7619ab241f06', 
  'be3da75f-4550-4f7f-9d44-863076ed4e91', 
  '647c84a5-1a13-4641-8d8f-49109cadf78b', 
  '8f398417-82f0-467a-b234-08e82f7f9acd',
  '38a4131f-b1ca-452a-aaba-f5bb472403ab'
];

const speakerSessionMap = {
  'a2665c2b-13c9-4337-9c78-db85bca70e60': [882116],
  'b4047d7c-94cf-4f5e-bbdb-7619ab241f06': [847107],
  'be3da75f-4550-4f7f-9d44-863076ed4e91': [836276],
  '647c84a5-1a13-4641-8d8f-49109cadf78b': [870316],
  '8f398417-82f0-467a-b234-08e82f7f9acd': [867444],
  '38a4131f-b1ca-452a-aaba-f5bb472403ab': [855080]
};

const findCompanyInfo = (speaker) => {
  const company = speaker.questionAnswers.find((q) => q.question === 'Company');
  return company?.answer || 'Speaker';
};

const SocialIcon = ({ url, isWhite = false }) => {
  const iconSize = 24;
  const iconColor = isWhite ? '#ffffff' : '#283058';

  if (url.includes('github.com')) return <Github size={iconSize} color={iconColor} />;
  if (url.includes('twitter.com')) return <Twitter size={iconSize} color={iconColor} />;
  if (url.includes('linkedin.com')) return <Linkedin size={iconSize} color={iconColor} />;
  if (url.includes('youtube.com')) return <Youtube size={iconSize} color={iconColor} />;
  return <Globe size={iconSize} color={iconColor} />;
};

const Dialog = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl overflow-hidden">
        <button
          className="absolute right-4 top-4 z-10 rounded-full bg-gray-100/80 p-2 text-gray-600 hover:bg-gray-200/80 hover:text-gray-900"
          onClick={onClose}
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
            />
          </svg>
        </button>
        <div className="max-h-[80vh] overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

const SpeakerCard = ({ speaker, onClick, showTalk = true }) => {
  const company = findCompanyInfo(speaker);
  const firstTwoLinks = speaker.links?.slice(0, 2) || [];

  const hasSession = Array.isArray(speaker.sessions) && speaker.sessions.length > 0;
  
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl overflow-hidden shadow-lg transform hover:-translate-y-2 transition-transform duration-300 group cursor-pointer h-full flex flex-col"
    >
      <div className="relative overflow-hidden aspect-square">
        <img
          src={speaker.profilePicture}
          alt={speaker.fullName}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
          <div className="p-3 sm:p-4">
            <div className="flex gap-2 mb-2">
              {firstTwoLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/20 p-1.5 sm:p-2 rounded-full hover:bg-white/40 transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  <SocialIcon url={link.url} isWhite={true} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="p-3 sm:p-4 text-center flex flex-col flex-grow">
        <h3 className="font-bold text-sm sm:text-lg text-gray-900">{speaker.fullName}</h3>
        <p className="text-[#283058] text-xs sm:text-sm font-medium">{company}</p>
        <div className="mt-2 bg-gray-50 p-2 rounded-lg">
          {showTalk && hasSession ? (
            <div>
              <p className="text-xs text-[#283058] font-medium mb-1">SESSION</p>
              <p className="text-xs sm:text-sm text-gray-800 line-clamp-2 font-medium">
                {speaker.sessions[0].name}
              </p>
            </div>
          ) : (
            <p className="text-xs sm:text-sm text-gray-600">Sessions coming soon</p>
          )}
        </div>
      </div>
    </div>
  );
};

const SpeakerDialog = ({ speaker }) => {
  const company = findCompanyInfo(speaker);
  
  const validSessions = Array.isArray(speaker.sessions) 
    ? speaker.sessions.filter(session => 
        typeof session === 'object' && 
        typeof session.id === 'number' && 
        typeof session.name === 'string'
      )
    : [];

  return (
    <div className="p-4 sm:p-6">
      <div className="flex flex-col items-start mb-6">
        <p className="text-sm text-[#283058] font-medium mb-1">{company}</p>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">{speaker.fullName}</h2>
      </div>

      <div className="space-y-6">
        <div className="bg-gray-50 rounded-xl p-4">
          <div className="aspect-square rounded-lg overflow-hidden mb-4">
            <img
              src={speaker.profilePicture}
              alt={speaker.fullName}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {speaker.links?.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 transition-colors px-3 py-2 rounded-full text-sm"
              >
                <SocialIcon url={link.url} />
                <span className="inline text-xs">{link.title}</span>
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-3">About</h3>
          <div className="text-gray-600 text-sm sm:text-base whitespace-pre-line">
            {speaker.bio || 'No bio available.'}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-3">Sessions</h3>
          <div className="space-y-3">
            {validSessions.length > 0 ? (
              validSessions.map((session) => (
                <div key={session.id} className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-bold text-gray-900">{session.name}</h4>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No sessions available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const shuffleSpeaker = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const filterFeaturedSpeakers = (speakers) => {
  // Nur Speaker mit ID in preAnnouncedSpeakerIds
  return speakers
    .filter((speaker) => preAnnouncedSpeakerIds.includes(speaker.id))
    .map((speaker) => {
      // Sessions ggf. filtern
      const sessionIds = speakerSessionMap[speaker.id];
      if (sessionIds && Array.isArray(speaker.sessions)) {
        return {
          ...speaker,
          sessions: speaker.sessions.filter((session) =>
            sessionIds.includes(session.id)
          ),
        };
      }
      return speaker;
    });
};

const Speakers = () => {
  const [speakerData, setSpeakerData] = useState([]);
  const [selectedSpeaker, setSelectedSpeaker] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const speakersPerPage = 30;

  useEffect(() => {
    fetch(scriptUrl)
      .then((response) => response.json())
      .then((data) => {
        const shuffledSpeakers = shuffleSpeaker(data);
        setSpeakerData(shuffledSpeakers);
      })
      .catch((error) => console.error('Error:', error));
  }, []);

  // Filtered Speaker List
  const filteredSpeakers = SHOW_FEATURED_ONLY
    ? filterFeaturedSpeakers(speakerData)
    : speakerData;

  // Titel abhängig vom Flag
  const sectionTitle = SHOW_FEATURED_ONLY ? "Featured Speakers" : "Meet Our Speakers";

  // Wenn nicht featured, maximal 10 Speaker anzeigen
  const displaySpeakers = SHOW_FEATURED_ONLY
    ? filteredSpeakers
    : filteredSpeakers.slice(0, 10);

  return (
    <section id="speakers" className="py-12 sm:py-20" style={{marginBottom: "2rem"}}>
      <div className="container mx-auto px-4">
        <h2 className="section-title">{sectionTitle}</h2>

        {filteredSpeakers.length === 0 ? (
          <div className="text-center py-8 sm:py-12">
            <p className="text-gray-600">Loading</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-5 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
              {displaySpeakers.map((speaker) => (
                <SpeakerCard
                  key={speaker.id}
                  speaker={speaker}
                  onClick={() => setSelectedSpeaker(speaker)}
                  showTalk={true}
                />
              ))}
            </div>

            {/* Wenn nicht featured, Button anzeigen */}
            {!SHOW_FEATURED_ONLY && (
              <div style={{marginTop: "3rem"}}>
                 <button
               type="button"
               className="button"
               style={{ cursor: 'pointer' }}
               onClick={() => {
                 window.location.href = '/speakers';
               }}
             >
               All Speakers
             </button>
              </div>
            )}

            {/* Pagination nur für featured */}
            {SHOW_FEATURED_ONLY && filteredSpeakers.length > speakersPerPage && (
              <div className="mt-6 sm:mt-8 flex flex-wrap justify-center gap-2">
                {Array.from({ length: Math.ceil(filteredSpeakers.length / speakersPerPage) }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`rounded-md px-2 sm:px-3 py-1 text-xs sm:text-sm transition-colors duration-200 
                      ${
                        currentPage === i + 1
                          ? 'bg-[#283058] text-white'
                          : 'border border-[#283058] text-[#283058] hover:bg-[#283058] hover:text-white'
                      }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            )}

            <Dialog isOpen={selectedSpeaker !== null} onClose={() => setSelectedSpeaker(null)}>
              {selectedSpeaker && <SpeakerDialog speaker={selectedSpeaker} />}
            </Dialog>
          </>
        )}
      </div>
    </section>
  );
};


export default Speakers;

import React, { useState, useEffect } from 'react';
import { Github, Twitter, Linkedin, Globe, Youtube } from 'lucide-react';

//const scriptUrl = 'https://sessionize.com/api/v2/6dqtqpt2/view/Speakers';
const scriptUrl = 'https://sessionize.com/api/v2/px1o0jp3/view/Speakers'

const findCompanyInfo = (speaker) => {
  const company = speaker.questionAnswers.find((q) => q.question === 'Company');
  return company?.answer || 'Speaker';
};

const SocialIcon = ({ url }) => {
  const iconSize = 24;
  const iconColor = '#283058';

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
      <div className="relative w-full max-w-md rounded-lg bg-white">
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 absolute right-4 top-4"
        >
          ×
        </button>
        {children}
      </div>
    </div>
  );
};

const SpeakerCard = ({ speaker, onClick, showTalk = false, speakerSessionMap = {} }) => {
  const company = findCompanyInfo(speaker);
  const speakerSessions = speakerSessionMap[speaker.id] || [];

  return (
    <div
      onClick={onClick}
      className="w-full cursor-pointer overflow-hidden rounded-lg bg-white shadow-sm transition-all duration-300 hover:shadow-md"
    >
      <div className="relative aspect-square">
        <img
          src={speaker.profilePicture}
          alt={speaker.fullName}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="p-4 text-center">
        <h3 className="truncate text-base font-semibold">{speaker.fullName}</h3>
        <p className="text-gray-600 truncate text-sm mt-1">{company}</p>
        {showTalk && speaker.sessions && speaker.sessions[0] && speakerSessions.includes(speaker.sessions[0].id) && (
          <p className="mt-2 text-sm text-[#283058] font-medium line-clamp-2">
            {speaker.sessions[0].name}
          </p>
        )}
      </div>
    </div>
  );
};

const SpeakerDialog = ({ speaker, speakerSessionMap = {} }) => {
  const company = findCompanyInfo(speaker);
  const speakerSessions = speakerSessionMap[speaker.id] || [];

  return (
    <div className="p-6">
      <div className="mb-6 text-center">
        <h2 className="text-xl font-semibold">{speaker.fullName}</h2>
        <p className="text-gray-600">{company}</p>
      </div>
      <div className="space-y-4">
        <div className="mx-auto h-32 w-32 overflow-hidden rounded-full">
          <img
            src={speaker.profilePicture}
            alt={speaker.fullName}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="max-h-48 overflow-y-auto rounded-md border p-4">
          <p className="text-gray-600 text-sm">{speaker.bio || 'No bio available.'}</p>
        </div>
        {speaker.sessions && speaker.sessions.filter(session => speakerSessions.includes(session.id)).map((session, index) => (
          <div key={index} className="rounded-md border p-4">
            <h3 className="font-semibold mb-2">Talk</h3>
            <p className="text-gray-600 text-sm">{session.name}</p>
          </div>
        ))}
        <div className="flex justify-center space-x-4">
          {speaker.links.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80"
            >
              <SocialIcon url={link.url} />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

const Speakers = () => {
  const [speakerData, setSpeakerData] = useState([]);
  const [selectedSpeaker, setSelectedSpeaker] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showPreAnnounced, setShowPreAnnounced] = useState(false);
  const [showOtherSpeakers, setShowOtherSpeakers] = useState(true);
  const speakersPerPage = 30;

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

  useEffect(() => {
    fetch(scriptUrl)
      .then((response) => response.json())
      .then((data) => {
        const shuffledSpeakers = shuffleSpeaker(data);
        setSpeakerData(shuffledSpeakers);
      })
      .catch((error) => console.error('Error:', error));
  }, []);

  const shuffleSpeaker = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const preAnnouncedSpeakers = speakerData.filter(speaker => 
    preAnnouncedSpeakerIds.includes(speaker.id)
  );

  const otherSpeakers = speakerData.filter(speaker => 
    !preAnnouncedSpeakerIds.includes(speaker.id)
  );

  const indexOfLastSpeaker = currentPage * speakersPerPage;
  const indexOfFirstSpeaker = indexOfLastSpeaker - speakersPerPage;
  const currentSpeakers = otherSpeakers.slice(indexOfFirstSpeaker, indexOfLastSpeaker);
  const totalPages = Math.ceil(otherSpeakers.length / speakersPerPage);

  return (
    <div className="mx-auto max-w-7xl p-4" id="speakers">
      <h2 className="section-title mb-8">{showPreAnnounced ? "Featured Speakers" : "Speakers"}</h2>

      {speakerData.length === 0 ? (
        <div className="flex h-32 items-center justify-center">
          <p className="text-gray-600 text-lg">Coming soon...</p>
        </div>
      ) : (
        <>
          {/* Pre-announced Speakers Section */}
          {showPreAnnounced && preAnnouncedSpeakers.length > 0 && (
            <div className="mb-12">
              <div className="grid grid-cols-1 gap-6 2xl:grid-cols-5 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
                {preAnnouncedSpeakers.map((speaker) => (
                  <SpeakerCard
                    key={speaker.id}
                    speaker={speaker}
                    onClick={() => setSelectedSpeaker(speaker)}
                    showTalk={false}
                    speakerSessionMap={speakerSessionMap}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Other Speakers Section */}
          {showOtherSpeakers && (
            <>
              <div className="grid grid-cols-1 gap-6 2xl:grid-cols-6 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
                {currentSpeakers.map((speaker) => (
                  <SpeakerCard
                    key={speaker.id}
                    speaker={speaker}
                    onClick={() => setSelectedSpeaker(speaker)}
                    speakerSessionMap={speakerSessionMap}
                  />
                ))}
              </div>

              {otherSpeakers.length > speakersPerPage && (
                <div className="mt-8 flex flex-wrap justify-center gap-2">
                  {Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`rounded-md px-3 py-1 text-sm transition-colors duration-200 
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
            </>
          )}

          <Dialog isOpen={selectedSpeaker !== null} onClose={() => setSelectedSpeaker(null)}>
            {selectedSpeaker && <SpeakerDialog speaker={selectedSpeaker} speakerSessionMap={speakerSessionMap} />}
          </Dialog>
        </>
      )}
    </div>
  );
};

export default Speakers;

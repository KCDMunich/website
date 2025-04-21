import React, { useState, useEffect } from 'react';
import { Github, Twitter, Linkedin, Globe, Youtube } from 'lucide-react';

//const scriptUrl = 'https://sessionize.com/api/v2/6dqtqpt2/view/Speakers';
const scriptUrl = 'https://sessionize.com/api/v2/px1o0jp3/view/Speakers'

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
  const firstTwoLinks = speaker.links?.slice(0, 2) || [];

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl overflow-hidden shadow-lg transform hover:-translate-y-2 transition-transform duration-300 group cursor-pointer h-full flex flex-col"
    >
      <div className="relative overflow-hidden">
        <img
          src={speaker.profilePicture}
          alt={speaker.fullName}
          className="w-full h-auto group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
          <div className="p-4">
            <div className="flex gap-2 mb-2">
              {firstTwoLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/20 p-2 rounded-full hover:bg-white/40 transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  <SocialIcon url={link.url} isWhite={true} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="p-4 text-center flex flex-col flex-grow">
        <h3 className="font-bold text-lg text-gray-900">{speaker.fullName}</h3>
        <p className="text-[#283058] text-sm font-medium">{company}</p>
        <div className="mt-2 bg-gray-50 p-2 rounded-lg">
          {showTalk && speaker.sessions && speaker.sessions[0] && speakerSessions.includes(speaker.sessions[0].id) ? (
            <div>
              <p className="text-xs text-[#283058] font-medium mb-1">SESSION</p>
              <p className="text-sm text-gray-800 line-clamp-2 font-medium">
                {speaker.sessions[0].name}
              </p>
            </div>
          ) : (
            <p className="text-sm text-gray-600">Sessions coming soon</p>
          )}
        </div>
      </div>
    </div>
  );
};

const SpeakerDialog = ({ speaker, speakerSessionMap = {} }) => {
  const company = findCompanyInfo(speaker);
  const speakerSessions = speakerSessionMap[speaker.id] || [];

  return (
    <div className="p-6">
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <div className="rounded-lg overflow-hidden mb-4">
            <img
              src={speaker.profilePicture}
              alt={speaker.fullName}
              className="w-full h-auto"
            />
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-gray-700">{company}</span>
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              {speaker.links?.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 transition-colors px-3 py-2 rounded-full text-sm"
                >
                  <SocialIcon url={link.url} />
                  {link.title}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="md:col-span-2">
          <h3 className="text-xl font-bold mb-3">About</h3>
          <p className="text-gray-700 mb-6 leading-relaxed">{speaker.bio || 'No bio available.'}</p>
          <h3 className="text-xl font-bold mb-3">Sessions</h3>
          <div className="space-y-3">
            {speaker.sessions && speaker.sessions.filter(session => speakerSessions.includes(session.id)).map((session, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-bold text-gray-900">{session.name}</h4>
              </div>
            ))}
          </div>
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
    <section id="speakers" className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Meet Our Speakers</h2>
          <div className="w-20 h-1 bg-[#283058] mx-auto mb-6 rounded-full"></div>
          <p className="text-xl text-gray-600 leading-relaxed">Industry experts sharing knowledge and insights</p>
        </div>

        {speakerData.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No speakers found.</p>
          </div>
        ) : (
          <>
            {/* Pre-announced Speakers Section */}
            {showPreAnnounced && preAnnouncedSpeakers.length > 0 && (
              <div className="mb-12">
                <div className="grid grid-cols-5 gap-6">
                  {preAnnouncedSpeakers.map((speaker) => (
                    <SpeakerCard
                      key={speaker.id}
                      speaker={speaker}
                      onClick={() => setSelectedSpeaker(speaker)}
                      showTalk={true}
                      speakerSessionMap={speakerSessionMap}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Other Speakers Section */}
            {showOtherSpeakers && (
              <>
                <div className="grid grid-cols-5 gap-6">
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
    </section>
  );
};

export default Speakers;

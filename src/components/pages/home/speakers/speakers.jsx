import React, { useEffect, useState } from 'react';
import LINKS from 'constants/links';
import { SocialIcon } from 'react-social-icons';
import ReactCardFlip from 'react-card-flip';
import { isMobile } from 'react-device-detect';

const TITLE = 'Speakers';
const scriptUrl = 'https://sessionize.com/api/v2/6dqtqpt2/view/Speakers';

const Speakers = () => (
  <section className="safe-paddings relative bg-white pb-40 2xl:pb-32 lg:pb-32 sm:py-16">
    <div className="container lg:mt-38 2xl:mt-38 mt-40 flex justify-between 2xl:flex-col xl:mt-32 lg:flex-col md:mt-24">
      <div className="text-primary-1 2xl:flex 2xl:flex-col 2xl:items-center 2xl:justify-center lg:flex lg:flex-col lg:items-center lg:justify-center lg:text-center">
        <h2
          className="text-center text-6xl font-bold leading-tight lg:max-w-[800px]"
          id={LINKS.schedule.id}
        >
          {TITLE}
        </h2>
        <br />
        <div className="w-full ">
          <SpeakerComponent />
        </div>
      </div>
    </div>
  </section>
);

const SpeakerComponent = () => {
  const [speakerData, setSpeakerData] = useState([]);

  useEffect(() => {
    fetch(scriptUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.length > 0) {
          const speakersWithFlipState = data.map((speaker) => ({
            ...speaker,
            isFlipped: false,
            canFlip: speaker.links.length > 0 || findCompany(speaker) != null,
          }));
          const shuffledSpeaker = shuffleSpeaker(speakersWithFlipState);
          setSpeakerData(shuffledSpeaker);
        } else {
          setSpeakerData([]);
        }
      })
      .catch((error) => console.error('Error:', error));
  }, []);

  const handleClick = (id) => {
    setSpeakerData(
      speakerData.map((speaker) => {
        if (speaker.id === id && speaker.canFlip) {
          return { ...speaker, isFlipped: !speaker.isFlipped };
        }
        return speaker;
      })
    );
  };

  const shuffleSpeaker = (array) => {
    let currentIndex = array.length,
      randomIndex;

    while (currentIndex > 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
  };

  const findCompany = (speaker) => {
    const company = speaker.questionAnswers.find((q) => q.question === 'Company');
    return company.answer;
  };

  return (
    <div className="flex h-full w-full items-center justify-center">
      {speakerData.length === 0 ? (
        <div
          className="flex items-center justify-center"
          style={{ height: '40px', width: '100%', paddingTop: '54px' }}
        >
          <span className="justify-center text-center text-xl font-semibold">Coming soon...</span>
        </div>
      ) : (
        <div
          className="flex flex-row flex-wrap justify-around overflow-auto scrollbar-hide"
          style={{ height: '55vh' }}
        >
          {speakerData.map((speaker) => (
            <div
              className="flex flex-col items-center justify-between p-4"
              style={{
                marginBottom: '40px',
                maxWidth: '190px',
                minWidth: '190px',
                height: '220px',
              }}
            >
              <ReactCardFlip
                key={speaker.id}
                isFlipped={speaker.isFlipped}
                flipDirection="horizontal"
                flipSpeedBackToFront="0.3"
                flipSpeedFrontToBack="0.3"
              >
                <img
                  onClick={() => isMobile && handleClick(speaker.id)}
                  onMouseEnter={() => !isMobile && handleClick(speaker.id)}
                  src={speaker.profilePicture}
                  alt={speaker.fullName}
                  className="front w-full cursor-pointer rounded-md object-cover"
                  style={{
                    height: '160px',
                  }}
                />
                <div
                  onClick={() => isMobile && handleClick(speaker.id)}
                  onMouseLeave={() => !isMobile && handleClick(speaker.id)}
                  className="back flex cursor-pointer flex-col justify-between rounded-md"
                  style={{
                    height: '160px',
                    borderBottom: 'solid 3px #5f6ab5',
                    width: '153px',
                    backgroundColor: '#262f5908',
                  }}
                >
                  <div>
                    {speaker.links.length > 0 ? (
                      speaker.links.slice(0, 5).map((link, index) => (
                        <a key={index} href={link.url} target="_blank" rel="noopener noreferrer">
                          <SocialIcon url={link.url} bgColor="transparent" fgColor="#262f59" />
                        </a>
                      ))
                    ) : (
                      <div></div>
                    )}
                  </div>
                  <div style={{ padding: '10px', marginTop: 'auto' }}>
                    <span className="flex justify-center text-center text-sm font-bold">
                      {findCompany(speaker)}
                    </span>
                  </div>
                </div>
              </ReactCardFlip>
              <div
                className="flex flex-col items-center"
                style={{
                  paddingTop: '5px',
                }}
              >
                <span className="w-full items-center truncate text-sm font-bold">
                  {speaker.fullName}
                </span>
              </div>
              <div
                className="mt-auto w-full"
                style={{
                  padding: '0 4px',
                }}
              >
                <div
                  className="overflow-hidden text-ellipsis text-center italic"
                  style={{
                    height: '3em',
                    display: '-webkit-box',
                    WebkitLineClamp: '3',
                    WebkitBoxOrient: 'vertical',
                    fontSize: 'small',
                  }}
                >
                  {speaker.tagLine}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Speakers;

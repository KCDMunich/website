/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import ReactCardFlip from 'react-card-flip';
import { isMobile } from 'react-device-detect';
import { SocialIcon } from 'react-social-icons';

const scriptUrl = 'https://sessionize.com/api/v2/6dqtqpt2/view/Speakers';

const Speakers = () => (
  <section className="safe-paddings relative bg-white pb-40 lg:pb-32 md:py-24 sm:py-16">
    <div className="container flex justify-between lg:flex-col">
      <div className="text-primary-1 lg:flex lg:flex-col lg:items-center lg:justify-center lg:text-center">
        <br />
        <div
          className=" w-full overflow-auto scrollbar-hide"
          style={{ border: 'solid orange', height: '500vh' }}
        >
          <DangerComponent />
        </div>
      </div>
    </div>
  </section>
);

const DangerComponent = () => {
  const [speakerData, setSpeakerData] = useState([]);

  useEffect(() => {
    fetch(scriptUrl)
      .then((response) => response.json())
      .then((data) => {
        const speakersWithFlipState = data.map((speaker) => ({
          ...speaker,
          isFlipped: false,
        }));
        const shuffledSpeaker = shuffleSpeaker(speakersWithFlipState);
        setSpeakerData(shuffledSpeaker);
      })
      .catch((error) => console.error('Error:', error));
  }, []);

  const handleClick = (id) => {
    setSpeakerData(
      speakerData.map((speaker) => {
        if (speaker.id === id) {
          return { ...speaker, isFlipped: !speaker.isFlipped };
        }
        return speaker;
      })
    );
  };

  const trimText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength - 3) + '...';
    } else {
      return text;
    }
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
    <div className="flex flex-row flex-wrap justify-around">
      {speakerData.map((speaker) => (
        <div className="pb-5 shadow-sm">
          <ReactCardFlip
            key={speaker.id}
            isFlipped={speaker.isFlipped}
            flipDirection="horizontal"
            flipSpeedBackToFront="0.3"
            flipSpeedFrontToBack="0.3"
          >
            <div
              onClick={() => isMobile && handleClick(speaker.id)}
              onMouseEnter={() => !isMobile && handleClick(speaker.id)}
              className="front flex flex-col items-center justify-between rounded-md p-4"
              style={{
                width: '342px',
                height: '396px',
                backgroundColor: '#262f5908',
                border: 'solid green',
              }}
            >
              <img
                src={speaker.profilePicture}
                alt={speaker.fullName}
                className="front w-full cursor-pointer rounded-md object-cover"
                style={{
                  height: '288px',
                }}
              />
              <div className="flex flex-col items-center justify-between">
                <span className="pt-0 text-lg font-bold">{speaker.fullName}</span>
                <span className="my-auto flex w-full justify-center truncate text-center text-sm">
                  {trimText(speaker.tagLine, 40)}
                </span>
              </div>
            </div>
            <div
              className="back flex flex-col items-center justify-between rounded-md"
              onClick={() => isMobile && handleClick(speaker.id)}
              onMouseLeave={() => !isMobile && handleClick(speaker.id)}
              style={{
                width: '342px',
                height: '396px',
                backgroundColor: '#262f5908',
                border: 'solid purple',
              }}
            >
              <div
                className="flex h-4/6 w-full flex-col p-5 text-center"
                style={{ lineHeight: '30px', border: 'solid purple' }}
              >
                {trimText(speaker.bio, 225)}
              </div>
            </div>
          </ReactCardFlip>
        </div>
      ))}
    </div>
  );
};

export default Speakers;

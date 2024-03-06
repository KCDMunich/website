/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { SocialIcon } from 'react-social-icons';
import speakerJSON from './speaker.json'; //Daten aus der speaker.json
import './speakers.css';
const scriptUrl = 'https://sessionize.com/api/v2/6dqtqpt2/view/Speakers';

const Speakers = () => (
  <section className="safe-paddings relative bg-white pb-40 2xl:pb-32 lg:pb-32 md:py-24 sm:py-16">
    <div className="container flex justify-between 2xl:flex-col lg:flex-col">
      <div className="text-primary-1 2xl:flex 2xl:flex-col 2xl:items-center 2xl:justify-center lg:flex lg:flex-col lg:items-center lg:justify-center lg:text-center">
        <br />
        <div className=" w-full">
          <SpeakerComponent />
        </div>
      </div>
    </div>
  </section>
);

const SpeakerComponent = () => {
  const [speakerData, setSpeakerData] = useState([]);

  //Speaker aus der api fetchen
  // useEffect(() => {
  //   fetch(scriptUrl)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       const speakersWithFlipState = data.map((speaker) => ({
  //         ...speaker,
  //         isFlipped: false,
  //       }));
  //       const shuffledSpeaker = shuffleSpeaker(speakersWithFlipState);
  //       setSpeakerData(shuffledSpeaker);
  //     })
  //     .catch((error) => console.error('Error:', error));
  // }, []);

  useEffect(() => {
    // aus der speaker.json
    const speakersWithFlipState = speakerJSON.map((speaker) => ({
      ...speaker,
      isFlipped: false,
    }));
    const shuffledSpeaker = shuffleSpeaker(speakersWithFlipState);
    setSpeakerData(shuffledSpeaker);
  }, []);

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

  const getSpeakerProfile = (speaker) => {
    const link = speaker.links.find((l) => l.title === 'Sessionize');
    if (link && link.url) {
      return (
        <div>
          /
          <a href={link.url} style={{ color: '#1800d4' }}>
            about me
          </a>
        </div>
      );
    }
    return <div></div>;
  };

  const findCompany = (speaker) => {
    const company = speaker.questionAnswers.find((q) => q.question === 'Company');
    if (company && company.answer) {
      return company.answer;
    } else {
      return 'Speaker';
    }
  };
  const findCompanyFrontside = (speaker) => {
    const company = speaker.questionAnswers.find((q) => q.question === 'Company');
    if (company && company.answer) {
      return company.answer;
    } else {
      return;
    }
  };

  return (
    <div className="flex w-full items-center justify-center">
      {speakerData.length === 0 ? (
        <div className="flex items-center justify-center" style={{ height: '90px', width: '100%' }}>
          <p className="text-lg leading-normal text-primary-1">Coming soon...</p>
        </div>
      ) : (
        <div className="flex flex-row flex-wrap justify-around  overflow-auto scrollbar-hide">
          {speakerData.map((speaker) => (
            <div className="pb-5 pr-1" key={speaker.id}>
              <div
                className="flip-card rounded-md bg-transparent"
                style={{ width: '275px', height: '290px' }}
              >
                <div
                  className="flip-card-inner relative h-full w-full rounded-md text-center"
                  style={{ transition: 'transform 0.4s', transformStyle: 'preserve-3d' }}
                >
                  <div className="flip-card-front rounded-md">
                    <div
                      className="flex h-full w-full flex-row-reverse"
                      style={{ position: 'relative', zIndex: '1' }}
                    >
                      <img
                        src={speaker.profilePicture}
                        alt={speaker.fullName}
                        className="h-full w-full cursor-pointer rounded-md object-cover"
                      />
                      <div
                        className="absolute bottom-0  w-full "
                        style={{
                          color: 'whitesmoke',
                          borderRadius: '0',
                        }}
                      >
                        <div className="text-tag px-2 text-center" style={{ borderRadius: '0' }}>
                          {speaker.fullName}
                        </div>
                        <div className="text-tag px-2 text-center" style={{ borderRadius: '0' }}>
                          {findCompany(speaker)}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flip-card-back flex flex-col justify-between rounded-md">
                    <div
                      className="flex h-1/6 w-full flex-col items-center justify-center"
                      style={{ paddingTop: '4px' }}
                    >
                      <span className="w-full px-1 text-center text-lg font-bold">
                        {findCompany(speaker)}
                      </span>

                      <span
                        className=" w-full truncate px-7 text-sm "
                        style={{
                          textDecoration: 'underline',
                          textDecorationColor: '#283058',
                          textDecorationThickness: '1px',
                        }}
                      >
                        {speaker.tagLine}
                      </span>
                    </div>
                    <div className="flex h-3/6 w-full flex-col items-center">
                      <span
                        className="speaker-bio w-full overflow-hidden px-3 text-lg italic"
                        style={{
                          lineHeight: '37px',
                          height: '100%',
                          scale: '0.8',
                          paddingTop: '7px',
                        }}
                      >
                        {speaker.bio}
                      </span>
                    </div>
                    <div className="flex h-1/6 items-center justify-center px-1 text-center text-base ">
                      {speaker.firstName}
                      {getSpeakerProfile(speaker)}
                    </div>
                    <div
                      className="flex h-1/6 w-full items-center justify-center gap-x-0.5"
                      style={{ paddingBottom: '5px' }}
                    >
                      {speaker.links.length > 0 ? (
                        speaker.links.slice(0, 3).map((link, index) => (
                          <i key={index} href={link.url} target="_blank" rel="noopener noreferrer">
                            <SocialIcon url={link.url} bgColor="transparent" fgColor="#283058" />
                          </i>
                        ))
                      ) : (
                        <div></div>
                      )}
                    </div>
                  </div>
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

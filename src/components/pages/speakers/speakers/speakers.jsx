/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import ReactCardFlip from 'react-card-flip';
import { isMobile } from 'react-device-detect';
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

const DangerComponent = () => {
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
    if (company && company.answer) {
      return (
        <span
          className="tex-4xl truncate text-center"
          style={{
            textDecoration: 'underline',
            textDecorationColor: 'whitesmoke',
            textDecorationThickness: '1px',
          }}
        >
          {company.answer}
        </span>
      );
    } else {
      return <div style={{ height: '20px' }}></div>;
    }
  };

  return (
    <div className="flex flex-row flex-wrap justify-around">
      {speakerData.map((speaker) => (
        <div className="card-container pb-5 shadow-sm" key={speaker.id}>
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
                backgroundColor: '#e0e4e7',
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
              className="back flex flex-col items-center rounded-md"
              onClick={() => isMobile && handleClick(speaker.id)}
              onMouseLeave={() => !isMobile && handleClick(speaker.id)}
              style={{
                width: '342px',
                height: '396px',
                backgroundColor: '#283058',
                color: 'whitesmoke',
                justifyContent: 'space-between',
                paddingBottom: '18px',
              }}
            >
              <div className="flex h-2/6 w-full flex-col items-center justify-center" style={{}}>
                <span className="text-center text-xl font-bold">{speaker.fullName}</span>
                {findCompany(speaker)}
              </div>
              <div
                className="flex h-3/6 w-full flex-col px-5 text-center"
                style={{ lineHeight: '30px' }}
              >
                {trimText(speaker.bio, 190)}
              </div>
              <div className="flex h-1/6 w-full items-center justify-center gap-x-0.5">
                {speaker.links.length > 0 ? (
                  speaker.links.slice(0, 3).map((link, index) => (
                    <a key={index} href={link.url} target="_blank" rel="noopener noreferrer">
                      <SocialIcon url={link.url} bgColor="transparent" fgColor="white" />
                    </a>
                  ))
                ) : (
                  <div></div>
                )}
              </div>
            </div>
          </ReactCardFlip>
        </div>
      ))}
    </div>
  );
};

const SpeakerComponent = () => {
  const [speakerData, setSpeakerData] = useState([]);

  useEffect(() => {
    // aus der speaker.json
    const speakersWithFlipState = speakerJSON.map((speaker) => ({
      ...speaker,
      isFlipped: false,
    }));
    const shuffledSpeaker = shuffleSpeaker(speakersWithFlipState);
    setSpeakerData(shuffledSpeaker);
  }, []);

  const handleFlip = (id) => {
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
    if (company && company.answer) {
      return (
        <span
          className="tex-4xl truncate text-center"
          style={{
            textDecoration: 'underline',
            textDecorationColor: 'whitesmoke',
            textDecorationThickness: '1px',
          }}
        >
          {company.answer}
        </span>
      );
    } else {
      return <div style={{ height: '20px' }}></div>;
    }
  };

  return (
    <div className="flex w-full items-center justify-center">
      {speakerData.length === 0 ? (
        <div
          className="flex items-center justify-center"
          style={{ height: '90px', width: '100%', border: 'solid orange' }}
        >
          <p className="text-lg leading-normal text-primary-1">Coming soon...</p>
        </div>
      ) : (
        <div
          className="flex flex-row flex-wrap justify-around  overflow-auto scrollbar-hide"
          style={{ height: '500vh' }}
        >
          {speakerData.map((speaker) => (
            <div className="pb-5" key={speaker.id}>
              <div className="flip-card">
                <div className="flip-card-inner">
                  <div className="flip-card-front rounded-md">
                    <img
                      src={speaker.profilePicture}
                      alt={speaker.fullName}
                      className="w-full cursor-pointer rounded-md object-cover"
                      style={{
                        height: '325px',
                        padding: '10px',
                      }}
                    />
                    <div className="flex flex-col items-center justify-between">
                      <span className="pt-0 text-lg font-bold">{speaker.fullName}</span>
                      <span className="my-auto flex w-full justify-center truncate text-center text-sm">
                        {trimText(speaker.tagLine, 40)}
                      </span>
                    </div>
                  </div>
                  <div className="flip-card-back justify-between rounded-md pb-5">
                    <div
                      className="flex h-2/6 w-full flex-col items-center justify-center"
                      style={{}}
                    >
                      <span className="text-center text-xl font-bold">{speaker.fullName}</span>
                      {findCompany(speaker)}
                    </div>
                    <div
                      className="flex h-3/6 w-full flex-col px-5 text-center"
                      style={{ lineHeight: '30px' }}
                    >
                      {trimText(speaker.bio, 190)}
                    </div>
                    <div className="flex h-1/6 w-full items-center justify-center gap-x-0.5">
                      {speaker.links.length > 0 ? (
                        speaker.links.slice(0, 3).map((link, index) => (
                          <div
                            key={index}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <SocialIcon url={link.url} bgColor="transparent" fgColor="white" />
                          </div>
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

/*

      <div class="flip-card">
        <div class="flip-card-inner">
          <div class="flip-card-front">
            <span>hallo</span>
          </div>
          <div class="flip-card-back">
            <h1>John Doe</h1>
            <p>Architect & Engineer</p>
            <p>We love that guy</p>
          </div>
        </div>
      </div>
*/
export default Speakers;

import React, { useEffect, useState } from 'react';
import LINKS from 'constants/links';
import { SocialIcon } from 'react-social-icons';
import speakersJSON from './speaker2.json'; //speaker aus json 2
import './speakers3.css';

const TITLE = 'Speakers';
const scriptUrl = 'https://sessionize.com/api/v2/6dqtqpt2/view/Speakers';

const Speakers = () => (
  <section className="safe-paddings relative bg-white  2xl:pb-20 md:pb-20 sm:pb-20">
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
          <DangerComponent1 />
        </div>
      </div>
    </div>
  </section>
);

const DangerComponent1 = () => {
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

  // useEffect(() => {
  //   if (speakersJSON && speakersJSON.length > 0) {
  //     const speakersWithFlipState = speakersJSON.map((speaker) => ({
  //       ...speaker,
  //       isFlipped: false,
  //       canFlip: speaker.links.length > 0 || findCompany(speaker) != null,
  //     }));
  //     const shuffledSpeaker = shuffleSpeaker(speakersWithFlipState);
  //     setSpeakerData(shuffledSpeaker);
  //   } else {
  //     setSpeakerData([]);
  //   }
  // }, []);

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
        <div className="flex items-center justify-center" style={{ height: '90px', width: '100%' }}>
          <p className="text-lg leading-normal text-primary-1" style={{ marginTop: '7vh' }}>
            Coming soon...
          </p>
        </div>
      ) : (
        <div
          className="flex flex-row flex-wrap justify-around overflow-auto scrollbar-hide"
          style={{ height: 'fit-content' }}
        >
          {speakerData.map((speaker) => (
            <div className="flex flex-col p-4" key={speaker.id}>
              <div className="card">
                <div className="card-inner">
                  <div className="card-front rounded-md">
                    <img
                      src={speaker.profilePicture}
                      alt={speaker.fullName}
                      className="w-full cursor-pointer rounded-lg object-cover"
                    />
                  </div>
                  <div
                    className="card-back flex flex-col justify-between rounded-lg"
                    style={{ borderBottom: 'solid 3px #5f6ab5' }}
                  >
                    <div>
                      {speaker.links.length > 0 ? (
                        speaker.links.slice(0, 5).map((link, index) => (
                          <i key={index} href={link.url} target="_blank" rel="noopener noreferrer">
                            <SocialIcon
                              url={link.url}
                              bgColor="transparent"
                              fgColor="#262f59"
                              style={{ size: '30px' }}
                            />
                          </i>
                        ))
                      ) : (
                        <div></div>
                      )}
                    </div>
                    <div style={{ width: '100%', marginBottom: '10px' }}>
                      <span className="font-semibold">{findCompany(speaker)}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="flex  items-center justify-center font-bold"
                style={{ width: '190px', height: '30px' }}
              >
                <span className="flex truncate text-sm">{speaker.fullName}</span>
              </div>
              <div
                className="flex  items-center justify-center "
                style={{ width: '190px', height: '35px', marginTop: '-10px' }}
              >
                <span className="truncate  text-xs italic">{speaker.tagLine}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Speakers;

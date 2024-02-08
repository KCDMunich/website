import React, { useEffect, useState } from 'react';
import LINKS from 'constants/links';
import { SocialIcon } from 'react-social-icons';
import ReactCardFlip from "react-card-flip";

const TITLE = 'Speakers';
const scriptUrl = 'https://sessionize.com/api/v2/6dqtqpt2/view/Speakers';

const Speakers = () => (
  <section className="safe-paddings relative bg-white pb-40 lg:pb-32 sm:py-16">
    <div className="container lg:mt-38 mt-40 flex justify-between xl:mt-32 lg:flex-col md:mt-24">
      <div className="text-primary-1 lg:flex lg:flex-col lg:items-center lg:justify-center lg:text-center">
        <h2
          className="text-6xl font-bold leading-tight lg:max-w-[800px]"
          id={LINKS.schedule.id}
        >
          {TITLE}
        </h2>
        <br />
        <div className='scrollbar-hide' style={{ height: '55vh', overflow: 'auto' }}>
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
        const speakersWithFlipState = data.map(speaker => ({
          ...speaker,
          isFlipped: false
        }));
        setSpeakerData(speakersWithFlipState);
      })
      .catch((error) => console.error('Error:', error));
  }, []);

  const handleClick = (id) => {
    setSpeakerData(speakerData.map(speaker => {
      if (speaker.id === id) {
        return { ...speaker, isFlipped: !speaker.isFlipped };
      }
      return speaker;
    }));
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
      }}
    >
      {speakerData.map((speaker) => (
        <ReactCardFlip key={speaker.id} isFlipped={speaker.isFlipped} flipDirection="horizontal">
          <div
            onClick={() => handleClick(speaker.id)}
            className="p-4 front"
            style={{
              marginRight: '1px',
              marginBottom: '40px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              maxWidth: '190px',
              minWidth: '190px',
              height: '200px', 
            }}
          >
            <img
              src={speaker.profilePicture}
              alt={speaker.fullName}
              className="rounded-md"
              style={{
                width: '100%',
                objectFit: 'cover',
                height: '150px',
              }}
            />
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                paddingTop: '5px', 
              }}
            >
              <span className='font-bold text-sm' style={{ textAlign: 'center', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: '100%' }}>{speaker.fullName}</span>
            </div>
            <div
              style={{
                marginTop: 'auto',
                width: '100%',
                padding: '0 4px',
              }}
            >
              <div style={{ height: '3em', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: '3', WebkitBoxOrient: 'vertical', textAlign: 'center', fontStyle: 'italic', fontSize: 'small', paddingTop: '0px' }}> 
                {speaker.tagLine}
              </div>
            </div>
          </div>
          <div onClick={() => handleClick(speaker.id)} className="back" 
          style={{ textAlign: 'center',marginRight: '1px',
              border: 'solid #262f59',
              marginBottom: '40px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              maxWidth: '190px',
              minWidth: '190px',
              height: '200px',  }}>
            {speaker.links.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <SocialIcon url={link.url} bgColor="transparent" fgColor="#262f59" style={{ height: '50px', width: '50px', margin: '10px' }} />
                <span>{link.TITLE}</span>
              </a>
            ))}
            <span className='font-bold text-sm' style={{ textAlign: 'center', width: '100%' }}>{speaker.questionAnswers.answer}</span>
          </div>
        </ReactCardFlip>
      ))}
    </div>
  );
};

export default Speakers;

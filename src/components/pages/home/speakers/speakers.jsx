import React, { useEffect, useState } from 'react';

import LINKS from 'constants/links';

const TITLE = 'Speakers';

const scriptUrl = 'https://sessionize.com/api/v2/0vfanw5s/view/Speakers';

import { SocialIcon } from 'react-social-icons';

const Speakers = () => (
  <section className="safe-paddings relative bg-white pb-40 lg:pb-32 sm:py-16">
    <div className="container lg:mt-38 mt-40 flex justify-between xl:mt-32 lg:flex-col md:mt-24">
      <div className="text-primary-1 lg:flex lg:flex-col lg:items-center lg:justify-center lg:text-center">
        <h2
          className="min-w-[428px] max-w-[428px] text-6xl font-bold leading-tight lg:min-w-0 lg:max-w-[800px]"
          id={LINKS.schedule.id}
        >
          {TITLE}
        </h2>
        <br />
        <div style={{ height: ' 55vh', overflow: 'auto' }}>
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
      .then((data) => setSpeakerData(data))
      .catch((error) => console.error('Error:', error));
  }, []);

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
        <div
          key={speaker.id}
          className=" w-1/6 p-4"
          style={{
            backgroundColor: '#f5f5f5',
            borderRadius: '0 0 10px 10px',
            marginRight: '1px',
            marginBottom: '10px',
          }}
        >
          <img src={speaker.profilePicture} alt={speaker.fullName} className="rounded-md" />
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              paddingTop: '10px',
            }}
          >
            <span>{speaker.fullName}</span>
            <div className="mt-2">
              {speaker.links.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  <SocialIcon url={link.url} bgColor="transparent" fgColor="#262f59" />
                </a>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Speakers;

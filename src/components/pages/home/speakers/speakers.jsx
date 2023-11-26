import React, { useEffect, useState } from 'react';

import LINKS from 'constants/links';

const TITLE = 'Speakers';

const scriptUrl = 'https://sessionize.com/api/v2/t71l7ld5/view/SpeakerWall';

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
        <SpeakerComponent />
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
        <div key={speaker.id} className=" w-1/4 p-4">
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
            <span>{speaker.tagLine}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Speakers;

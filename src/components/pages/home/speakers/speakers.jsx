import React from 'react';

import LINKS from 'constants/links';

const TITLE = 'Speakers';

const scriptUrl = 'https://sessionize.com/api/v2/cos5nif6/view/SpeakerWall';

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
        <DangerComponent />
      </div>
    </div>
  </section>
);

const DangerComponent = () => {
  return (
    <iframe
      title="External Script"
      srcDoc={`<script src="${scriptUrl}"></script>`}
      border="0"
      width="300%"
      height="600px"
    />
  );
};

export default Speakers;

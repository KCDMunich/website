import React from 'react';

import LINKS from 'constants/links';

const TITLE = 'Speakers';

function createMarkup() {
  return {__html: `
<script type="text/javascript" src="https://sessionize.com/api/v2/cos5nif6/view/SpeakerWall"></script>
`}; // end of a multi-line string
}

const Speakers = () => (
  <section className="safe-paddings relative bg-white pb-40 lg:pb-32 md:py-24 sm:py-16">
    <div className="container flex justify-between lg:flex-col">
      <div className="text-primary-1 lg:flex lg:flex-col lg:items-center lg:justify-center lg:text-center">
        <h2
          className="min-w-[428px] max-w-[428px] text-6xl font-bold leading-tight lg:min-w-0 lg:max-w-[800px]"
          id={LINKS.schedule.id}
        >
          {TITLE}
        </h2>
        <br/>
          <DangerComponent />
    </div>
    </div>
  </section>
);

function DangerComponent() {
  return <div dangerouslySetInnerHTML={createMarkup()} />;
}

export default Speakers;
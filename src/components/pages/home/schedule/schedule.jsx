import React from 'react';

import Button from 'components/shared/button';
import LINKS from 'constants/links';

import illustration from './images/schedule.png';

const TITLE = 'Schedule';

const DESCRIPTION =
  "Get ready for action-packed days. With two tracks and more than 45 sessions to choose from, you'll have plenty of opportunities to learn from experts in the field.";

const Schedule = () => (
  <section className="safe-paddings relative bg-white pb-40 lg:pb-32 md:py-24 sm:py-16">
    <div className="container flex justify-between lg:flex-col">
      <div className="text-primary-1 lg:flex lg:flex-col lg:items-center lg:justify-center lg:text-center">
        <h2
          className="min-w-[428px] max-w-[428px] text-6xl font-bold leading-tight lg:min-w-0 lg:max-w-[800px]"
          id={LINKS.schedule.id}
        >
          {TITLE}
        </h2>
        <p className="mt-5 max-w-[488px] text-lg leading-normal lg:max-w-[650px]">{DESCRIPTION}</p>
        <Button className="mt-7 text-white" to="/schedule" theme="blue" size="lg" target="_blank">
          View full schedule
        </Button>
      </div>
      <img
        className="mr-16 mt-12 h-[238px] w-[520px] xl:ml-10 lg:mx-auto lg:h-auto sm:max-h-[200px]"
        src={illustration}
        width="auto"
        height="auto"
        loading="lazy"
        alt=""
      />
    </div>
  </section>
);

export default Schedule;

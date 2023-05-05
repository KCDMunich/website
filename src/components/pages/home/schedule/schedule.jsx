import React from 'react';

import Button from 'components/shared/button';
import LINKS from 'constants/links';

import illustration from './images/section-illustration.svg';

const TITLE = 'Schedule';

const DESCRIPTION =
  "Get ready for an action-packed days. With two tracks and more than 38 sessions to choose from, you'll have plenty of opportunities to learn from experts in the field. The whole event will be held in English.";

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
        <Button
          className="mt-7 text-white"
          to="https://www.eventbrite.de/e/kubernetes-community-days-munich-2023-tickets-526260839337"
          theme="blue"
          size="lg"
          target="_blank"
        >
          Get your ticket
        </Button>
      </div>
      <img
        className="mt-12 mr-16 h-[238px] w-[520px] xl:ml-10 lg:mx-auto lg:h-auto sm:max-h-[200px]"
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

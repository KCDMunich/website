import React from 'react';

import Button from 'components/shared/button';

const TITLE = 'Speaker Lineup';
const DESCRIPTION =
  "Meet our fantastic speakers and learn from their experience. The whole event will be held in English.";

const Hero = () => (
  <section className="safe-paddings pt-24 pb-10 lg:pt-[4.5rem] md:pt-16 md:pb-4 sm:py-8">
    <div className="container mt-4 text-center text-primary-1 sm:px-7">
      <h1
        className="text-6xl font-bold leading-denser tracking-[-0.01em] md:text-4xl"
        dangerouslySetInnerHTML={{ __html: TITLE }}
      />
      <p className="mx-auto mt-9 max-w-[865px] text-2xl leading-normal md:mt-6 md:text-xl sm:text-lg">
        {DESCRIPTION}
      </p>
      <Button
        className="mt-10 shadow-xl hover:bg-blue-2 hover:shadow-[0px_15px_30px_#adadad] md:mt-8 xs:mt-7 xs:w-full"
        size="lg"
        theme="blue"
        to="https://www.eventbrite.de/e/kubernetes-community-days-munich-2023-tickets-526260839337"
        target="_blank"
      >
        Get your ticket
      </Button>
    </div>
  </section>
);

export default Hero;
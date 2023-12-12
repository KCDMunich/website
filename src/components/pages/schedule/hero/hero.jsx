import React from 'react';

import Button from 'components/shared/button';

const TITLE = 'Schedule for <time class="text-blue-1 xs:block">17th & 18th of July, 2023</time>';
const DESCRIPTION =
  "Get ready for action-packed days. With two tracks and more than 45 sessions to choose from, you'll have plenty of opportunities to learn from experts in the field. The whole event will be held in English.";

const Hero = () => (
  <section className="safe-paddings pb-10 pt-24 lg:pt-[4.5rem] md:pb-4 md:pt-16 sm:py-8">
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
        to="/"
        target="_blank"
      >
        Tickets will be available soon
      </Button>
    </div>
  </section>
);

export default Hero;

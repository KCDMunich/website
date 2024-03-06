import React from 'react';

import Button from 'components/shared/button';

const TITLE = 'Speaker Lineup';
const DESCRIPTION =
  'Meet our fantastic speakers and learn from their experience. The whole event will be held in English.';

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
        className="group  relative  mt-10 md:mt-8 xs:mt-7 xs:w-full"
        size="lg"
        theme="blue"
        to="https://kcdmunich-2.ticketbutler.io/en/e/kcd-munich-2024/"
        target="_blank"
      >
        <span className="absolute h-full w-full rounded bg-gradient-to-br from-[#3333ff] via-[#3333ff] to-[#3333ff] group-hover:from-[#ff00c6] group-hover:via-[#ff5478] group-hover:to-[#ff8a05]"></span>
        <span className="bg-gray-900 duration-400 relative rounded-md px-6 py-3 transition-all ease-out group-hover:bg-opacity-0">
          <span className="relative font-bold text-white">Get your tickets now</span>
        </span>
      </Button>
    </div>
  </section>
);

export default Hero;

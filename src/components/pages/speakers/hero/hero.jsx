import React from 'react';

import Button from 'components/shared/button';

const TITLE = 'Speaker Lineup';
const DESCRIPTION = 'Meet our fantastic speakers and learn from their experience.';

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
    </div>
  </section>
);

export default Hero;

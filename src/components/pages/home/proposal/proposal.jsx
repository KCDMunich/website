import React from 'react';

import LINKS from 'constants/links';

const TITLE = 'Call for Proposal';
const DESCRIPTION = 'Our CfP is closed!';

const Proposal = () => (
  <section className="safe-paddings relative bg-[#EDC3C7] bg-opacity-10 py-20">
    <div className="container-md text-center text-primary-1">
      <div className="absolute left-1/2 top-0 h-[529px] w-[529px] -translate-x-1/2 bg-white blur-[100px] md:-left-[30%] md:h-[350px] md:w-[350px]" />
      <div className="relative">
        <h2 className="text-6xl font-bold leading-tight" id={LINKS.proposal.id}>
          {TITLE}
        </h2>
        <p className="mt-8 text-2xl leading-normal sm:text-lg">{DESCRIPTION}</p>
      </div>
    </div>
  </section>
);

export default Proposal;

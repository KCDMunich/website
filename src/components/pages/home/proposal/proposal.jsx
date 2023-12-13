import React from 'react';

import Button from 'components/shared/button';
import LINKS from 'constants/links';

const TITLE = 'Call for Proposal';
const DESCRIPTION =
  "If you are an expert or newcomer in the cloud native computing world and would like to share your knowledge and experience with the community, we encourage you to submit a proposal. Our committee is looking for diverse topics and speakers, so don't hesitate to submit your ideas. We can't wait to see what the community offers, and we look forward to receiving your submissions.";

const Proposal = () => (
  <section className="safe-paddings relative bg-white bg-opacity-10 py-20">
    <div className="container-md text-center text-primary-1">
      <div className="absolute left-1/2 top-0 h-[529px] w-[529px] -translate-x-1/2 bg-white blur-[100px] md:-left-[30%] md:h-[350px] md:w-[350px]" />
      <div className="relative">
        <h2 className="text-6xl font-bold leading-tight" id={LINKS.proposal.id}>
          {TITLE}
        </h2>
        <p className="mt-8 text-2xl leading-normal sm:text-lg">{DESCRIPTION}</p>
      </div>
      <div style={{ marginTop: '4vh', marginBottom: '10vh' }}>
        <Button
          className="group relative -mr-2 inline-flex items-center justify-center overflow-hidden border-none p-0.5 font-bold"
          to="https://sessionize.com/kcd-munich-2024-cfp/"
          theme="primary"
          target="_blank"
        >
          <span className="absolute h-full w-full bg-gradient-to-br from-[#3333ff] via-[#3333ff] to-[#3333ff] group-hover:from-[#ff00c6] group-hover:via-[#ff5478] group-hover:to-[#ff8a05]"></span>
          <span className="bg-gray-900 duration-400 relative rounded-md px-6 py-3 transition-all ease-out group-hover:bg-opacity-0">
            <span className="relative text-white">Call for Proposal</span>
          </span>
        </Button>
      </div>
    </div>
  </section>
);

export default Proposal;

import React from 'react';

import Link from 'components/shared/link';

const TITLE = 'KCD Munich';

const Info = () => (
  <section className="safe-paddings pysm:py-16-40 bg-white">
    <div className="container-md">
      <div className="lg:mt-38 mt-40 xl:mt-32 md:mt-24">
        <div
          className="mt-14 justify-between text-2xl text-primary-1 sm:text-lg"
          style={{ paddingBottom: '7rem' }}
        >
          <p>
            <span className="font-bold">Kubernetes Community Days</span> (KCDs) are global,
            community-organized events that gather adopters and technologists from open source and
            cloud native communities, supported by the Cloud Native Computing Foundation (CNCF).
          </p>
          <p className="mt-7">
            This is our second edition in <span className="font-bold">Munich</span>, and we’re
            excited to bring the community together. We want to provide a platform for professionals
            and experts from all levels and backgrounds to learn, network, and share their knowledge
            on all things cloud native.
          </p>
          <p className="mt-7">
            <span className="font-bold">What to expect?</span>
          </p>
          <p className="mt-7">
            <span className="font-bold">Technically competent talks</span>, relevant to the larger
            community and coming from end-user.
          </p>
          <p className="mt-7">
            <span className="font-bold">Leading experts </span>from Open Source, DevOps and Cloud
            Native communities.
          </p>
          <p className="mt-7">
            An <span className="font-bold">exceptional 2-floor venue</span> with enough space to
            network, join talks and workshops. Great food suiting every taste and, of course,{' '}
            <span className="font-bold">bowling</span>!
          </p>
        </div>
      </div>
    </div>
  </section>
);

export default Info;

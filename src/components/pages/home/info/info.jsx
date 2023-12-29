import React, { useEffect } from 'react';

const Info = () => (
  <section className="safe-paddings pysm:py-16-40 bg-white">
    <div className="container-md">
      <div className="lg:mt-38 mt-40 xl:mt-32 md:mt-24">
        <div className="text-lg leading-normal text-primary-1" style={{ paddingBottom: '7rem' }}>
          <p>
            <span className="font-bold">Kubernetes Community Days</span> (KCDs) are global,
            community-organized events that gather adopters and technologists from open source and
            cloud native communities, supported by the Cloud Native Computing Foundation (CNCF).
          </p>
          <p className="mt-7">
            This is our third edition in <span className="font-bold">Munich</span>, and we’re
            excited to bring the community together. We want to provide a platform for professionals
            and experts from all levels and backgrounds to learn, network, and share their knowledge
            on all things cloud native.
          </p>
        </div>
        <div className="container text-center">
          <h2 className="text-6xl font-bold leading-denser text-primary-1">What to expect?</h2>
        </div>
        <div className="text-lg leading-normal text-primary-1" style={{ paddingBottom: '7rem' }}>
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
        <div className="container text-center">
          <h2 className="text-6xl font-bold leading-denser text-primary-1">Tickets</h2>
        </div>
        <div
          className="ticketbutler-iframe"
          data-type="EVENT_LIST"
          data-domain="kcdmunich-2.ticketbutler.io"
          data-slug="kcdmunich-2"
        ></div>
        <TicketButler />
      </div>
    </div>
  </section>
);

const TicketButler = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/@ticketbutler/event-embedder@latest/dist/index.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null;
};

export default Info;

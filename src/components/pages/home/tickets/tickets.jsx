import React, { useEffect } from 'react';

const Tickets = () => (
  <>
    <section
      className="safe-paddings lg:pt-[4.5rem] md:pb-4 md:pt-16 sm:py-8"
      style={{ paddingBottom: '8rem' }}
    >
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
    </section>
  </>
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

export default Tickets;

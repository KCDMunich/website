import React, { useEffect } from 'react';

const Tickets = () => (
  <>
    <section className="safe-paddings sm:pt-13  2xl:pt-[6rem]  md:pb-4 md:pt-[5rem] sm:pb-5">
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

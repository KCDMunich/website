import React from 'react';
import './tickets.css';

const Tickets = () => {
  const event = {
    title: 'Cloud Native Summit Munich 2025',
    date: '21-22 July 2025',
    time: '09:00 - 17:00',
    venue: 'smartvillage Bogenhausen, Rosenkavalierplatz 13, 81925 Munich',
    description:
      'In July 2025, the cloud native community will gather in Munich. Come and join us! Cloud Native Summit (CNS) Munich is a local, community-organized event that gathers adopters and technologists from open source and cloud native communities.',
    tickets: [
      {
        id: 'early-bird',
        name: 'All Days – Early Bird',
        price: 129,
        salesStartDate: null,
        salesEndDate: new Date('2025-02-28'),
      },
      {
        id: 'all-days',
        name: 'All Days',
        price: 189,
        salesStartDate: new Date('2025-03-01'),
        salesEndDate: new Date('2025-07-13'),
      },
      {
        id: 'monday',
        name: 'Monday Only',
        price: 129,
        salesStartDate: new Date('2025-03-01'),
        salesEndDate: new Date('2025-07-13'),
      },
      {
        id: 'tuesday',
        name: 'Tuesday Only',
        price: 129,
        salesStartDate: new Date('2025-03-01'),
        salesEndDate: new Date('2025-07-13'),
      },
      {
        id: 'late-mule',
        name: 'All Days - Late Mule',
        price: 209,
        salesStartDate: new Date('2025-07-14'),
        salesEndDate: new Date('2025-07-22'),
      },
    ],
  };

  const isTicketAvailable = (ticket) => {
    const now = new Date();
    return (
      (!ticket.salesStartDate || new Date(ticket.salesStartDate) <= now) &&
      (!ticket.salesEndDate || new Date(ticket.salesEndDate) >= now)
    );
  };

  const availableTickets = event.tickets.filter(isTicketAvailable);

  const dateOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  return (
    <div className="overflow-hidden rounded-lg bg-white shadow-lg">
      <div className="space-y-6 p-6">
        <div className="space-y-2 rounded-lg bg-gray-50 p-4">
          <h3 className="font-semibold">Available Ticket Types:</h3>
          {availableTickets.length > 0 ? (
            <ul className="list-inside list-disc space-y-1">
              {availableTickets.map((ticket) => (
                <li key={ticket.id} className="ticket-item">
                  <div className="ticket-name">{ticket.name}</div>
                  <div className="ticket-price">€{ticket.price}</div>
                  <div className="ticket-end-date">
                    Ends on: {ticket.salesEndDate.toLocaleDateString(undefined, dateOptions)}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500">No tickets are currently available for sale.</p>
          )}
        </div>

        <div className="rounded-lg bg-blue-50 p-4">
          <h4 className="mb-2 font-semibold">Diversity Tickets</h4>
          <p className="text-sm">
            Contact us at{' '}
            <a
              href="mailto:team@cloudnativesummit.de"
              className="text-primary font-bold hover:underline"
            >
              team@cloudnativesummit.de
            </a>{' '}
            to apply for a diversity ticket - sponsored by ape factory.
          </p>
        </div>
      </div>

      <div className="flex flex-col items-stretch gap-4 px-6 pb-6">
        <p className="text-center text-sm text-gray-500">
          Tickets are purchased through our external ticketing partner.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <button
            onClick={() =>
              window.open('https://cnsmunich.ticketbutler.io/en/e/cnsmunich-2025/', '_blank')
            }
            className="flex w-full items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            style={{ backgroundColor: '#004258', cursor: 'pointer', width: '15rem' }}
          >
            Buy your Ticket
          </button>
        </div>
      </div>
    </div>
  );
};

export default Tickets;

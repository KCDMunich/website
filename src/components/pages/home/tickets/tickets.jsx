import React, { useState } from 'react';
import { Calendar, Clock, MapPin, ExternalLink } from 'lucide-react';

const Tickets = () => {
  const event = {
    title: 'Cloud Native Summit Munich 2025',
    date: '21-22 July 2025',
    time: '09:00 - 17:00',
    venue: 'smartvillage Bogenhausen, Rosenkavalierplatz 13, 81925 Munich',
    description:
      'In July 2025, the cloud native community will gather in Munich. Come and join us! Cloud Native Summit (CNS) Munich is a local, community-organized event that gathers adopters and technologists from open source and cloud native communities.',
    image:
      'https://cnsmunich.ticketbutler.io/api/thumbs/events/41e57b9c3db5e4dc2e69c01d4dff0c2f_b285947b71864900a5f77d6f24dab3ca_1200x800.jpg',
    tickets: [
      {
        id: 'early-bird',
        name: 'All Days – Early Bird',
        price: 129,
        salesStartDate: null,
        salesEndDate: new Date('2025-02-28T23:45:00+01:00'),
      },
      {
        id: 'all-days',
        name: 'All Days',
        price: 189,
        salesStartDate: new Date('2025-03-01T00:00:00+01:00'),
        salesEndDate: new Date('2025-07-13T23:45:00+02:00'),
      },
      {
        id: 'monday',
        name: 'Monday Only',
        price: 129,
        salesStartDate: new Date('2025-03-01T00:00:00+01:00'),
        salesEndDate: new Date('2025-07-13T23:45:00+02:00'),
      },
      {
        id: 'tuesday',
        name: 'Tuesday Only',
        price: 129,
        salesStartDate: new Date('2025-03-01T00:00:00+01:00'),
        salesEndDate: new Date('2025-07-13T23:45:00+02:00'),
      },
      {
        id: 'late-mule',
        name: 'All Days - Late Mule',
        price: 209,
        salesStartDate: new Date('2025-07-14T00:00:00+02:00'),
        salesEndDate: new Date('2025-07-22T17:00:00+02:00'),
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

  return (
    <div className="mx-auto max-w-4xl p-4">
      <div className="overflow-hidden rounded-lg bg-white shadow-lg">
        <div className="relative h-64 md:h-80">
          <img src={event.image} alt={event.title} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <h1 className="mb-2 text-3xl font-bold">{event.title}</h1>
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center rounded-full bg-white/20 px-2 py-1 text-xs">
                <Calendar className="mr-1 h-3 w-3" />
                {event.date}
              </span>
              <span className="inline-flex items-center rounded-full bg-white/20 px-2 py-1 text-xs">
                <Clock className="mr-1 h-3 w-3" />
                {event.time}
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-6 p-6">
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <MapPin className="h-4 w-4" />
            <span>{event.venue}</span>
          </div>
          <div className="space-y-2 rounded-lg bg-gray-50 p-4">
            <h3 className="font-semibold">Available Ticket Types:</h3>
            {availableTickets.length > 0 ? (
              <ul className="list-inside list-disc space-y-1">
                {availableTickets.map((ticket) => (
                  <li key={ticket.id} className="text-sm">
                    {ticket.name} - €{ticket.price}
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
          <button
            onClick={() =>
              window.open('https://cnsmunich.ticketbutler.io/en/e/cnsmunich-2025/', '_blank')
            }
            className="flex w-full items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            style={{ backgroundColor: '#004258' }}
          >
            Go to Ticket Page
          </button>
        </div>
      </div>
    </div>
  );
};

export default Tickets;

import React from "react";
import "@/components/tickets/tickets.css";

const Tickets = ({data}) => {
    const isTicketAvailable = (ticket) => {
        const now = new Date();
        return (
            (!ticket.salesStartDate || new Date(ticket.salesStartDate) <= now) &&
            (!ticket.salesEndDate || new Date(ticket.salesEndDate) >= now)
        );
    };

    const availableTickets = data.tickets.type.filter(isTicketAvailable);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', options); // Usa una localizzazione fissa
    };

    return (
        <div className="overflow-hidden rounded-lg bg-white shadow-lg" id="tickets">
            <div className="space-y-6 p-6">
                <div className="space-y-2 rounded-lg bg-gray-50 p-4">
                    <h3 className="font-semibold">{data.tickets.title}</h3>
                    {availableTickets.length > 0 ? (
                        <ul className="list-inside list-disc space-y-1">
                            {availableTickets.map((ticket) => (
                                <li key={ticket.id} className="ticket-item">
                                    <div className="ticket-name">{ticket.name}</div>
                                    <div className="ticket-price">€{ticket.price}</div>
                                    <div className="ticket-end-date">
                                        Ends on: {formatDate(ticket.salesEndDate)}
                                    </div>
                                    <div className="text-xs text-gray-500">{ticket.description ? ticket.description : ''}</div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-xl text-gray-500">{data.tickets['no-available']}</p>
                    )}
                </div>

                {/*
                <div className="rounded-lg bg-blue-50 p-4">
                    <h4 className="mb-2 font-semibold">Diversity Tickets</h4>
                    <p className="text-sm">
                        Contact us at{' '}
                        <a
                            href="mailto:team@mail.com"
                            className="text-primary font-bold hover:underline"
                        >
                            team@mail.com
                        </a>{' '}
                        to apply for a diversity ticket - sponsored by ape factory.
                    </p>
                </div>
                */}
            </div>


            <div className="flex flex-col items-stretch gap-4 px-6 pb-6">
                {availableTickets.length > 0 ? (
                    <>
                        <p className="text-center text-sm text-gray-500">
                            Tickets are purchased through our external ticketing partner.
                        </p>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <button
                                type="button"
                                className="button"
                                style={{ cursor: 'pointer' }}
                                onClick={() =>
                                    window.open(data.tickets.link, '_blank')
                                }
                            >
                                Buy your Ticket
                            </button>
                        </div>
                    </>
                ) : (<>
                    <p className="text-center text-xl text-gray-500">
                        Check back in a few days to secure your spot for the conference and workshops.
                    </p>
                </>)}
            </div>
        </div>
    );
};

export default Tickets;

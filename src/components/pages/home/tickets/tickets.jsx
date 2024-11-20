import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Tickets = () => {
  const [eventData, setEventData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const response = await axios.get(
          'https://cnsmunich.ticketbutler.io/api/v3/events/2f289192ecd84a2f880c710d8c15b5bf',
          {
            headers: {
              Authorization: `${process.env.GATSBY_TICKETBUTLER_API_KEY}`,
              'Content-Type': 'application/json',
            },
          }
        );

        setEventData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching event data:', error);
        setIsLoading(false);
      }
    };

    fetchEventData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!eventData) {
    return <div>Failed to load event data.</div>;
  }

  return (
    <div
      style={{
        maxWidth: '800px',
        margin: '0 auto',
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>
        {eventData.title}
      </h1>
      <p style={{ marginBottom: '20px' }}>{eventData.description.replace(/<\/?[^>]+(>|$)/g, '')}</p>

      <div
        style={{
          border: '1px solid #ddd',
          padding: '20px',
          marginBottom: '20px',
          borderRadius: '5px',
        }}
      >
        <p>
          <strong>Date:</strong> {new Date(eventData.start_date).toLocaleDateString()} at{' '}
          {new Date(eventData.start_date).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </p>
        <p>
          <strong>Location:</strong> {eventData.address.venue}, {eventData.address.street},{' '}
          {eventData.address.city}
        </p>
        <p>
          <strong>Tickets from:</strong> €
          {eventData.ticket_types.length > 0
            ? Math.min(...eventData.ticket_types.map((t) => t.price))
            : 'N/A'}
        </p>
        <button
          style={{
            padding: '10px 15px',
            fontSize: '16px',
            color: '#fff',
            backgroundColor: '#007BFF',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
          onClick={() => window.open(eventData.event_full_url, '_blank')}
        >
          Buy Tickets
        </button>
      </div>

      <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '10px' }}>Ticket Options</h2>
      <div>
        {eventData.ticket_types.map((ticket) => (
          <div
            key={ticket.uuid}
            style={{
              border: '1px solid #ddd',
              padding: '10px',
              margin: '10px 0',
              borderRadius: '5px',
            }}
          >
            <h3 style={{ fontSize: '18px', marginBottom: '5px' }}>{ticket.title}</h3>
            <p>{ticket.description.replace(/<\/?[^>]+(>|$)/g, '')}</p>
            <p style={{ fontWeight: 'bold' }}>Price: €{ticket.price.toFixed(2)}</p>
            <button
              style={{
                padding: '10px 15px',
                fontSize: '14px',
                color: '#fff',
                backgroundColor: ticket.amount_left > 0 ? '#007BFF' : '#6c757d',
                border: 'none',
                borderRadius: '5px',
                cursor: ticket.amount_left > 0 ? 'pointer' : 'not-allowed',
              }}
              disabled={ticket.amount_left === 0}
              onClick={() => window.open(eventData.event_full_url, '_blank')}
            >
              {ticket.amount_left > 0 ? 'Buy Ticket' : 'Sold Out'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tickets;

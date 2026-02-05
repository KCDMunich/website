import React from 'react';

const hotels = [
  {
    name: 'Best Western Hotel Arabellapark München',
    description:
      'The hotel offers reserved rooms from 28.06.2026 to 01.07.2026. The rate is EUR 109.00 per room per night, excluding breakfast. Rooms can be booked with the code Cloud Native Summit Munich 2026 until 28.04.2026 Unused rooms return to general sale after the deadline.',
    distance: '2 min walk',
    amenities: ['Restaurant'],
    imageUrl:
      'https://cf.bstatic.com/xdata/images/hotel/max1024x768/319612311.jpg?k=c1a8b2e40962f6b49546a1295f4b9a5fd0d3350aa33d1da269de6cdcb6e86acd&o=&hp=1',
    websiteUrl: 'https://hotel-arabellapark.de/',
  },
  {
    name: 'Four Points by Sheraton Munich Arabellapark',
    amenities: ['Fitnessraum', 'WLAN', 'Frühstück'],
    websiteUrl: 'https://www.marriott.com/en-us/hotels/mucwi-the-westin-grand-munich/overview/',
  },
  {
    name: 'The Westin Grand Munich',
    websiteUrl:
      'https://www.marriott.com/en-us/hotels/mucap-four-points-munich-arabellapark/overview/',
  },
];

export default function HotelList() {
  const [highlightedHotel, ...otherHotels] = hotels;

  return (
    <section className="safe-paddings bg-white">
      <div className="container">
        <h2 className="section-title">Nearby hotels</h2>

        {/* Highlighted Hotel */}
        <div
          style={{
            marginBottom: '32px',
            border: '1px solid #ddd',
            borderRadius: '8px',
            backgroundColor: '#f8fafc',
            overflow: 'hidden',
          }}
        >
          <img
            src={highlightedHotel.imageUrl}
            alt={highlightedHotel.name}
            style={{ width: '100%', height: '300px', objectFit: 'cover' }}
          />
          <div style={{ padding: '16px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '8px' }}>
              {highlightedHotel.name}
            </h2>
            <p style={{ fontSize: '14px', color: '#555', marginBottom: '16px', lineHeight: '1.6' }}>
              The hotel offers reserved rooms for your stay from <strong>28.06.2026</strong> to{' '}
              <strong>01.07.2026</strong>. The rate is <strong>EUR 109.00</strong> per room per
              night, excluding breakfast.
            </p>
            <p style={{ fontSize: '14px', color: '#555', marginBottom: '16px', lineHeight: '1.6' }}>
              <strong>Booking code:</strong> <strong>Cloud Native Summit Munich 2026</strong>.
              <br />
              <br />
              Rooms can be booked until <strong>28.04.2026</strong>. After the deadline, all
              unclaimed rooms return to general sale.
            </p>
            <p style={{ fontSize: '14px', color: '#555', marginBottom: '16px', lineHeight: '1.6' }}>
              <strong>Cancellation policy:</strong>
            </p>
            <ul
              style={{ fontSize: '14px', color: '#555', marginBottom: '16px', lineHeight: '1.6' }}
            >
              <li>
                Free cancellation until <strong>28.04.2026</strong>.
              </li>
              <li>
                From <strong>29.04.2026</strong> to <strong>28.05.2026</strong>:{' '}
                <strong>50%</strong> of the reservation.
              </li>
              <li>
                After <strong>28.05.2026</strong>: cancellations <strong>90%</strong>, no-shows{' '}
                <strong>100%</strong>.
              </li>
            </ul>
            <p style={{ fontSize: '14px', color: '#555', marginBottom: '16px', lineHeight: '1.6' }}>
              <strong>Payment:</strong> All guests pay on arrival. Cancellation and no-show costs
              are paid by the guests. A credit card is required as a guarantee.
            </p>
            <p style={{ fontSize: '14px', color: '#777' }}>📍 {highlightedHotel.distance}</p>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <a
                href="mailto:info@hotel-arabellapark.de?subject=Cloud%20Native%20Summit%20Munich%202026%20Hotel%20Booking"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'block',
                  textAlign: 'center',
                  backgroundColor: '#004257',
                  color: '#fff',
                  padding: '10px 16px',
                  borderRadius: '4px',
                  textDecoration: 'none',
                  minWidth: '10vw',
                  marginTop: '1rem',
                  cursor: 'pointer',
                }}
              >
                Book now
              </a>
            </div>
          </div>
        </div>

        {/* Other Hotels */}
        <div style={{ marginTop: '32px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px' }}>
            More hotels nearby
          </h3>
          <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
            {otherHotels.map((hotel, index) => (
              <li
                key={index}
                style={{
                  marginBottom: '16px',
                  padding: '12px',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  backgroundColor: '#f8fafc',
                }}
              >
                <h4 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '4px' }}>
                  {hotel.name}
                </h4>
                <p style={{ fontSize: '14px', color: '#555', marginBottom: '4px' }}>
                  {hotel.description}
                </p>
                <p style={{ fontSize: '14px', color: '#777', marginBottom: '8px' }} />
                <a
                  href="mailto:info@hotel-arabellapark.de"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: '#004257',
                    textDecoration: 'none',
                    fontWeight: 'normal',
                  }}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

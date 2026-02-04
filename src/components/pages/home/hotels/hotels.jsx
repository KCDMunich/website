import React from 'react';

const hotels = [
  {
    name: 'Best Western Hotel Arabellapark München',
    description:
      'We are currently arranging room contingents for Cloud Native Summit Munich attendees. A dedicated booking code will be shared soon.',
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
            We are currently arranging room contingents for attendees. A dedicated booking code will
            be announced soon.
          </p>
          <p style={{ fontSize: '14px', color: '#777' }}>📍 {highlightedHotel.distance}</p>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {/* <a
              href="mailto:info@hotel-arabellapark.de"
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
              }}
            >
              Book now
            </a> */}
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

import React from 'react';

const hotels = [
  {
    name: 'Best Western Hotel Arabellapark München',
    description:
      'The hotel offers 220 rooms in six different categories. Our brand new hotel combines state of the art technology with a regional, very bavarian touch to make you feel home. Spend time in our lobby bar, use the free internet as much as you like or enjoy some delicious bavarian food on our beergarden terrace.',
    distance: '2 min walk',
    amenities: ['WLAN', 'Restaurant', 'Parking'],
    imageUrl: 'https://hotel-arabellapark.de/wp-content/uploads/2021/09/bw-muc-7-scaled.jpg',
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
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '16px' }}>
      <h1
        style={{
          fontSize: '24px',
          fontWeight: 'bold',
          textAlign: 'center',
          marginBottom: '24px',
        }}
      >
        Near by Hotels
      </h1>

      {/* Highlighted Hotel */}
      <div
        style={{
          marginBottom: '32px',
          border: '1px solid #ddd',
          borderRadius: '8px',
          overflow: 'hidden',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
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
          <p style={{ fontSize: '14px', color: '#555', marginBottom: '16px' }}>
            {highlightedHotel.description}
          </p>
          <p style={{ fontSize: '14px', color: '#777', marginBottom: '16px' }}>
            📍 {highlightedHotel.distance}
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
            {highlightedHotel.amenities.map((amenity, idx) => (
              <span
                key={idx}
                style={{
                  fontSize: '12px',
                  color: '#333',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  padding: '4px 8px',
                }}
              >
                {amenity}
              </span>
            ))}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <a
              href={highlightedHotel.websiteUrl}
              style={{
                display: 'block',
                textAlign: 'center',
                backgroundColor: '#004257',
                color: '#fff',
                padding: '10px 16px',
                borderRadius: '4px',
                textDecoration: 'none',
                fontWeight: 'bold',
                width: '20vw',
              }}
            >
              Booking
            </a>
          </div>
        </div>
      </div>

      {/* Other Hotels */}
      <div style={{ marginTop: '32px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px' }}>
          more hotels nearby
        </h3>
        <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
          {otherHotels.map((hotel, index) => (
            <li
              key={index}
              style={{
                marginBottom: '16px',
                padding: '8px',
                borderBottom: '1px solid #ddd',
              }}
            >
              <h4 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '4px' }}>
                {hotel.name}
              </h4>
              <p style={{ fontSize: '14px', color: '#555', marginBottom: '4px' }}>
                {hotel.description}
              </p>
              <p style={{ fontSize: '14px', color: '#777', marginBottom: '8px' }}>
                📍 {hotel.distance} vom Veranstaltungsort
              </p>
              <a
                href={hotel.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: '#004257',
                  textDecoration: 'none',
                  fontWeight: 'bold',
                }}
              ></a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

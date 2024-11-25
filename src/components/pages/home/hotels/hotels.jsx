import React from 'react';

const hotels = [
  {
    name: 'Best Western Hotel Arabellapark München',
    description:
      'Do legst di nieda! Nahe dem Englischen Garten, im renommierten Stadtquartier Arabellapark, liegt das moderne Drei-Sterne-Superior-Hotel mit 220 Zimmern',
    distance: '0.5 km',
    amenities: ['WLAN', 'Restaurant', 'Parkplatz'],
    imageUrl:
      'https://cf.bstatic.com/xdata/images/hotel/max1024x768/328332112.jpg?k=a615641dc57c49a798ebbdd16523217492c089db6f03bf7f11cf4cf79999d402&o=&hp=1',
    websiteUrl: 'https://www.grandhotelmetropol.com',
  },
  {
    name: 'HYPERION Hotel München',
    description: 'Elegantes Hotel in der Nähe des smartvillage mit erstklassigem Service.',
    distance: '1.2 km',
    amenities: ['Fitnessraum', 'WLAN', 'Frühstück'],
    websiteUrl: 'https://www.h-hotels.com',
  },
  {
    name: 'Hotel Rothof Bogenhausen',
    description: 'Ein charmantes Hotel mit grüner Umgebung, ideal für Geschäftsreisende.',
    distance: '0.8 km',
    amenities: ['Parkplatz', 'Frühstück', 'WLAN'],
    websiteUrl: 'https://www.rothof.de',
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
        Hotels in der Umgebung
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
            📍 {highlightedHotel.distance} vom Veranstaltungsort
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
          <a
            href={highlightedHotel.websiteUrl}
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
              fontWeight: 'bold',
            }}
          >
            Zur Hotel-Website
          </a>
        </div>
      </div>

      {/* Other Hotels */}
      <div style={{ marginTop: '32px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px' }}>
          Weitere Optionen
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
              >
                Zur Hotel-Website
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

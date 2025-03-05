"use client";
import React from 'react';

export default function Hotel({data}) {
    const highlightedHotel = data.hotel.highlighted;
    const otherHotels = data.hotel.others;

    return (
        <div style={{ maxWidth: '1284px', margin: '0 auto', padding: '16px' }}>
            <h2 className="section-title">{data.hotel.title}</h2>
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
                    <p style={{ fontSize: '14px', color: '#555', marginBottom: '16px', lineHeight: '1.6' }}>
                        {highlightedHotel.description}
                    </p>
                    <p style={{ fontSize: '14px', color: '#555', marginBottom: '16px', lineHeight: '1.6' }}>
                        {highlightedHotel.rooms}
                    </p>
                    <p style={{ fontSize: '14px', color: '#777' }}>📍 {highlightedHotel.distance}</p>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <a
                            href={highlightedHotel.website}
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
                            }}
                        >
                            Visit website
                        </a>
                    </div>
                </div>
            </div>

            {/* Other Hotels */}
            {otherHotels.length > 0 && (
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
                                padding: '8px',
                                borderBottom: '1px solid #ddd',
                            }}
                        >
                            <h4 style={{fontSize: '16px', fontWeight: 'bold', marginBottom: '4px'}}>
                                {hotel.name}
                            </h4>
                            <p style={{fontSize: '14px', color: '#555', marginBottom: '4px'}}>
                                {hotel.description}
                            </p>
                            <p style={{fontSize: '14px', color: '#777', marginBottom: '8px'}}/>
                            <a
                                href={hotel.website}
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
                                }}
                            >
                                Visit website
                            </a>
                        </li>
                    ))}
                </ul>
                </div>
            )}
        </div>
    );
}

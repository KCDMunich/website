import React from 'react';
import { StaticImage } from 'gatsby-plugin-image';

const IconMapPin = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const IconUtensils = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
    <path d="M7 2v20" />
    <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
  </svg>
);

const IconClock = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const IconParty = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5.8 11.3 2 22l10.7-3.79" />
    <path d="M4 3h.01" />
    <path d="M22 8h.01" />
    <path d="M15 2h.01" />
    <path d="M22 20h.01" />
    <path d="m22 2-2.24.75a2.9 2.9 0 0 0-1.96 3.12v0c.1.86-.57 1.63-1.45 1.63h-.38c-.86 0-1.6.6-1.76 1.44L14 10" />
    <path d="m22 13-.82-.33c-.86-.34-1.82.2-1.98 1.11v0c-.11.7-.72 1.22-1.43 1.22H17" />
    <path d="m11 2 .33.82c.34.86-.2 1.82-1.11 1.98v0C9.52 4.9 9 5.52 9 6.23V7" />
    <path d="M11 13c1.93 1.93 2.83 4.17 2 5-.83.83-3.07-.07-5-2-1.93-1.93-2.83-4.17-2-5 .83-.83 3.07.07 5 2Z" />
  </svg>
);

const IconExternal = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

const Card = ({ children, className = '' }) => (
  <div
    style={{
      backgroundColor: 'white',
      borderRadius: '0.75rem',
      boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
      overflow: 'hidden',
    }}
    className={className}
  >
    {children}
  </div>
);

const Venue = () => {
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 1rem' }}>
      <h1
        style={{
          fontSize: '2.25rem',
          fontWeight: 'bold',
          textAlign: 'center',
          marginBottom: '3rem',
        }}
      >
        Venue Information
      </h1>

      <div
        style={{
          display: 'grid',
          gap: '2rem',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 600px), 1fr))',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div
            style={{
              position: 'relative',
              aspectRatio: '16/9',
              borderRadius: '0.75rem',
              overflow: 'hidden',
              backgroundColor: '#f5f5f5',
            }}
          >
            <StaticImage
              src="./images/card-illustration.jpg"
              alt="smartvillage Bogenhausen"
              placeholder="blurred"
              formats={['auto', 'webp', 'avif']}
              quality={90}
            />
          </div>

          <Card>
            <div style={{ padding: '1.5rem' }}>
              <div style={{ marginBottom: '1rem' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>smartvillage Bogenhausen</h2>
                <h3 style={{ fontSize: '1.25rem', color: '#666' }}>at Munich Arabellapark</h3>
              </div>

              <div
                style={{
                  display: 'flex',
                  gap: '0.5rem',
                  color: '#666',
                  marginBottom: '1rem',
                }}
              >
                <IconMapPin />
                <div>
                  <p>Rosenkavalierpl. 13</p>
                  <p>81925 Munich</p>
                </div>
              </div>

              <a
                href="https://maps.google.com/?q=smartvillage+Bogenhausen+Rosenkavalierpl.+13+81925+Munich"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                  padding: '0.5rem 1rem',
                  border: '1px solid #ddd',
                  borderRadius: '0.5rem',
                  textDecoration: 'none',
                  color: 'inherit',
                  transition: 'background-color 0.2s',
                }}
                onMouseOver={(e) => (e.target.style.backgroundColor = '#f5f5f5')}
                onMouseOut={(e) => (e.target.style.backgroundColor = 'transparent')}
              >
                Open in Google Maps
                <IconExternal style={{ marginLeft: '0.5rem' }} />
              </a>
            </div>
          </Card>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div style={{ display: 'flex', textAlign: 'center', flexDirection: 'column' }}>
            <p style={{ fontSize: '1.125rem', marginBottom: '1.25rem' }}>
              The KCD Munich will be held at the smartvillage Bogenhausen at Munich Arabellapark.
              Attendees can expect to enjoy a variety of vegetarian and vegan food options
              throughout the day.
            </p>
            <p style={{ fontSize: '1.125rem', marginBottom: '1.25rem' }}>
              Do not miss out on the opportunity of fun, to connect with fellow attendees and
              continue the conversation at the networking Bowling event.
            </p>
            <p style={{ fontSize: '1.25rem', fontWeight: '600' }}>
              We can not wait to see you there!
            </p>
          </div>

          <div>
            <h3
              style={{
                fontSize: '1.25rem',
                fontWeight: '600',
                marginBottom: '1rem',
              }}
            >
              Venue Amenities
            </h3>

            <div
              style={{
                display: 'grid',
                gap: '1rem',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))',
              }}
            >
              <Card>
                <div
                  style={{
                    padding: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                  }}
                >
                  <IconUtensils />
                  <div>
                    <h4 style={{ fontWeight: '500' }}>Catering</h4>
                    <p style={{ fontSize: '0.875rem', color: '#666' }}>
                      Vegetarian & Vegan options
                    </p>
                  </div>
                </div>
              </Card>

              <Card>
                <div
                  style={{
                    padding: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                  }}
                >
                  <IconClock />
                  <div>
                    <h4 style={{ fontWeight: '500' }}>Full Day Event</h4>
                    <p style={{ fontSize: '0.875rem', color: '#666' }}>Including breaks</p>
                  </div>
                </div>
              </Card>

              <Card style={{ gridColumn: '1 / -1' }}>
                <div
                  style={{
                    padding: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                  }}
                >
                  <IconParty />
                  <div>
                    <h4 style={{ fontWeight: '500' }}>Networking Event</h4>
                    <p style={{ fontSize: '0.875rem', color: '#666' }}>Bowling activity included</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Venue;

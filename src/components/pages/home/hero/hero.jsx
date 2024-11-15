import { StaticImage } from 'gatsby-plugin-image';
import { Calendar, MapPin, Users } from 'lucide-react';
import React from 'react';
import './hero.css';

const Hero = () => {
  return (
    <div className="hero-container">
      <section className="hero-section">
        <div className="hero-background-grid" />

        <div className="hero-content-container">
          <div className="hero-grid">
            {/* Left column - Content */}
            <div className="hero-left-column fade-in-up">
              {/* Date Badge */}
              <span className="hero-badge">July 21st – 22nd, 2025</span>

              {/* Title */}
              <h1 className="hero-title">Cloud Native Summit Munich</h1>

              {/* Description */}
              <p className="hero-description">
                In July 2025, the cloud native community will gather in Munich. Come and join us!
              </p>

              {/* Feature List */}
              <ul className="hero-feature-list">
                <li className="hero-feature-item">
                  <Calendar className="hero-icon" />
                  <span>Two-day technical event</span>
                </li>
                <li className="hero-feature-item">
                  <MapPin className="hero-icon" />
                  <span>Munich, Germany</span>
                </li>
                <li className="hero-feature-item">
                  <Users className="hero-icon" />
                  <span>Developers, Platform Engineers, and IT Professionals</span>
                </li>
              </ul>

              <p className="hero-description">
                New name. Same mission! CNS Munich is run by the community for the community!
              </p>
              {/* CTA Buttons */}
              <div className="hero-cta-container">
                <button
                  type="button"
                  className="button"
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    window.location.href = '/mission-statement';
                  }}
                >
                  Our Statement
                </button>
                {
                  <button
                    type="button"
                    className="hero-cta-secondary"
                    onClick={() => (window.location.href = '#sponsors')}
                  >
                    Become a Sponsor
                  </button>
                }
              </div>
            </div>

            <div className="hero-right-column fade-in-scale">
              <div className="hero-illustration-container">
                <div
                  style={{
                    position: 'relative',
                    aspectRatio: '1',
                    borderRadius: '0.75rem',
                    overflow: 'hidden',
                  }}
                >
                  <StaticImage
                    src="./images/hero.svg"
                    alt="Hero"
                    formats={['auto', 'webp', 'avif']}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;

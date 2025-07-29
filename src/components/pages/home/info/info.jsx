import React from 'react';
import { Users, Calendar, MapPin, ArrowRight } from 'lucide-react';

import './info.css';

const Info = () => (
  <section className="info-section">
    <div className="info-container">
      {/* About CNS Section */}
      <div className="about-section">
        <div className="about-header">
          <span className="about-badge">About Event</span>
          <h2 className="section-title">
            About Cloud Native Summit
            <span className="section-title-accent"> Munich</span>
          </h2>
        </div>

        <div className="about-content">
          <div className="about-text-card">
            <p className="about-description">
              Cloud Native Summit (CNS) Munich is a local, community-organized event that gathers
              adopters and technologists from open source and cloud native communities.
            </p>
            <div className="about-cta">
              <button
                type="button"
                className="about-cta-primary"
                onClick={() => {
                  window.location.href = '/vision';
                }}
              >
                <span>Our Vision</span>
                <ArrowRight className="about-cta-icon" />
              </button>
            </div>
          </div>
          <div className="about-text-card">
            <p className="about-description">
              This is the fourth edition in Munich, aiming to bring the community together. The
              event provides a platform for professionals and experts from all levels and
              backgrounds to learn, network, and share their knowledge about cloud-native
              technologies.
            </p>
          </div>
        </div>
      </div>

      {/* What to Expect Section */}
      <div className="expect-section">
        <div className="expect-header">
          <span className="expect-badge">What to Expect</span>
          <h2 className="section-title">What to Expect?</h2>
        </div>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon-container">
              <Users className="feature-icon" />
            </div>
            <div className="feature-content">
              <h3 className="feature-title">Community Networking</h3>
              <p className="feature-text">Connect with peers from the cloud native community</p>
            </div>
          </div>

          <div className="feature-card">
            <div className="feature-icon-container">
              <Calendar className="feature-icon" />
            </div>
            <div className="feature-content">
              <h3 className="feature-title">Technical Talks</h3>
              <p className="feature-text">Engaging presentations from industry experts</p>
            </div>
          </div>

          <div className="feature-card">
            <div className="feature-icon-container">
              <MapPin className="feature-icon" />
            </div>
            <div className="feature-content">
              <h3 className="feature-title">Unique Venue</h3>
              <p className="feature-text">
                An exceptional 2-floor venue with ample space for activities
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Info;

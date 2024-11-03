import React from 'react';
import { Users, Calendar, MapPin } from 'lucide-react';
import './info.css';

const Info = () => (
  <section className="info-section">
    <div className="info-container">
      {/* About KCD Section */}
      <div className="about-section">
        <h2 className="section-title">About KCD Munich</h2>

        <div className="about-content">
          <div className="about-text">
            <p>
              Kubernetes Community Days (KCDs) are global, community-organized events that gather
              adopters and technologists from open source and cloud native communities, supported by
              the Cloud Native Computing Foundation (CNCF).
            </p>
          </div>
          <div className="about-text">
            <p>
              This is our third edition in Munich, and we're excited to bring the community
              together. We want to provide a platform for professionals and experts from all levels
              and backgrounds to learn, network, and share their knowledge on all things cloud
              native.
            </p>
          </div>
        </div>
      </div>

      {/* What to Expect Section */}
      <div className="expect-section">
        <h2 className="section-title">What to expect?</h2>

        <div className="features-grid">
          <div className="feature-item">
            <Users className="feature-icon" />
            <div className="feature-content">
              <h3 className="feature-title">Community Networking</h3>
              <p className="feature-text">Connect with peers from the cloud native community</p>
            </div>
          </div>

          <div className="feature-item">
            <Calendar className="feature-icon" />
            <div className="feature-content">
              <h3 className="feature-title">Technical Talks</h3>
              <p className="feature-text">Engaging presentations from industry experts</p>
            </div>
          </div>

          <div className="feature-item">
            <MapPin className="feature-icon" />
            <div className="feature-content">
              <h3 className="feature-title">Unique Venue</h3>
              <p className="feature-text">
                An exceptional 2-floor venue with ample space for activities
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Video Section - nur wenn benötigt */}
      <div className="video-section">
        <iframe
          className="video-frame"
          src="https://www.youtube.com/embed/fIzXybMaEZ0?si=Ln1spZvT_qSgYh09?controls=1"
          title="KCD Munich 2023 Recap"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
          allowFullScreen
        />
      </div>
    </div>
  </section>
);

export default Info;

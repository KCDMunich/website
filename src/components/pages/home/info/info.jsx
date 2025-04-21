import { Users, Calendar, MapPin } from 'lucide-react';
import Tickets from 'components/pages/home/tickets/tickets';

import React from 'react';
import './info.css';

const Info = () => (
  <section className="info-section">
    <div className="info-container">
      {/* About CNS Section */}
      <div className="about-section">
        <h2 className="section-title">About Cloud Native Summit Munich</h2>

        <div className="about-content">
          <div className="about-text">
            <p>
              Cloud Native Summit (CNS) Munich is a local, community-organized event that gathers
              adopters and technologists from open source and cloud native communities.
            </p>
            <div className="text-start">
              <button
                type="button"
                className="button"
                style={{ cursor: 'pointer', marginTop: '2rem' }}
                onClick={() => {
                  window.location.href = '/mission-statement';
                }}
              >
                Mission Statement
              </button>
            </div>
          </div>
          <div className="about-text">
            <p>
              This is the fourth edition in Munich, aiming to bring the community together. The
              event provides a platform for professionals and experts from all levels and
              backgrounds to learn, network, and share their knowledge about cloud-native
              technologies.
            </p>
          </div>
        </div>

        {/* Video Section */}
        <div className="video-section">
          <div style={{ aspectRatio: '16/9', width: '100%' }}>
            <iframe
              style={{ width: '100%', height: '100%', borderRadius: '0.5rem' }}
              className="m:w-full m:h-full"
              src="https://www.youtube.com/embed/Ty4B7VPdWDs?si=vzN9-vrqYSNDA3Gc&mute=1&autoplay=1&loop=1&playlist=Ty4B7VPdWDs&cc_load_policy=0&iv_load_policy=3"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen
            ></iframe>
          </div>
        </div>
      </div>

      {/* What to Expect Section */}
      <div className="expect-section">
        <h2 className="section-title">What to Expect?</h2>
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
      {/* What to Expect Section */}
      <div className="expect-section" id="tickets">
        <h2 className="section-title">Get your Ticket now!</h2>
        <div className="expect-section">
          {/* Ticket Section */}
          <Tickets />
        </div>
      </div>
    </div>
  </section>
);

export default Info;

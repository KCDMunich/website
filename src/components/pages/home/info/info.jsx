import { Users, Calendar, MapPin } from 'lucide-react';
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
          <iframe
            style={{
              width: '1284px',
              height: '702px',
              borderRadius: '0.5rem',
            }}
            src="https://www.youtube.com/embed/Ty4B7VPdWDs?si=vslSzh9_t7l164xg&autoplay=1&mute=1"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
          ></iframe>
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
    </div>
  </section>
);

export default Info;

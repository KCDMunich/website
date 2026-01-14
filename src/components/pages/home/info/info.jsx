import { Calendar, Layers, Sparkles, Users } from 'lucide-react';
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
                  window.location.href = '/vision';
                }}
              >
                Our Vision
              </button>
            </div>
          </div>
          <div className="about-text">
            <p>
              This is the fifth edition in Munich, aiming to bring the community together. The event
              provides a platform for professionals and experts from all levels and backgrounds to
              learn, network, and share their knowledge about cloud-native technologies.
            </p>
          </div>
        </div>

        {/* Video Section */}
        <div className="video-section">
          <div style={{ aspectRatio: '16/9', width: '100%' }}>
            <iframe
              style={{ width: '100%', height: '100%', borderRadius: '0.5rem' }}
              className="m:w-full m:h-full"
              src="https://www.youtube.com/embed/R1dcUSnTmn8?si=731vIyVq8cFDLvmh&mute=1&autoplay=1&loop=1&playlist=R1dcUSnTmn8&cc_load_policy=0&iv_load_policy=3"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
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
            <Sparkles className="feature-icon" />
            <div className="feature-content">
              <h3 className="feature-title">Innovation in Focus</h3>
              <p className="feature-text">
                Cloud Native, Open Source, AI Engineering, Platform Engineering & more
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="tracks-section">
        <h2 className="section-title">Call for Proposals</h2>
        <p className="section-subtitle">
          We welcome stories, lessons learned, and hands-on insights from practitioners across the
          community.
        </p>
        <p className="section-subtitle">Our Call for Proposals opens soon! Stay tuned.</p>
        <div className="features-grid">
          <div className="feature-item">
            <Sparkles className="feature-icon" />
            <div className="feature-content">
              <h3 className="feature-title">Categorize</h3>
              <p className="feature-text">
                Cloud Native &amp; Open Source, AI Engineering, Platform Engineering &amp; more
              </p>
            </div>
          </div>

          <div className="feature-item">
            <Layers className="feature-icon" />
            <div className="feature-content">
              <h3 className="feature-title">Levels</h3>
              <p className="feature-text">Introduction, Tech Talk, Method &amp; Frameworks</p>
            </div>
          </div>

          <div className="feature-item">
            <Calendar className="feature-icon" />
            <div className="feature-content">
              <h3 className="feature-title">Types</h3>
              <p className="feature-text">Talks, Lightning Talks, Panel Discussions & Workshops</p>
            </div>
          </div>
        </div>
      </div>
      {/* What to Expect Section
      <div className="expect-section" id="tickets">
        <h2 className="section-title">Get your Ticket now!</h2>
        <div className="expect-section">
           <Tickets />
        </div>
      </div>
      */}
    </div>
  </section>
);

export default Info;

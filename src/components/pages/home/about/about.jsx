import React from 'react';

import './about.css';

const About = () => (
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
              This is the fifth edition in Munich, aiming to bring the community together. The
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
    </div>
  </section>
);

export default About;

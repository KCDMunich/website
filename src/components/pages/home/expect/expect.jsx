import { Calendar, Sparkles, Users } from 'lucide-react';
import React from 'react';

import './expect.css';

const Expect = () => (
  <section className="info-section">
    <div className="info-container">
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
                Cloud Native, Open Source, AI Engineering, Platform Engineering &amp; more
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Expect;

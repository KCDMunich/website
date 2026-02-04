import { Calendar, Layers, Sparkles } from 'lucide-react';
import React from 'react';

import './cfp-teaser.css';

const CfpTeaser = () => (
  <section className="info-section safe-paddings">
    <div className="container">
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
    </div>
  </section>
);

export default CfpTeaser;

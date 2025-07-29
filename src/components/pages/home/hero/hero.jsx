import { StaticImage } from 'gatsby-plugin-image';
import { Calendar, MapPin, Users, Play, ArrowRight } from 'lucide-react';
import React, { useState, useEffect, useMemo } from 'react';
import './hero.css';

const Hero = () => {
  const [selectedVideo, setSelectedVideo] = useState('');

  // YouTube Playlist videos
  const playlistVideos = useMemo(
    () => [
      'g-sZwa52DNE',
      'tWHHmb-v6Y0',
      'o3MYeUWhETo',
      'oCFNrXWN-HE',
      'Ty4B7VPdWDs',
      'oYtguGxGeUw',
      'oohD1uXGqj8',
      'pxpBlLpt-BQ',
      'r7euuyxcjhA',
      'w8-46FhmxEQ',
      'xsl86VcsCNA',
      'xtAZdRVdc3U',
      'ykHlvBW564I',
      'lgQ-qhPaalU',
      'mH7B-17zSmM',
      'cCFYrZpwS7s',
      // Add more video IDs from the playlist as needed
    ],
    []
  );

  useEffect(() => {
    // Randomly select a video from the playlist
    const randomVideo = playlistVideos[Math.floor(Math.random() * playlistVideos.length)];
    setSelectedVideo(randomVideo);
  }, [playlistVideos]);

  return (
    <div className="hero-container">
      <section className="hero-section">
        {/* Background Video */}
        <div className="hero-video-background">
          {selectedVideo && (
            <iframe
              src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1&mute=1&loop=1&playlist=${selectedVideo}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&start=10`}
              title="Background Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              className="hero-video"
              allowFullScreen
            />
          )}
          <div className="hero-video-overlay" />
        </div>

        <div className="hero-content-container">
          <div className="hero-grid">
            {/* Left column - Content */}
            <div className="hero-left-column fade-in-up">
              {/* Date Badge */}
              <div className="hero-badge-container">
                <span className="hero-badge">
                  <Calendar className="hero-badge-icon" />
                  July 21st – 22nd, 2025
                </span>
              </div>

              {/* Title */}
              <h1 className="hero-title">
                Cloud Native Summit
                <span className="hero-title-accent"> Munich</span>
              </h1>

              {/* Description */}
              <p className="hero-description">
                Experience the future of cloud native technology in the heart of Bavaria. Join
                developers, platform engineers, and IT professionals for two days of cutting-edge
                insights and networking.
              </p>

              {/* Feature List */}
              <div className="hero-feature-grid">
                <div className="hero-feature-card">
                  <div className="hero-feature-icon">
                    <Calendar className="hero-icon" />
                  </div>
                  <div className="hero-feature-content">
                    <h3>Two-day Event</h3>
                    <p>Comprehensive technical sessions</p>
                  </div>
                </div>
                <div className="hero-feature-card">
                  <div className="hero-feature-icon">
                    <MapPin className="hero-icon" />
                  </div>
                  <div className="hero-feature-content">
                    <h3>Munich, Germany</h3>
                    <p>Central European tech hub</p>
                  </div>
                </div>
                <div className="hero-feature-card">
                  <div className="hero-feature-icon">
                    <Users className="hero-icon" />
                  </div>
                  <div className="hero-feature-content">
                    <h3>Community Driven</h3>
                    <p>By developers, for developers</p>
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="hero-cta-container">
                <button
                  type="button"
                  className="hero-cta-primary"
                  onClick={() => (window.location.href = '#tickets')}
                >
                  <span>Get Your Ticket</span>
                  <ArrowRight className="hero-cta-icon" />
                </button>
                <button
                  type="button"
                  className="hero-cta-secondary"
                  onClick={() => (window.location.href = '#agenda')}
                >
                  <Play className="hero-cta-icon" />
                  <span>View Agenda</span>
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="hero-trust-indicators">
                <div className="hero-trust-item">
                  <span className="hero-trust-number">500+</span>
                  <span className="hero-trust-label">Attendees</span>
                </div>
                <div className="hero-trust-item">
                  <span className="hero-trust-number">50+</span>
                  <span className="hero-trust-label">Sessions</span>
                </div>
                <div className="hero-trust-item">
                  <span className="hero-trust-number">100%</span>
                  <span className="hero-trust-label">Community</span>
                </div>
              </div>
            </div>

            {/* Right Column - Enhanced Illustration */}
            <div className="hero-right-column fade-in-scale">
              <div className="hero-illustration-container">
                <div className="hero-illustration-wrapper">
                  {/* Logo removed */}
                  {/* Floating Elements */}
                  <div className="hero-floating-element hero-floating-1">
                    <div className="hero-floating-dot" />
                  </div>
                  <div className="hero-floating-element hero-floating-2">
                    <div className="hero-floating-dot" />
                  </div>
                  <div className="hero-floating-element hero-floating-3">
                    <div className="hero-floating-dot" />
                  </div>
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

import { Users, Calendar, MapPin } from 'lucide-react';
import React from 'react';

const Info = ({data}) => (
    <section className="info-section">
        <div className="info-container">
            {/* About CNS Section */}
            <div className="about-section">
                <h2 className="section-title">{data.info.title}</h2>

                <div className="about-content">
                    <div className="about-text">
                        <p>{data.info.description}</p>
                        <div className="text-start">
                            <button
                                type="button"
                                className="button"
                                style={{ cursor: 'pointer', marginTop: '2rem' }}
                                onClick={() => {
                                    window.location.href = data.info.CTA.url;
                                }}
                            >
                                {data.info.CTA.label}
                            </button>
                        </div>
                    </div>
                    <div className="about-text">
                        <p>
                            {data.info.longDescription}
                        </p>
                    </div>
                </div>

                <div className="video-section">
                    <div style={{ aspectRatio: '16/9', width: '100%' }}>
                        <iframe
                            style={{ width: '100%', height: '100%', borderRadius: '0.5rem' }}
                            className="m:w-full m:h-full"
                            src={data.info.video.url}
                            title={data.info.video.title}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
            </div>

            {/* What to Expect Section */}
            <div className="expect-section">
                <h2 className="section-title">{data.info.extra.title}</h2>
                <div className="features-grid">
                    <div className="feature-item">
                        <Users className="feature-icon" />
                        <div className="feature-content">
                            <h3 className="feature-title">{data.info.extra.boxes.networking.title}</h3>
                            <p className="feature-text">{data.info.extra.boxes.networking.description}</p>
                        </div>
                    </div>

                    <div className="feature-item">
                        <Calendar className="feature-icon" />
                        <div className="feature-content">
                            <h3 className="feature-title">{data.info.extra.boxes.talks.title}</h3>
                            <p className="feature-text">{data.info.extra.boxes.talks.description}</p>
                        </div>
                    </div>

                    <div className="feature-item">
                        <MapPin className="feature-icon" />
                        <div className="feature-content">
                            <h3 className="feature-title">{data.info.extra.boxes.workshop.title}</h3>
                            <p className="feature-text">{data.info.extra.boxes.workshop.description}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

export default Info;

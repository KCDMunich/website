"use client";
import React from 'react';
import Image from "next/image";
import { Calendar, MapPin, Users } from 'lucide-react';
import "@/components/hero/hero.css";
import "@/styles/globals.css";


const Hero = ({data}) => {
    return (
        <div className="hero-container">
            <section className="hero-section">
                <div className="hero-background-grid" />

                <div className="hero-content-container">
                    <div className="hero-grid">
                        <div className="hero-left-column fade-in-up">
                            <span className="hero-badge">{data.hero.badgeDate}</span>
                            <h1 className="hero-title">{data.hero.title}</h1>
                            <p className="hero-description">
                                {data.hero.description}
                            </p>
                            <ul className="hero-feature-list">
                                <li className="hero-feature-item">
                                    <Calendar className="hero-icon" />
                                    <span>{data.hero.featureList.days}</span>
                                </li>
                                <li className="hero-feature-item">
                                    <MapPin className="hero-icon" />
                                    <span>{data.hero.featureList.location}</span>
                                </li>
                                <li className="hero-feature-item">
                                    <Users className="hero-icon" />
                                    <span>{data.hero.featureList.audience}</span>
                                </li>
                            </ul>

                            <p className="hero-description">
                                {data.hero.motto}
                            </p>
                            <div className="hero-cta-container">
                                <button
                                    type="button"
                                    className="button"
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => (window.location.href = data.hero.CTA.tickets.url)}
                                >
                                    {data.hero.CTA.tickets.label}
                                </button>
                                {
                                    <button
                                        type="button"
                                        className="hero-cta-secondary"
                                        onClick={() => (window.location.href = data.hero.CTA.sponsor.url)}
                                    >
                                        {data.hero.CTA.sponsor.label}
                                    </button>
                                }
                                {
                                    <button
                                        type="button"
                                        className="hero-cta-secondary"
                                        onClick={() => (window.location.href = data.hero.CTA.cfp.url)}
                                    >
                                        {data.hero.CTA.cfp.label}
                                    </button>
                                }
                            </div>
                        </div>

                        <div className="hero-right-column fade-in-scale">
                            <div className="hero-illustration-container">
                                <div
                                    style={{
                                        position: 'relative',
                                        aspectRatio: '1',
                                        borderRadius: '0.75rem',
                                        overflow: 'hidden',
                                    }}
                                >
                                    <Image
                                        src={data.hero.image}
                                        alt={"Hero Image"}
                                        width={500}
                                        height={500}
                                    />
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

"use client"

import Link from "next/link"
import { Linkedin, Globe, Twitter, Github } from "lucide-react"
import "./speakers-list.css"

export default function SpeakersList({ speakers }) {
    // Sort speakers alphabetically by name
    const displaySpeakers = speakers.sort((a, b) => a.name.localeCompare(b.name))

    return (
        <div className="speakers-container">
            <div className="speakers-header">
                <h1 className="speakers-title">Our Speakers</h1>
                <p className="speakers-description">
                    Meet the experts who will be sharing their knowledge and experience at Cloud Native Days Italy 2025.
                </p>
            </div>

            <div className="speakers-grid">
                {displaySpeakers.map((speaker) => (
                    <div key={speaker.id} className="speaker-card">
                        <div className="speaker-card-content">
                            <div className="speaker-image-wrapper">
                                <img src={speaker.image || "/images/team/profile.webp"} alt={speaker.name} className="speaker-image" />
                                {speaker.isMC && (
                                    <div className="mc-badge" title={`Master of Ceremony for ${speaker.mcDay}`}>
                                        MC
                                    </div>
                                )}
                            </div>

                            <div className="speaker-details">
                                <h2 className="speaker-name">{speaker.name}</h2>
                                <p className="speaker-role">{speaker.role}</p>
                                <p className="speaker-company">{speaker.company}</p>
                            </div>

                            <div className="speaker-social">
                                {speaker.linkedin && (
                                    <a
                                        href={speaker.linkedin}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="social-icon"
                                        aria-label={`${speaker.name}'s LinkedIn profile`}
                                    >
                                        <Linkedin size={16} />
                                    </a>
                                )}

                                {speaker.twitter && (
                                    <a
                                        href={speaker.twitter}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="social-icon"
                                        aria-label={`${speaker.name}'s Twitter profile`}
                                    >
                                        <Twitter size={16} />
                                    </a>
                                )}

                                {speaker.github && (
                                    <a
                                        href={speaker.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="social-icon"
                                        aria-label={`${speaker.name}'s GitHub profile`}
                                    >
                                        <Github size={16} />
                                    </a>
                                )}

                                {speaker.website && (
                                    <a
                                        href={speaker.website}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="social-icon"
                                        aria-label={`${speaker.name}'s website`}
                                    >
                                        <Globe size={16} />
                                    </a>
                                )}
                            </div>

                            {speaker.tags && speaker.tags.length > 0 && (
                                <div className="speaker-tags">
                                    {speaker.tags.slice(0, 3).map((tag) => (
                                        <span key={tag} className="speaker-tag">
                      {tag}
                    </span>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="speaker-footer">
                            <Link href={`/speakers/${speaker.id}`} className="view-profile">
                                View Profile
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    )
}

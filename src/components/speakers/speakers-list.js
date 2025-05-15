"use client"

import Link from "next/link"
import { Linkedin, Globe, Twitter, Github } from "lucide-react"

export default function SpeakersList({ speakers }) {
    // Filter out TBA speakers for display
    const displaySpeakers = speakers.filter((speaker) => !speaker.name.includes("TBA"))

    // Sort speakers alphabetically by name
    displaySpeakers.sort((a, b) => a.name.localeCompare(b.name))

    // Count TBA speakers
    const tbaCount = speakers.filter((speaker) => speaker.name.includes("TBA")).length

    return (
        <div className="container">
            <div className="page-header">
                <h1 className="page-title">Our Speakers</h1>
                <p className="page-description">
                    Meet the experts who will be sharing their knowledge and experience at Cloud Native Days Italy 2025.
                </p>
            </div>

            {tbaCount > 0 && (
                <div
                    style={{
                        backgroundColor: "#ebf8ff",
                        borderRadius: "12px",
                        padding: "1.5rem",
                        margin: "0 auto 3rem",
                        textAlign: "center",
                        borderLeft: "4px solid #4299e1",
                        maxWidth: "800px",
                    }}
                >
                    <p>We're in the process of confirming {tbaCount} more speakers. Check back soon for updates!</p>
                </div>
            )}

            <div className="speakers-grid">
                {displaySpeakers.map((speaker) => (
                    <div key={speaker.id} className="card speaker-card">
                        <div className="card-body speaker-card-content">
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
                                <div className="tags-list" style={{ justifyContent: "center", marginTop: "auto" }}>
                                    {speaker.tags.slice(0, 3).map((tag) => (
                                        <span key={tag} className="tag">
                      {tag}
                    </span>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="card-footer" style={{ textAlign: "center" }}>
                            <Link href={`/speakers/${speaker.id}`} className="btn btn-primary" style={{ width: "100%" }}>
                                View Profile
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

            {tbaCount > 0 && (
                <div
                    style={{
                        textAlign: "center",
                        padding: "3rem 1rem",
                        backgroundColor: "#f7fafc",
                        borderRadius: "12px",
                        marginTop: "2rem",
                    }}
                >
                    <h2 style={{ fontSize: "1.8rem", fontWeight: "700", marginBottom: "1rem", color: "#2d3748" }}>
                        More Speakers Coming Soon
                    </h2>
                    <p style={{ fontSize: "1.1rem", color: "#718096", maxWidth: "600px", margin: "0 auto", lineHeight: "1.6" }}>
                        We're working on confirming additional speakers for Cloud Native Days Italy 2025. Check back regularly for
                        updates!
                    </p>
                </div>
            )}
        </div>
    )
}

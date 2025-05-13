import Link from "next/link"
import { Calendar, Clock, MapPin, Linkedin } from "lucide-react"
import "./speaker-detail.css"

export default function SpeakerDetail({ speaker, sessions }) {
    // Sort sessions by start time
    const sortedSessions = [...sessions].sort((a, b) => {
        if (!a.startTime) return 1
        if (!b.startTime) return -1
        return new Date(a.startTime) - new Date(b.startTime)
    })

    return (
        <div className="speaker-detail-container">
            <div className="speaker-profile">
                <div className="speaker-header">
                    <div className="speaker-image-container">
                        <img src={speaker.image || "/images/team/profile.webp"} alt={speaker.name} className="speaker-image" />
                        {speaker.isMC && (
                            <div className="mc-badge" title={`Master of Ceremony for ${speaker.mcDay}`}>
                                MC
                            </div>
                        )}
                    </div>
                    <div className="speaker-info">
                        <h1 className="speaker-name">{speaker.name}</h1>
                        <p className="speaker-role">{speaker.role}</p>
                        {speaker.company && (
                            <p className="speaker-company">
                                {speaker.companyUrl ? (
                                    <a href={speaker.companyUrl} target="_blank" rel="noopener noreferrer" className="company-link">
                                        {speaker.company}
                                    </a>
                                ) : (
                                    speaker.company
                                )}
                            </p>
                        )}

                        <div className="speaker-social">
                            {speaker.linkedin && (
                                <a
                                    href={speaker.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="social-link linkedin"
                                    aria-label={`${speaker.name}'s LinkedIn profile`}
                                >
                                    <Linkedin size={20} />
                                    <span>LinkedIn</span>
                                </a>
                            )}
                        </div>
                    </div>
                </div>

                {speaker.bio && (
                    <div className="speaker-bio">
                        <h2 className="bio-title">About</h2>
                        <p className="bio-text">{speaker.bio}</p>
                    </div>
                )}
            </div>

            {sortedSessions.length > 0 && (
                <div className="speaker-sessions">
                    <h2 className="sessions-title">
                        {speaker.isMC
                            ? `${speaker.name} is a Master of Ceremony for ${speaker.mcDay}`
                            : `Sessions by ${speaker.name}`}
                    </h2>

                    <div className="sessions-grid">
                        {sortedSessions.map((session) => {
                            // Format date
                            const sessionDate = session.startTime
                                ? new Date(session.startTime).toLocaleDateString("en-US", {
                                    weekday: "long",
                                    month: "long",
                                    day: "numeric",
                                    year: "numeric",
                                })
                                : "Date TBA"

                            // Format time
                            const startTime = session.startTime
                                ? new Date(session.startTime).toLocaleTimeString("en-US", {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    hour12: true,
                                })
                                : ""

                            const endTime = session.endTime
                                ? new Date(session.endTime).toLocaleTimeString("en-US", {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    hour12: true,
                                })
                                : ""

                            const timeString = startTime && endTime ? `${startTime} - ${endTime}` : "Time TBA"

                            return (
                                <Link href={`/agenda/${session.id}`} key={session.id} className="session-card">
                                    <div className={`session-type ${session.type}`}>
                                        {session.type.charAt(0).toUpperCase() + session.type.slice(1)}
                                    </div>

                                    <h3 className="session-title">{session.title}</h3>

                                    {session.description && <p className="session-description">{session.description}</p>}

                                    <div className="session-details">
                                        <div className="detail-item">
                                            <Calendar size={16} />
                                            <span>{sessionDate}</span>
                                        </div>

                                        <div className="detail-item">
                                            <Clock size={16} />
                                            <span>{timeString}</span>
                                        </div>

                                        {session.room && (
                                            <div className="detail-item">
                                                <MapPin size={16} />
                                                <span>{session.room}</span>
                                            </div>
                                        )}
                                    </div>

                                    {session.tags && session.tags.length > 0 && (
                                        <div className="session-tags">
                                            {session.tags.map((tag) => (
                                                <span key={tag} className="session-tag">
                          {tag}
                        </span>
                                            ))}
                                        </div>
                                    )}
                                </Link>
                            )
                        })}
                    </div>
                </div>
            )}

            <div className="back-link-container">
                <Link href="/speakers" className="back-link">
                    ← Back to All Speakers
                </Link>
            </div>
        </div>
    )
}

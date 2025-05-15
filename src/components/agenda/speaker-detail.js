import Link from "next/link"
import { Calendar, Clock, MapPin, Linkedin } from "lucide-react"

export default function SpeakerDetail({ speaker, sessions }) {
    // Sort sessions by start time
    const sortedSessions = [...sessions].sort((a, b) => {
        if (!a.startTime) return 1
        if (!b.startTime) return -1
        return new Date(a.startTime) - new Date(b.startTime)
    })

    return (
        <div className="container">
            <div className="card">
                <div className="card-header" style={{ display: "flex", alignItems: "center", padding: "2rem" }}>
                    <div style={{ position: "relative", marginRight: "2rem" }}>
                        <img
                            src={speaker.image || "/images/team/profile.webp"}
                            alt={speaker.name}
                            style={{
                                width: "100px",
                                height: "100px",
                                borderRadius: "50%",
                                objectFit: "cover",
                                border: "3px solid white",
                                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                            }}
                        />
                        {speaker.isMC && (
                            <div className="mc-badge" title={`Master of Ceremony for ${speaker.mcDay}`}>
                                MC
                            </div>
                        )}
                    </div>
                    <div>
                        <h1 className="detail-title" style={{ marginBottom: "0.5rem" }}>
                            {speaker.name}
                        </h1>
                        <p className="speaker-role">{speaker.role}</p>
                        {speaker.company && (
                            <p className="speaker-company">
                                {speaker.companyUrl ? (
                                    <a
                                        href={speaker.companyUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{ color: "#4299e1", textDecoration: "none" }}
                                    >
                                        {speaker.company}
                                    </a>
                                ) : (
                                    speaker.company
                                )}
                            </p>
                        )}

                        <div style={{ display: "flex", gap: "0.75rem", marginTop: "1rem" }}>
                            {speaker.linkedin && (
                                <a
                                    href={speaker.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-secondary"
                                    aria-label={`${speaker.name}'s LinkedIn profile`}
                                    style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
                                >
                                    <Linkedin size={18} />
                                    <span>LinkedIn</span>
                                </a>
                            )}
                        </div>
                    </div>
                </div>

                {speaker.bio && (
                    <div className="card-body">
                        <h2 className="section-title">About</h2>
                        <p style={{ fontSize: "1.05rem", color: "#4a5568", lineHeight: "1.7", whiteSpace: "pre-line" }}>
                            {speaker.bio}
                        </p>
                    </div>
                )}
            </div>

            {sortedSessions.length > 0 && (
                <div style={{ marginTop: "3rem" }}>
                    <h2 className="section-title">
                        {speaker.isMC
                            ? `${speaker.name} is a Master of Ceremony for ${speaker.mcDay}`
                            : `Sessions by ${speaker.name}`}
                    </h2>

                    <div className="speakers-grid">
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
                                <Link href={`/agenda/${session.id}`} key={session.id} className="card">
                                    <div className="card-body">
                                        <div className="session-type-badge" className={`session-type-badge ${session.type}`}>
                                            {session.type.charAt(0).toUpperCase() + session.type.slice(1)}
                                        </div>

                                        <h3 className="session-title">{session.title}</h3>

                                        {session.description && <p className="session-description">{session.description}</p>}

                                        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginTop: "1.5rem" }}>
                                            <div className="meta-item">
                                                <Calendar size={16} />
                                                <span>{sessionDate}</span>
                                            </div>

                                            <div className="meta-item">
                                                <Clock size={16} />
                                                <span>{timeString}</span>
                                            </div>

                                            {session.room && (
                                                <div className="meta-item">
                                                    <MapPin size={16} />
                                                    <span>{session.room}</span>
                                                </div>
                                            )}
                                        </div>

                                        {session.tags && session.tags.length > 0 && (
                                            <div className="tags-list" style={{ marginTop: "1rem" }}>
                                                {session.tags.map((tag) => (
                                                    <span key={tag} className="tag">
                            {tag}
                          </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
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

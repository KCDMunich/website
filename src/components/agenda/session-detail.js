import Link from "next/link"
import { Calendar, Clock, MapPin, Tag } from "lucide-react"

export default function SessionDetail({ session }) {
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
        <div className="container">
            <div className="detail-header">
                <div className={`session-type-badge ${session.type}`}>
                    {session.type.charAt(0).toUpperCase() + session.type.slice(1)}
                </div>
                <h1 className="detail-title">{session.title}</h1>

                <div className="detail-meta">
                    <div className="meta-item">
                        <Calendar size={18} />
                        <span>{sessionDate}</span>
                    </div>

                    <div className="meta-item">
                        <Clock size={18} />
                        <span>{timeString}</span>
                    </div>

                    {session.room && (
                        <div className="meta-item">
                            <MapPin size={18} />
                            <span>{session.room}</span>
                        </div>
                    )}

                    {session.level && (
                        <div className="meta-item">
                            <Tag size={18} />
                            <span>Level: {session.level}</span>
                        </div>
                    )}
                </div>
            </div>

            <div className="detail-content">
                {session.description && (
                    <div style={{ marginBottom: "2rem" }}>
                        <h2 className="section-title">Description</h2>
                        <p style={{ fontSize: "1.05rem", color: "#4a5568", lineHeight: "1.7" }}>
                            {session.description.split("\n").map((line, index) => (
                                <span key={index}>
                                    {line}
                                    <br />
                                </span>
                            ))}
                        </p>

                    </div>
                )}

                {session.tags && session.tags.length > 0 && (
                    <div style={{ marginBottom: "2rem" }}>
                        <h2 className="section-title">Topics</h2>
                        <div className="tags-list">
                            {session.tags.map((tag) => (
                                <span key={tag} className="tag" style={{ fontSize: "0.9rem", padding: "0.4rem 0.8rem" }}>
                  {tag}
                </span>
                            ))}
                        </div>
                    </div>
                )}

                {session.speakers && session.speakers.length > 0 && (
                    <div>
                        <h2 className="section-title">{session.speakers.length > 1 ? "Speakers" : "Speaker"}</h2>

                        <div className="speakers-grid">
                            {session.speakers.map((speaker) => (
                                <Link href={`/speakers/${speaker.id}`} key={speaker.id} className="card">
                                    <div className="card-body" style={{ display: "flex", alignItems: "center" }}>
                                        <div
                                            style={{
                                                width: "60px",
                                                height: "60px",
                                                borderRadius: "50%",
                                                overflow: "hidden",
                                                marginRight: "1rem",
                                                border: "2px solid white",
                                                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                                                flexShrink: "0",
                                            }}
                                        >
                                            <img
                                                src={speaker.image || "/images/team/profile.webp"}
                                                alt={speaker.name}
                                                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                            />
                                        </div>

                                        <div>
                                            <h3 className="speaker-name" style={{ fontSize: "1.1rem" }}>
                                                {speaker.name}
                                            </h3>
                                            <p className="speaker-role">{speaker.role}</p>
                                            {speaker.company && <p className="speaker-company">{speaker.company}</p>}
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <div className="back-link-container">
                <Link href="/agenda" className="back-link">
                    ← Back to Agenda
                </Link>
            </div>
        </div>
    )
}

import Link from "next/link"
import { Calendar, Clock, MapPin, Tag } from "lucide-react"
import "./session-detail.css"

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
        <div className="session-detail-container">
            <div className="session-header">
                <div className={`session-type ${session.type}`}>
                    {session.type.charAt(0).toUpperCase() + session.type.slice(1)}
                </div>
                <h1 className="session-title">{session.title}</h1>

                <div className="session-meta">
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

            <div className="session-content">
                {session.description && (
                    <div className="session-description">
                        <h2 className="section-title">Description</h2>
                        <p>{session.description}</p>
                    </div>
                )}

                {session.tags && session.tags.length > 0 && (
                    <div className="session-tags">
                        <h2 className="section-title">Topics</h2>
                        <div className="tags-list">
                            {session.tags.map((tag) => (
                                <span key={tag} className="session-tag">
                  {tag}
                </span>
                            ))}
                        </div>
                    </div>
                )}

                {session.speakers && session.speakers.length > 0 && (
                    <div className="session-speakers">
                        <h2 className="section-title">{session.speakers.length > 1 ? "Speakers" : "Speaker"}</h2>

                        <div className="speakers-list">
                            {session.speakers.map((speaker) => (
                                <Link href={`/speakers/${speaker.id}`} key={speaker.id} className="speaker-card">
                                    <div className="speaker-image-container">
                                        <img
                                            src={speaker.image || "/images/team/profile.webp"}
                                            alt={speaker.name}
                                            className="speaker-image"
                                        />
                                    </div>

                                    <div className="speaker-info">
                                        <h3 className="speaker-name">{speaker.name}</h3>
                                        <p className="speaker-role">{speaker.role}</p>
                                        {speaker.company && <p className="speaker-company">{speaker.company}</p>}
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

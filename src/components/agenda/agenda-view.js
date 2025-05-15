"use client"
import { useState } from "react"
import Link from "next/link"

export default function AgendaView({ eventStructure, sessions, speakers }) {
    // Default to conference day
    const [selectedDayId, setSelectedDayId] = useState(eventStructure.days[1].id)

    // Get the selected day object
    const currentDay = eventStructure.days.find((day) => day.id === selectedDayId)

    // Get time slots for the selected day
    const timeSlots = eventStructure.timeSlots[selectedDayId] || []

    // Filter sessions for the selected day
    const daySessions = sessions.filter((session) => session.dayId === selectedDayId)

    // Get MCs for the selected day
    const dayMCIds = eventStructure.dayMCs[selectedDayId] || []
    const dayMCs = dayMCIds.map((mcId) => speakers.find((speaker) => speaker.id === mcId)).filter(Boolean)

    // Group sessions by time slot
    const sessionsByTimeSlot = {}
    timeSlots.forEach((timeSlot) => {
        sessionsByTimeSlot[timeSlot.id] = daySessions.filter((session) => session.timeSlotId === timeSlot.id)
    })

    // Get room info for each track
    const trackRoomMap = {}
    eventStructure.tracks.forEach((track) => {
        const room = eventStructure.rooms.find((room) => room.id === track.roomId)
        trackRoomMap[track.id] = {
            trackName: track.name,
            roomName: room ? room.name : "TBA",
        }
    })

    return (
        <div className="container">
            <div className="page-header">
                <h1 className="page-title">Conference Agenda</h1>
                <p className="page-description">Explore our schedule of talks, workshops, and networking opportunities.</p>

                {/* Day selector */}
                <div className="day-selector">
                    {eventStructure.days.map((day) => (
                        <button
                            key={day.id}
                            className={`day-button ${selectedDayId === day.id ? "day-button-active" : ""}`}
                            onClick={() => setSelectedDayId(day.id)}
                        >
                            {day.name}
                            <span className="day-date">
                {new Date(day.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                })}
              </span>
                        </button>
                    ))}
                </div>

                {/* Masters of Ceremony */}
                {dayMCs.length > 0 && (
                    <div className="day-mcs">
                        <h2 className="section-title">Masters of Ceremony</h2>
                        <div className="speakers-grid">
                            {dayMCs.map((mc) => (
                                <Link href={`/speakers/${mc.id}`} key={mc.id} className="card speaker-card">
                                    <div className="card-body speaker-card-content">
                                        <div className="speaker-image-wrapper">
                                            <img src={mc.image || "/images/team/profile.webp"} alt={mc.name} className="speaker-image" />
                                            <div className="mc-badge">MC</div>
                                        </div>
                                        <h3 className="speaker-name">{mc.name}</h3>
                                        <p className="speaker-role">{mc.role}</p>
                                        {mc.company && <p className="speaker-company">{mc.company}</p>}
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <div
                className="agenda-tracks-header"
                style={{
                    display: "grid",
                    gridTemplateColumns: "120px repeat(auto-fit, minmax(200px, 1fr))",
                    gap: "1rem",
                    marginBottom: "1rem",
                }}
            >
                <div style={{ fontWeight: "600", color: "#2d3748", padding: "1rem 0" }}>Time</div>
                {eventStructure.tracks.map((track) => (
                    <div
                        key={track.id}
                        style={{
                            textAlign: "center",
                            padding: "1rem",
                            backgroundColor: "#f7fafc",
                            borderRadius: "8px",
                            border: "1px solid #e2e8f0",
                        }}
                    >
                        <h3 style={{ fontSize: "1.1rem", fontWeight: "600", marginBottom: "0.5rem", color: "#2d3748" }}>
                            {track.name}
                        </h3>
                        <p style={{ fontSize: "0.9rem", color: "#718096" }}>{trackRoomMap[track.id]?.roomName}</p>
                    </div>
                ))}
            </div>

            <div className="agenda-timeline">
                {timeSlots.map((timeSlot) => {
                    const slotSessions = sessionsByTimeSlot[timeSlot.id] || []
                    const hasFullWidthSession = slotSessions.some((session) => session.isFullWidth)

                    return (
                        <div key={timeSlot.id} className="agenda-grid" style={{ marginBottom: "1.5rem" }}>
                            <div className="time-label">{timeSlot.label}</div>

                            {hasFullWidthSession ? (
                                <div style={{ gridColumn: "2 / -1" }}>
                                    {slotSessions.map((session) => {
                                        // Find speakers for this session
                                        const sessionSpeakers = session.speakerIds
                                            ? session.speakerIds.map((id) => speakers.find((s) => s.id === id)).filter(Boolean)
                                            : []

                                        return (
                                            <Link
                                                href={session.type === "break" ? "#" : `/agenda/${session.id}`}
                                                key={session.id}
                                                className={`session-card ${session.type}`}
                                                onClick={(e) => session.type === "break" && e.preventDefault()}
                                            >
                                                <h3 className="session-title">{session.title}</h3>
                                                {session.description && <p className="session-description">{session.description}</p>}

                                                {sessionSpeakers.length > 0 && (
                                                    <div style={{ marginTop: "auto" }}>
                                                        {sessionSpeakers.map((speaker) => (
                                                            <div key={speaker.id} className="speaker-info">
                                                                <img
                                                                    src={speaker.image || "/placeholder.svg"}
                                                                    alt={speaker.name}
                                                                    className="speaker-info-image"
                                                                />
                                                                <div>
                                                                    <p className="speaker-name" style={{ fontSize: "0.85rem", margin: "0" }}>
                                                                        {speaker.name}
                                                                    </p>
                                                                    <p className="speaker-role" style={{ fontSize: "0.75rem", margin: "0" }}>
                                                                        {speaker.role}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </Link>
                                        )
                                    })}
                                </div>
                            ) : (
                                <div className="track-sessions">
                                    {eventStructure.tracks.map((track) => {
                                        const trackSession = slotSessions.find((session) => session.trackId === track.id)

                                        if (!trackSession) {
                                            return (
                                                <div key={track.id} style={{ minHeight: "150px" }}>
                                                    <div
                                                        style={{
                                                            height: "100%",
                                                            backgroundColor: "#f7fafc",
                                                            borderRadius: "8px",
                                                            border: "1px dashed #cbd5e0",
                                                        }}
                                                    ></div>
                                                </div>
                                            )
                                        }

                                        // Find speakers for this session
                                        const sessionSpeakers = trackSession.speakerIds
                                            ? trackSession.speakerIds.map((id) => speakers.find((s) => s.id === id)).filter(Boolean)
                                            : []

                                        return (
                                            <div key={track.id}>
                                                <Link href={`/agenda/${trackSession.id}`} className={`session-card ${trackSession.type}`}>
                                                    <h3 className="session-title">{trackSession.title}</h3>

                                                    {sessionSpeakers.length > 0 && (
                                                        <div style={{ marginTop: "auto" }}>
                                                            {sessionSpeakers.map((speaker) => (
                                                                <div key={speaker.id} className="speaker-info">
                                                                    <img
                                                                        src={speaker.image || "/placeholder.svg"}
                                                                        alt={speaker.name}
                                                                        className="speaker-info-image"
                                                                    />
                                                                    <div>
                                                                        <p className="speaker-name" style={{ fontSize: "0.85rem", margin: "0" }}>
                                                                            {speaker.name}
                                                                        </p>
                                                                        <p className="speaker-role" style={{ fontSize: "0.75rem", margin: "0" }}>
                                                                            {speaker.role}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}

                                                    {trackSession.tags && (
                                                        <div className="tags-list" style={{ marginTop: "1rem" }}>
                                                            {trackSession.tags.slice(0, 2).map((tag) => (
                                                                <span key={tag} className="tag">
                                  {tag}
                                </span>
                                                            ))}
                                                        </div>
                                                    )}
                                                </Link>
                                            </div>
                                        )
                                    })}
                                </div>
                            )}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

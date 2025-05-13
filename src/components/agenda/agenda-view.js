"use client"
import { useState } from "react"
import Link from "next/link"
import "./agenda.css"

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
        <div className="agenda-container">
            <div className="agenda-header">
                <h1 className="agenda-title">Conference Agenda</h1>
                <p className="agenda-description">Explore our schedule of talks, workshops, and networking opportunities.</p>

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
                        <h2 className="mcs-title">Masters of Ceremony</h2>
                        <div className="mcs-list">
                            {dayMCs.map((mc) => (
                                <Link href={`/speakers/${mc.id}`} key={mc.id} className="mc-card">
                                    <div className="mc-image-container">
                                        <img src={mc.image || "/images/team/profile.webp"} alt={mc.name} className="mc-image" />
                                    </div>
                                    <div className="mc-info">
                                        <h3 className="mc-name">{mc.name}</h3>
                                        <p className="mc-role">{mc.role}</p>
                                        {mc.company && (
                                            <p className="mc-company">
                                                {mc.companyUrl ? (
                                                    <span
                                                        onClick={(e) => {
                                                            e.stopPropagation()
                                                            window.open(mc.companyUrl, "_blank", "noopener,noreferrer")
                                                        }}
                                                        className="company-link"
                                                        style={{ cursor: "pointer" }}
                                                    >
                            {mc.company}
                          </span>
                                                ) : (
                                                    mc.company
                                                )}
                                            </p>
                                        )}
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <div className="agenda-tracks-header">
                <div className="time-column">Time</div>
                {eventStructure.tracks.map((track) => (
                    <div key={track.id} className="track-column">
                        <h3 className="track-name">{track.name}</h3>
                        <p className="track-room">{trackRoomMap[track.id]?.roomName}</p>
                    </div>
                ))}
            </div>

            <div className="agenda-timeline">
                {timeSlots.map((timeSlot) => {
                    const slotSessions = sessionsByTimeSlot[timeSlot.id] || []
                    const hasFullWidthSession = slotSessions.some((session) => session.isFullWidth)

                    return (
                        <div key={timeSlot.id} className="time-slot">
                            <div className="time-label">{timeSlot.label}</div>

                            {hasFullWidthSession ? (
                                <div className="full-width-session">
                                    {slotSessions.map((session) => {
                                        // Find speakers for this session
                                        const sessionSpeakers = session.speakerIds
                                            ? session.speakerIds.map((id) => speakers.find((s) => s.id === id)).filter(Boolean)
                                            : []

                                        return (
                                            <Link
                                                href={session.type === "break" ? "#" : `/agenda/${session.id}`}
                                                key={session.id}
                                                className={`session-card full-width ${session.type}`}
                                                onClick={(e) => session.type === "break" && e.preventDefault()}
                                            >
                                                <h3 className="session-title">{session.title}</h3>
                                                {session.description && <p className="session-description">{session.description}</p>}

                                                {sessionSpeakers.length > 0 && (
                                                    <div className="session-speakers">
                                                        {sessionSpeakers.map((speaker) => (
                                                            <div key={speaker.id} className="speaker-info">
                                                                <div className="speaker-image">
                                                                    <img src={speaker.image || "/placeholder.svg"} alt={speaker.name} />
                                                                </div>
                                                                <div className="speaker-details">
                                                                    <p className="speaker-name">{speaker.name}</p>
                                                                    <p className="speaker-role">{speaker.role}</p>
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
                                                <div key={track.id} className="track-slot">
                                                    <div className="empty-slot"></div>
                                                </div>
                                            )
                                        }

                                        // Find speakers for this session
                                        const sessionSpeakers = trackSession.speakerIds
                                            ? trackSession.speakerIds.map((id) => speakers.find((s) => s.id === id)).filter(Boolean)
                                            : []

                                        return (
                                            <div key={track.id} className="track-slot">
                                                <Link href={`/agenda/${trackSession.id}`} className={`session-card ${trackSession.type}`}>
                                                    <h3 className="session-title">{trackSession.title}</h3>

                                                    {sessionSpeakers.length > 0 && (
                                                        <div className="session-speakers">
                                                            {sessionSpeakers.map((speaker) => (
                                                                <div key={speaker.id} className="speaker-info">
                                                                    <div className="speaker-image">
                                                                        <img src={speaker.image || "/placeholder.svg"} alt={speaker.name} />
                                                                    </div>
                                                                    <div className="speaker-details">
                                                                        <p className="speaker-name">{speaker.name}</p>
                                                                        <p className="speaker-role">{speaker.role}</p>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}

                                                    {trackSession.tags && (
                                                        <div className="session-tags">
                                                            {trackSession.tags.slice(0, 2).map((tag) => (
                                                                <span key={tag} className="session-tag">
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

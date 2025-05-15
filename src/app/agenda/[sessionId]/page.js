import SessionDetail from "@/components/agenda/session-detail"
import config from "@/config/website.json"
import eventStructure from "@/config/event-structure.json"
import sessions from "@/config/sessions.json"
import speakers from "@/config/speakers.json"
import { notFound } from "next/navigation"
import Navbar from "@/components/navbar/navbar";
import Footer from "@/components/footer/footer";

// This function is required for static site generation with dynamic routes
export function generateStaticParams() {
    // Return an array of objects with sessionId for each session
    return sessions.sessions
        .filter((session) => session.id) // Ensure session has an ID
        .map((session) => ({
            sessionId: session.id,
        }))
}

export async function generateMetadata({ params }) {
    // Ensure params is awaited
    const sessionId = params?.sessionId ? await params.sessionId : params.sessionId

    const session = sessions.sessions.find((s) => s.id === sessionId)

    if (!session) {
        return {
            title: "Session Not Found",
            description: "The requested session could not be found.",
        }
    }

    return {
        title: `${session.title} - Cloud Native Days Italy 2025`,
        description: session.description || `Join us for this session at Cloud Native Days Italy 2025.`,
    }
}

export default async function SessionPage({ params }) {
    // Ensure params is awaited
    const sessionId = params?.sessionId ? await params.sessionId : params.sessionId

    // Find session
    const session = sessions.sessions.find((s) => s.id === sessionId)

    if (!session) {
        notFound()
    }

    // Find day
    const day = eventStructure.days.find((day) => day.id === session.dayId)

    // Find time slot
    const timeSlot = day ? eventStructure.timeSlots[day.id].find((slot) => slot.id === session.timeSlotId) : null

    // Find track and room
    const track = session.trackId ? eventStructure.tracks.find((track) => track.id === session.trackId) : null

    const room = track && track.roomId ? eventStructure.rooms.find((room) => room.id === track.roomId) : null

    // Find speakers for this session
    const sessionSpeakers = session.speakerIds
        ? session.speakerIds.map((id) => speakers.speakers.find((s) => s.id === id)).filter(Boolean)
        : []

    // Create enhanced session with all information
    const enhancedSession = {
        ...session,
        startTime: timeSlot ? timeSlot.startTime : null,
        endTime: timeSlot ? timeSlot.endTime : null,
        room: room ? room.name : "TBA",
        speakers: sessionSpeakers,
    }

    const speakerNames = sessionSpeakers.map((speaker) => speaker.name).join(", ") || "Various Speakers"

    const schemaData = {
        "@context": "https://schema.org",
        "@type": "Event",
        name: session.title,
        startDate: timeSlot ? timeSlot.startTime : null,
        endTime: timeSlot ? timeSlot.endTime : null,
        eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
        eventStatus: "https://schema.org/EventScheduled",
        location: {
            "@type": "Place",
            name: room ? room.name : "TBA",
            address: {
                "@type": "PostalAddress",
                streetAddress: config.venue.street,
                addressLocality: config.venue.city,
                postalCode: config.venue.zip,
                addressCountry: config.venue.countryCode,
            },
        },
        description: session.description || `A session at ${config.general.event.name} ${config.general.event.year}`,
        image: sessionSpeakers[0]?.image || config.general.event.logo,
        performer: sessionSpeakers.map((speaker) => ({
            "@type": "Person",
            name: speaker.name,
            jobTitle: speaker.role,
            worksFor: {
                "@type": "Organization",
                name: speaker.company,
            },
        })),
        superEvent: {
            "@type": "Event",
            name: `${config.general.event.name} ${config.general.event.year}`,
            url: config.general.event.website,
        },
    }

    return (
        <>
            <Navbar data={config} additionalClassName="!bg-white" homepage="/" />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
            <SessionDetail session={enhancedSession} />
            <Footer data={config} />
        </>
    )
}

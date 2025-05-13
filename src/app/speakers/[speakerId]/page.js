import Navbar from "@/components/navbar/navbar"
import Footer from "@/components/footer/footer"
import SpeakerDetail from "@/components/agenda/speaker-detail"
import config from "@/config/website.json"
import eventStructure from "@/config/event-structure.json"
import sessions from "@/config/sessions.json"
import speakers from "@/config/speakers.json"
import { notFound } from "next/navigation"

// This function is required for static site generation with dynamic routes
export function generateStaticParams() {
    // Return an array of objects with speakerId for each speaker
    return speakers.speakers.map((speaker) => ({
        speakerId: speaker.id,
    }))
}

export async function generateMetadata({ params }) {
    // Ensure params is awaited
    const speakerId = params?.speakerId ? await params.speakerId : params.speakerId

    const speaker = speakers.speakers.find((s) => s.id === speakerId)

    if (!speaker) {
        return {
            title: "Speaker Not Found",
            description: "The requested speaker could not be found.",
        }
    }

    return {
        title: `${speaker.name} - Cloud Native Days Italy 2025`,
        description: speaker.bio || `${speaker.name} is a speaker at Cloud Native Days Italy 2025.`,
    }
}

export default async function SpeakerPage({ params }) {
    // Ensure params is awaited
    const speakerId = params?.speakerId ? await params.speakerId : params.speakerId

    // Find speaker
    const speaker = speakers.speakers.find((s) => s.id === speakerId)

    if (!speaker) {
        notFound()
    }

    // Check if speaker is an MC
    let isMC = false
    let mcDay = null

    for (const [dayId, mcIds] of Object.entries(eventStructure.dayMCs)) {
        if (mcIds.includes(speaker.id)) {
            isMC = true
            // Find day name
            const day = eventStructure.days.find((d) => d.id === dayId)
            mcDay = day ? day.name : dayId
            break
        }
    }

    // Find sessions where this speaker is presenting
    const speakerSessions = sessions.sessions.filter(
        (session) => session.speakerIds && session.speakerIds.includes(speaker.id),
    )

    // Enhance sessions with time and room information
    const enhancedSessions = speakerSessions.map((session) => {
        // Find day
        const day = eventStructure.days.find((day) => day.id === session.dayId)

        // Find time slot
        const timeSlot = day ? eventStructure.timeSlots[day.id].find((slot) => slot.id === session.timeSlotId) : null

        // Find track and room
        const track = session.trackId ? eventStructure.tracks.find((track) => track.id === session.trackId) : null

        const room = track && track.roomId ? eventStructure.rooms.find((room) => room.id === track.roomId) : null

        return {
            ...session,
            startTime: timeSlot ? timeSlot.startTime : null,
            endTime: timeSlot ? timeSlot.endTime : null,
            room: room ? room.name : "TBA",
        }
    })

    const speakerWithMCInfo = {
        ...speaker,
        isMC,
        mcDay,
    }

    const schemaData = {
        "@context": "https://schema.org",
        "@type": "Person",
        name: speaker.name,
        jobTitle: speaker.role,
        worksFor: speaker.company
            ? {
                "@type": "Organization",
                name: speaker.company,
                url: speaker.companyUrl,
            }
            : undefined,
        image: speaker.image,
        sameAs: [speaker.linkedin, speaker.twitter, speaker.github, speaker.website].filter(Boolean),
    }

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
            <Navbar data={config} additionalClassName="!bg-white" homepage="/" />
            <SpeakerDetail speaker={speakerWithMCInfo} sessions={enhancedSessions} />
            <Footer data={config} />
        </>
    )
}

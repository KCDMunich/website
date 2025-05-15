import AgendaView from "@/components/agenda/agenda-view"
import config from "@/config/website.json"
import eventStructure from "@/config/event-structure.json"
import sessions from "@/config/sessions.json"
import speakers from "@/config/speakers.json"
import Navbar from "@/components/navbar/navbar";
import Footer from "@/components/footer/footer";

export const metadata = {
    title: "Cloud Native Days Italy 2025 - Agenda",
    description:
        "Explore the full agenda for Cloud Native Days Italy 2025. Join us for technical talks, workshops, and networking opportunities in Bologna.",
}

export default function AgendaPage() {
    // Create schema data for SEO
    const schemaData = {
        "@context": "https://schema.org",
        "@type": "Event",
        name: `${config.general.event.name} - ${config.general.event.year} Agenda`,
        startDate: eventStructure.days[0].date + "T09:00:00+02:00",
        endDate: eventStructure.days[eventStructure.days.length - 1].date + "T18:00:00+02:00",
        eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
        eventStatus: "https://schema.org/EventScheduled",
        location: {
            "@type": `${config.venue.type}`,
            name: `${config.venue.name}`,
            address: {
                "@type": "PostalAddress",
                streetAddress: `${config.venue.street}`,
                addressLocality: `${config.venue.city}`,
                postalCode: `${config.venue.zip}`,
                addressCountry: `${config.venue.countryCode}`,
            },
        },
        description: `Full agenda for ${config.general.event.name} ${config.general.event.year}`,
        image: `${config.general.event.logo}`,
        organizer: {
            "@type": "Organization",
            name: `${config.general.event.name}`,
            url: `${config.general.event.website}`,
        },
        subEvent: sessions.sessions.map((session) => {
            // Find time slot for this session
            const day = eventStructure.days.find((day) => day.id === session.dayId)
            const timeSlot = day ? eventStructure.timeSlots[day.id].find((slot) => slot.id === session.timeSlotId) : null

            // Find room for this session
            const track = session.trackId ? eventStructure.tracks.find((track) => track.id === session.trackId) : null
            const room = track && track.roomId ? eventStructure.rooms.find((room) => room.id === track.roomId) : null

            // Find speakers for this session
            const sessionSpeakers = session.speakerIds
                ? session.speakerIds.map((id) => speakers.speakers.find((s) => s.id === id)).filter(Boolean)
                : []

            return {
                "@type": "Event",
                name: session.title,
                startDate: timeSlot ? timeSlot.startTime : null,
                endDate: timeSlot ? timeSlot.endTime : null,
                location: {
                    "@type": "Place",
                    name: room ? room.name : "TBA",
                },
                performer: sessionSpeakers.map((speaker) => ({
                    "@type": "Person",
                    name: speaker.name,
                })),
            }
        }),
    }

    return (
        <>
            <Navbar data={config} additionalClassName="!bg-white" homepage="/" />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
            <AgendaView eventStructure={eventStructure} sessions={sessions.sessions} speakers={speakers.speakers} />
            <Footer data={config} />
        </>
    )
}

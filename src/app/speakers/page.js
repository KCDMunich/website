import SpeakersList from "@/components/speakers/speakers-list"
import eventStructure from "@/config/event-structure.json"
import speakers from "@/config/speakers.json"
import Navbar from "@/components/navbar/navbar";
import Footer from "@/components/footer/footer";
import config from "@/config/website.json"

export const metadata = {
    title: "Cloud Native Days Italy 2025 - Speakers",
    description:
        "Meet the speakers for Cloud Native Days Italy 2025. Industry experts and thought leaders sharing their knowledge and experience in cloud native technologies.",
}

export default function SpeakersPage() {
    // Get all speakers
    const allSpeakers = speakers.speakers

    // Add MC information to speakers
    const speakersWithMCInfo = allSpeakers.map((speaker) => {
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

        return {
            ...speaker,
            isMC,
            mcDay,
        }
    })

    // Sort speakers alphabetically by name
    speakersWithMCInfo.sort((a, b) => a.name.localeCompare(b.name))

    const schemaData = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        itemListElement: speakersWithMCInfo.map((speaker, index) => ({
            "@type": "ListItem",
            position: index + 1,
            item: {
                "@type": "Person",
                name: speaker.name,
                jobTitle: speaker.role,
                worksFor: speaker.company
                    ? {
                        "@type": "Organization",
                        name: speaker.company,
                    }
                    : undefined,
                image: speaker.image,
                url: `https://cloudnativedaysitaly.org/speakers/${speaker.id}`,
            },
        })),
    }

    return (
        <>
            <Navbar data={config} additionalClassName="!bg-white" homepage="/" />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
            <SpeakersList speakers={speakersWithMCInfo} />
            <Footer data={config} />
        </>
    )
}

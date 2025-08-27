import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';
import SpeakersList from "@/components/speakers/speakers-list";
import config from "@/config/website.json";

export const metadata = {
    title: "Cloud Native Days Italy 2025 - Speakers",
    description:
        "Meet the speakers for Cloud Native Days Italy 2025. Industry experts and thought leaders sharing their knowledge and experience in cloud native technologies.",
};

async function getSpeakersData() {
    try {
        const currentYear = config.general.edition.toString();
        const editionConfigPath = path.join(process.cwd(), 'src', 'config', 'editions', `${currentYear}.json`);
        const editionConfig = JSON.parse(await fs.readFile(editionConfigPath, 'utf8'));

        const speakerIds = editionConfig.speakers || [];

        const allSpeakers = await Promise.all(
            speakerIds.map(async (speakerId) => {
                const profilePath = path.join(process.cwd(), 'src', 'config', 'profiles', `${speakerId}.md`);
                try {
                    const fileContents = await fs.readFile(profilePath, 'utf8');
                    const { data, content } = matter(fileContents);
                    return { ...data, bio: content || data.bio };
                } catch (error) {
                    console.error(`Error reading profile for speakerId: ${speakerId}`, error);
                    return null;
                }
            })
        );

        const validSpeakers = allSpeakers.filter(Boolean);
        validSpeakers.sort((a, b) => a.name.localeCompare(b.name));
        return validSpeakers;

    } catch (error) {
        console.error("Failed to load speakers data for the current edition:", error);
        return [];
    }
}

export default async function SpeakersPage() {
    const speakers = await getSpeakersData();

    const schemaData = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        itemListElement: speakers.map((speaker, index) => ({
            "@type": "ListItem",
            position: index + 1,
            item: {
                "@type": "Person",
                name: speaker.name,
                jobTitle: speaker.role,
                worksFor: speaker.company ? { "@type": "Organization", name: speaker.company } : undefined,
                image: speaker.image,
                url: `https://cloudnativedaysitaly.org/profile/${speaker.id}`,
            },
        })),
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
            <SpeakersList speakers={speakers} />
        </>
    );
}

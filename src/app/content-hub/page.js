import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';
import config from "@/config/website.json";
import ContentHub from '@/components/ContentHub/ContentHub';

async function getAllContent() {
    const talksByYearDir = path.join(process.cwd(), 'src', 'config', 'talks');
    const profilesDir = path.join(process.cwd(), 'src', 'config', 'profiles');
    const allTalks = [];
    try {
        const years = await fs.readdir(talksByYearDir);
        const speakersMap = new Map();
        const profileFiles = await fs.readdir(profilesDir);
        for (const file of profileFiles.filter(f => f.endsWith('.md'))) {
            const content = await fs.readFile(path.join(profilesDir, file), 'utf8');
            const { data } = matter(content);
            speakersMap.set(data.id, data);
        }
        for (const year of years) {
            const talksDir = path.join(talksByYearDir, year);
            const talkFiles = await fs.readdir(talksDir);
            for (const talkFile of talkFiles.filter(f => f.endsWith('.md'))) {
                const talkContent = await fs.readFile(path.join(talksDir, talkFile), 'utf8');
                const { data, content: abstract } = matter(talkContent);
                const speakers = (data.speakerIds || []).map(id => speakersMap.get(id)).filter(Boolean);
                allTalks.push({ ...data, abstract, year, speakers });
            }
        }
    } catch (error) { console.error("Failed to load all content:", error); }
    allTalks.sort((a, b) => b.year.localeCompare(a.year) || a.title.localeCompare(b.title));
    return allTalks;
}

export const metadata = {
    title: `Content Hub - ${config.general.event.name}`,
    description: `Explore all sessions from all editions of ${config.general.event.name}.`,
};

export default async function ContentHubPage() {
    const allTalks = await getAllContent();
    return (
        <ContentHub
            talks={allTalks}
            title="Content Hub"
            description="Explore all sessions from all editions of our event. Search our archive by title, topic, or speaker."
            showPagination={true}
        />
    );
}

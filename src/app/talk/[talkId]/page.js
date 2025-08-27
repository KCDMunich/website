import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { notFound } from 'next/navigation';
import config from "@/config/website.json";
import TalkDetail from '@/components/talks/TalkDetail';

async function getAllTalkIds() {
    const talksByYearDir = path.join(process.cwd(), 'src', 'config', 'talks');
    const allTalkIds = [];
    try {
        const years = await fs.readdir(talksByYearDir);
        for (const year of years) {
            const talksDir = path.join(talksByYearDir, year);
            const talkFiles = await fs.readdir(talksDir);
            for (const talkFile of talkFiles.filter(f => f.endsWith('.md'))) {
                const talkContent = await fs.readFile(path.join(talksDir, talkFile), 'utf8');
                const { data } = matter(talkContent);
                if (data.id) {
                    allTalkIds.push({ talkId: data.id });
                }
            }
        }
    } catch (error) {
        console.error("Failed to scan all talks for generateStaticParams:", error);
    }
    return allTalkIds;
}

export async function generateStaticParams() {
    return await getAllTalkIds();
}

async function getTalkData(talkId) {
    const talksByYearDir = path.join(process.cwd(), 'src', 'config', 'talks');
    const years = await fs.readdir(talksByYearDir);

    let talkData = null;
    let talkAbstract = '';
    let talkYear = '';

    for (const year of years) {
        const talksDir = path.join(talksByYearDir, year);
        try {
            const talkFiles = await fs.readdir(talksDir);
            for (const talkFile of talkFiles.filter(f => f.endsWith('.md'))) {
                const talkContent = await fs.readFile(path.join(talksDir, talkFile), 'utf8');
                const { data, content } = matter(talkContent);
                if (data.id === talkId) {
                    talkData = data;
                    talkAbstract = content;
                    talkYear = year;
                    break;
                }
            }
        } catch {}
        if (talkData) break;
    }

    if (!talkData) return null;

    const speakerDetails = await Promise.all(
        (talkData.speakerIds || []).map(async (speakerId) => {
            const profilePath = path.join(process.cwd(), 'src', 'config', 'profiles', `${speakerId}.md`);
            try {
                const profileContent = await fs.readFile(profilePath, 'utf8');
                const { data } = matter(profileContent);
                return { ...data };
            } catch { return null; }
        })
    );

    const agendaConfigPath = path.join(process.cwd(), 'src', 'config', 'agenda.json');
    const agenda = JSON.parse(await fs.readFile(agendaConfigPath, 'utf8'));

    let sessionInfo = {};
    if (agenda.schedule[talkYear]) {
        for (const slot of agenda.schedule[talkYear]) {
            const session = slot.sessions.find(s => s.talkId === talkId);
            if (session) {
                const day = agenda.days.find(d => d.id === `${talkYear.substring(2)}-day`);
                const track = agenda.tracks.find(t => t.id === session.trackId);
                sessionInfo = {
                    time: slot.time,
                    startDate: day ? `${day.date}T${slot.time.split(' - ')[0]}:00` : undefined,
                    endDate: day ? `${day.date}T${slot.time.split(' - ')[1]}:00` : undefined,
                    room: track?.room || 'N/A'
                };
                break;
            }
        }
    }

    return {
        ...talkData,
        abstract: talkAbstract,
        year: talkYear,
        speakers: speakerDetails.filter(Boolean),
        ...sessionInfo
    };
}

export async function generateMetadata({ params }) {
    const { talkId } = await params;
    const talk = await getTalkData(talkId);
    if (!talk) {
        return { title: "Talk Not Found" };
    }

    const siteUrl = config.general.event.website;
    const cleanAbstract = talk.abstract.replace(/(\r\n|\n|\r)/gm, " ").substring(0, 160);
    const imageUrl = talk.image?.startsWith('http') ? talk.image : `${siteUrl}${talk.image || config.general.event.logo}`;

    return {
        title: `${talk.title} - Cloud Native Days Italy`,
        description: `${cleanAbstract}...`,
        alternates: {
            canonical: `${siteUrl}/talk/${talk.id}`,
        },
        openGraph: {
            title: talk.title,
            description: `${cleanAbstract}...`,
            url: `${siteUrl}/talk/${talk.id}`,
            images: [{ url: imageUrl, alt: talk.title }],
            type: 'article',
        },
        twitter: {
            card: 'summary_large_image',
            title: talk.title,
            description: `${cleanAbstract}...`,
            images: [imageUrl],
        },
    };
}

export default async function TalkPage({ params }) {
    const { talkId } = await params;
    const talkData = await getTalkData(talkId);
    if (!talkData) notFound();

    const siteUrl = config.general.event.website;
    const imageUrl = talkData.image?.startsWith('http') ? talkData.image : `${siteUrl}${talkData.image || config.general.event.logo}`;

    const schemaData = {
        "@context": "https://schema.org",
        "@type": "Event",
        "name": talkData.title,
        "description": talkData.abstract.replace(/(\r\n|\n|\r)/gm, " "),
        "url": `${siteUrl}/talk/${talkData.id}`,
        "startDate": talkData.startDate,
        "endDate": talkData.endDate,
        "image": imageUrl,
        "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
        "location": {
            "@type": "Place",
            "name": talkData.room,
            "address": {
                "@type": "PostalAddress",
                "addressLocality": "Bologna",
                "addressCountry": "IT"
            }
        },
        "performer": talkData.speakers.map(speaker => ({
            "@type": "Person",
            "name": speaker.name,
            "url": `${siteUrl}/profile/${speaker.id}`,
            "image": speaker.image
        })),
        "superEvent": {
            "@type": "Event",
            "name": `${config.general.event.name} ${talkData.year}`,
            "url": `${siteUrl}/${talkData.year}`
        }
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
            <TalkDetail talk={talkData} />
        </>
    );
}

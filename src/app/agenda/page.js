import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';
import config from "@/config/website.json";
import AgendaView from "@/components/agenda/agenda-view";
import { CalendarClock, ArrowLeft, FileText, Lightbulb, CheckCircle, Clock, Mic, Users, Wrench, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { format, isBefore, isAfter, parseISO } from 'date-fns';

async function getPastTalksPreview() {
    try {
        const editionsDir = path.join(process.cwd(), 'src', 'config', 'editions');
        const years = (await fs.readdir(editionsDir)).map(file => file.replace('.json', '')).sort((a,b) => b.localeCompare(a));
        const currentYear = config.general.edition.toString();
        const pastYear = years.find(y => y < currentYear);

        if (!pastYear) return [];

        const talksDir = path.join(process.cwd(), 'src', 'config', 'talks', pastYear);
        const talkFiles = await fs.readdir(talksDir);

        const talks = await Promise.all(
            talkFiles.filter(f => f.endsWith('.md')).slice(0, 3).map(async (file) => {
                const content = await fs.readFile(path.join(talksDir, file), 'utf8');
                const { data } = matter(content);
                return { ...data, year: pastYear };
            })
        );
        return talks;
    } catch {
        return [];
    }
}

async function getAgendaData() {
    const agendaConfigPath = path.join(process.cwd(), 'src', 'config', 'agenda.json');
    const agendaConfig = JSON.parse(await fs.readFile(agendaConfigPath, 'utf8'));

    if (!agendaConfig.isPublished) {
        return { isReady: false, agenda: null };
    }

    const currentYear = config.general.edition.toString();

    const profilesDir = path.join(process.cwd(), 'src', 'config', 'profiles');
    const speakersMap = new Map();
    try {
        const profileFiles = await fs.readdir(profilesDir);
        for (const file of profileFiles.filter(f => f.endsWith('.md'))) {
            const content = await fs.readFile(path.join(profilesDir, file), 'utf8');
            const { data } = matter(content);
            speakersMap.set(data.id, data);
        }
    } catch {}

    const talksDir = path.join(process.cwd(), 'src', 'config', 'talks', currentYear);
    const talksMap = new Map();
    try {
        const talkFiles = await fs.readdir(talksDir);
        for (const file of talkFiles.filter(f => f.endsWith('.md'))) {
            const content = await fs.readFile(path.join(talksDir, file), 'utf8');
            const { data, content: abstract } = matter(content);
            const talkId = data.id || file.replace('.md', '');
            talksMap.set(talkId, { ...data, id: talkId, abstract });
        }
    } catch {
        return { isReady: false, agenda: null };
    }

    for (const dayId in agendaConfig.schedule) {
        for (const slot of agendaConfig.schedule[dayId]) {
            for (const session of slot.sessions) {
                if (session.talkId) {
                    const talkDetails = talksMap.get(session.talkId);
                    if (talkDetails) {
                        session.details = talkDetails;
                        session.details.speakers = (talkDetails.speakerIds || []).map(id => speakersMap.get(id)).filter(Boolean);
                    }
                }
            }
        }
    }

    return { isReady: true, agenda: agendaConfig };
}

const ComingSoonAgenda = ({ proposalConfig, infoConfig, pastTalks }) => {
    const now = new Date();
    const startDate = parseISO(proposalConfig.startDate);
    const endDate = parseISO(proposalConfig.endDate);

    let c4pStatus = 'closed';
    if (isBefore(now, startDate)) c4pStatus = 'comingsoon';
    if (isAfter(now, startDate) && isBefore(now, endDate)) c4pStatus = 'open';

    return (
        <div className="bg-gray-50">
            <div className="container mx-auto max-w-7xl px-4 py-16 lg:py-24">
                <div className="text-center max-w-3xl mx-auto">
                    <div className="inline-flex items-center justify-center h-16 w-16 bg-gradient-to-br from-blue-100 to-purple-100 text-blue-600 rounded-full mb-6 shadow-lg">
                        <CalendarClock size={32} />
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tighter">
                        Agenda Coming Soon
                    </h1>
                    <p className="mt-4 text-lg text-gray-600">
                        Our team is finalizing an exciting lineup. The full schedule will be announced as soon as the Call for Papers is closed and all talks are selected.
                    </p>
                </div>

                <div className="mt-16 max-w-4xl mx-auto">
                    <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-200">
                        <div className="text-center">
                            {c4pStatus === 'open' && <span className="inline-flex items-center gap-2 text-sm font-semibold px-4 py-1.5 rounded-full bg-green-100 text-green-800"><Lightbulb className="h-4 w-4" /> Call for Papers is Open!</span>}
                            {c4pStatus === 'closed' && <span className="inline-flex items-center gap-2 text-sm font-semibold px-4 py-1.5 rounded-full bg-gray-200 text-gray-700"><CheckCircle className="h-4 w-4" /> Submissions are Closed</span>}
                            {c4pStatus === 'comingsoon' && <span className="inline-flex items-center gap-2 text-sm font-semibold px-4 py-1.5 rounded-full bg-sky-100 text-sky-800"><Clock className="h-4 w-4" /> C4P Opens Soon</span>}

                            <h2 className="text-3xl font-bold text-gray-800 mt-4">Become a Speaker</h2>
                            <p className="mt-3 text-gray-600 max-w-2xl mx-auto">{proposalConfig.rollingSelectionText}</p>
                        </div>
                        <div className="mt-6 flex flex-col sm:flex-row justify-between items-center text-center gap-4 bg-gray-50 p-4 rounded-lg">
                            <p className="font-semibold text-gray-700">Opens: <span className="font-normal text-gray-600">{format(startDate, 'MMM d, yyyy')}</span></p>
                            <p className="font-semibold text-gray-700">Closes: <span className="font-normal text-gray-600">{format(endDate, 'MMM d, yyyy')}</span></p>
                        </div>
                        {c4pStatus === 'open' && (
                            <div className="mt-6">
                                <Link href={proposalConfig.url} target="_blank" className="group w-full sm:w-auto inline-flex items-center justify-center text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105">
                                    Submit Your Talk <ArrowRight className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1" />
                                </Link>
                            </div>
                        )}
                    </div>
                </div>

                <div className="mt-16 text-center">
                    <h2 className="text-3xl font-bold text-gray-800">{infoConfig.extra.title}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8 max-w-5xl mx-auto">
                        <div className="bg-white p-6 rounded-lg border border-gray-200"><h3 className="font-bold text-lg flex items-center gap-2"><Mic size={20} className="text-blue-500" /> {infoConfig.extra.boxes.talks.title}</h3><p className="text-gray-600 text-sm mt-2">{infoConfig.extra.boxes.talks.description}</p></div>
                        <div className="bg-white p-6 rounded-lg border border-gray-200"><h3 className="font-bold text-lg flex items-center gap-2"><Users size={20} className="text-blue-500" /> {infoConfig.extra.boxes.networking.title}</h3><p className="text-gray-600 text-sm mt-2">{infoConfig.extra.boxes.networking.description}</p></div>
                        <div className="bg-white p-6 rounded-lg border border-gray-200"><h3 className="font-bold text-lg flex items-center gap-2"><Wrench size={20} className="text-blue-500" /> {infoConfig.extra.boxes.workshop.title}</h3><p className="text-gray-600 text-sm mt-2">{infoConfig.extra.boxes.workshop.description}</p></div>
                    </div>
                </div>

                {pastTalks.length > 0 && (
                    <div className="mt-16 text-center">
                        <h2 className="text-3xl font-bold text-gray-800">From the Archives</h2>
                        <p className="mt-3 text-lg text-gray-600">Curious about our sessions? Here's a taste from our past editions.</p>
                        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                            {pastTalks.map(talk => (
                                <Link key={talk.id} href={`/talk/${talk.id}`} className="block bg-white p-4 rounded-lg shadow-sm hover:shadow-lg transition-shadow text-left">
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-800">{talk.year}</span>
                                        <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-green-100 text-green-800">{talk.tags?.[0]}</span>
                                    </div>
                                    <p className="font-semibold text-gray-800 mt-3">{talk.title}</p>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default async function AgendaPage() {
    const { isReady, agenda } = await getAgendaData();

    if (!isReady) {
        const pastTalks = await getPastTalksPreview();
        return <ComingSoonAgenda proposalConfig={config.proposal} infoConfig={config.info} pastTalks={pastTalks} />;
    }

    return (
        <AgendaView agenda={agenda} />
    );
}

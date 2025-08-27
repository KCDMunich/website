'use client';

import { useState } from 'react';
import { format, parseISO } from 'date-fns';
import { enUS } from 'date-fns/locale';
import Link from 'next/link';
import clsx from 'clsx';
import { Clock, MapPin, Coffee, Utensils, Mic, Users, Wrench } from 'lucide-react';

const PlaceholderCard = () => (
    <div className="bg-gray-50/50 rounded-lg min-h-[150px] border border-dashed border-gray-200 h-full" />
);

const SessionCard = ({ session, tracks }) => {
    if (session.type === 'break') {
        const Icon = { coffee: Coffee, lunch: Utensils, networking: Users }[session.title?.toLowerCase().match(/coffee|lunch|networking/)?.[0]] || Clock;
        return (
            <div className="bg-gray-100 rounded-lg p-6 text-center h-full flex items-center justify-center">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <Icon className="h-6 w-6 text-gray-500" />
                    <h3 className="text-xl font-bold text-gray-800">{session.title}</h3>
                </div>
            </div>
        );
    }
    if (!session.details) return null;
    const track = tracks.find(t => t.id === session.trackId);
    const TypeIcon = session.details.type === 'workshop' ? Wrench : Mic;
    return (
        <Link href={`/talk/${session.details.id}`} className="block bg-slate-50 md:bg-white p-4 sm:p-6 rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 h-full flex flex-col">
            <div className="flex items-center justify-between gap-2 flex-wrap mb-3">
                <span className={clsx("inline-flex items-center gap-1.5 text-xs font-semibold px-2 py-1 rounded-full", session.details.type === 'workshop' ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800')}>
                    <TypeIcon size={12}/> {session.details.type || 'talk'}
                </span>
                <div className="flex items-center gap-2">
                    {session.details.tags?.map(tag => <span key={tag} className="text-xs font-semibold px-2 py-1 rounded-full bg-blue-100 text-blue-800">{tag}</span>)}
                </div>
            </div>
            <h3 className="font-bold text-gray-900 flex-grow">{session.details.title}</h3>
            <div className="block md:hidden text-sm text-gray-500 mt-2 flex items-center gap-2"><MapPin size={14}/> {track?.room || 'Main Stage'}</div>
            <div className="mt-4 pt-4 border-t border-gray-100 flex flex-col gap-3">
                {session.details.speakers.map(speaker => (
                    <div key={speaker.id} className="flex items-center gap-3 group">
                        <img src={speaker.image} alt={speaker.name} className="w-8 h-8 rounded-full object-cover" />
                        <div>
                            <p className="font-semibold text-sm text-gray-800 group-hover:text-blue-600">{speaker.name}</p>
                            <p className="text-xs text-gray-500">{speaker.role.split('@')[0]}</p>
                        </div>
                    </div>
                ))}
            </div>
        </Link>
    );
};

export default function AgendaView({ agenda }) {
    const [selectedDayId, setSelectedDayId] = useState(agenda.days[0].id);

    const schedule = agenda.schedule[selectedDayId] || [];
    const allTracks = agenda.tracks || [];

    const usedTrackIds = new Set(schedule.flatMap(slot => slot.sessions.map(s => s.trackId)).filter(Boolean));
    const dayTracks = allTracks.filter(t => usedTrackIds.has(t.id));
    const numDayTracks = dayTracks.length;

    const getGridColsClass = (count) => {
        const classMap = {
            1: 'grid-cols-[100px_1fr]',
            2: 'grid-cols-[100px_1fr_1fr]',
            3: 'grid-cols-[100px_1fr_1fr_1fr]',
            4: 'grid-cols-[100px_1fr_1fr_1fr_1fr]',
        };
        return classMap[count] || `grid-cols-[100px_repeat(${count},_1fr)]`;
    };

    const gridClass = getGridColsClass(numDayTracks);

    return (
        <div className="bg-white">
            <div className="container mx-auto max-w-7xl px-4 py-16 lg:py-24">
                <div className="text-center max-w-3xl mx-auto">
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tighter">Agenda</h1>
                    <p className="mt-4 text-lg text-gray-600">
                        Explore our schedule of talks, workshops, and networking opportunities. Select a day to view the detailed timeline.
                    </p>
                </div>

                <div className="mt-12 flex justify-center gap-2 sm:gap-4 bg-gray-100 p-2 rounded-full max-w-md mx-auto sticky top-20 z-20">
                    {agenda.days.map(day => (
                        <button key={day.id} onClick={() => setSelectedDayId(day.id)} className={clsx("w-full text-center px-4 py-2.5 rounded-full font-semibold transition-colors duration-300", selectedDayId === day.id ? 'bg-white text-blue-600 shadow' : 'bg-transparent text-gray-600 hover:bg-white/60')}>
                            <span className="block text-base">{day.name}</span>
                            <span className="block text-xs font-normal">{format(parseISO(day.date), 'MMMM do', { locale: enUS })}</span>
                        </button>
                    ))}
                </div>

                <div className="mt-16">
                    {numDayTracks > 1 && (
                        <div className={clsx("hidden md:grid gap-6 mb-4 sticky top-40 z-10 bg-white/80 backdrop-blur-sm py-4", gridClass)}>
                            <div/>
                            {dayTracks.map(track => (
                                <div key={track.id} className="text-center">
                                    <h3 className="font-bold text-lg text-gray-800">{track.name}</h3>
                                    <p className="text-sm text-gray-500 flex items-center justify-center gap-2"><MapPin size={14}/> {track.room}</p>
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="space-y-8">
                        {schedule.map(slot => {
                            const session = slot.sessions[0];
                            const isFullSpan = slot.sessions.length === 1 && (session.type === 'break' || !session.trackId || session.details?.isPlenary === true);
                            const alignedSessions = dayTracks.map(track => slot.sessions.find(s => s.trackId === track.id) || null);

                            return (
                                <div key={slot.time}>
                                    <div className="md:hidden">
                                        <div className="flex items-center font-bold text-gray-800 mb-4">
                                            <Clock size={16} className="mr-2 text-gray-400" />
                                            {slot.time}
                                        </div>
                                        <div className="space-y-4">
                                            {slot.sessions.map(s => <SessionCard key={s.talkId || s.title} session={s} tracks={allTracks} />)}
                                        </div>
                                    </div>

                                    <div className={clsx("hidden md:grid items-stretch gap-6", isFullSpan || numDayTracks <= 1 ? 'grid-cols-[100px_1fr]' : gridClass)}>
                                        <div className="pt-6 font-bold text-gray-800 flex items-start">
                                            <Clock size={16} className="mr-2 text-gray-400 mt-1" />
                                            {slot.time}
                                        </div>

                                        {isFullSpan || numDayTracks <= 1 ? (
                                            <div className="space-y-4">
                                                {slot.sessions.map(s => <SessionCard key={s.talkId || s.title} session={s} tracks={allTracks}/>)}
                                            </div>
                                        ) : (
                                            <>
                                                {alignedSessions.map((s, index) =>
                                                    s
                                                        ? <SessionCard key={s.talkId} session={s} tracks={allTracks} />
                                                        : <PlaceholderCard key={`placeholder-${index}`} />
                                                )}
                                            </>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

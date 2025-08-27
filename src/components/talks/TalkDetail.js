'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { Youtube, FileText, Tag, ChevronLeft, Calendar, PlayCircle } from 'lucide-react';

const getYouTubeEmbedUrl = (url) => {
    if (!url) return null;
    let videoId;
    try {
        const urlObj = new URL(url);
        if (urlObj.hostname === 'youtu.be') {
            videoId = urlObj.pathname.slice(1);
        } else if (urlObj.hostname.includes('youtube.com')) {
            videoId = urlObj.searchParams.get('v');
        }
        return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
    } catch {
        return null;
    }
};

export default function TalkDetail({ talk }) {
    const videoEmbedUrl = getYouTubeEmbedUrl(talk.video);
    const videoRef = useRef(null);

    const handleScrollToVideo = () => {
        videoRef.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
        });
    };

    const tagColorMap = {
        'ENG': 'bg-blue-100 text-blue-800',
        'ITA': 'bg-green-100 text-green-800',
        'SPONSORED': 'bg-yellow-100 text-yellow-800',
        'default': 'bg-gray-100 text-gray-800',
    };

    return (
        <div className="bg-white">
            <div className="container mx-auto max-w-7xl px-4 py-12 lg:py-20">
                <div className="mb-8">
                    <Link href={`/${talk.year}`} className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:underline">
                        <ChevronLeft className="h-4 w-4" />
                        Back to Edition {talk.year}
                    </Link>
                </div>

                <div className="lg:grid lg:grid-cols-3 lg:gap-12">
                    <main className="lg:col-span-2">
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 flex-wrap">
                                {talk.tags?.map(tag => (
                                    <span key={tag}
                                          className={`text-xs font-semibold px-2.5 py-1 rounded-full ${tagColorMap[tag] || tagColorMap.default}`}>
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight">{talk.title}</h1>
                        </div>

                        {videoEmbedUrl && (
                            <button
                                onClick={handleScrollToVideo}
                                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-full bg-red-50 text-red-700 hover:bg-red-100 transition-colors"
                            >
                                <PlayCircle className="h-5 w-5" />
                                Watch Video
                            </button>
                        )}

                        <article className="prose prose-lg max-w-none mt-8 text-gray-600 whitespace-pre-line">
                            {talk.abstract}
                        </article>

                        {videoEmbedUrl && (
                            <div ref={videoRef} className="mt-8 scroll-mt-24">
                                <div className="aspect-video w-full">
                                    <iframe
                                        className="w-full h-full rounded-lg shadow-lg"
                                        src={videoEmbedUrl}
                                        title={`YouTube video player for ${talk.title}`}
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                </div>
                            </div>
                        )}
                    </main>

                    <aside className="lg:sticky lg:top-24 self-start mt-12 lg:mt-0">
                        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 space-y-6">
                            <div>
                                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Speakers</h3>
                                <div className="space-y-4 mt-4">
                                    {talk.speakers.map(speaker => (
                                        <Link key={speaker.id} href={`/profile/${speaker.id}`} className="flex items-center gap-4 group">
                                            <img src={speaker.image} alt={speaker.name} className="w-14 h-14 rounded-full object-cover"/>
                                            <div>
                                                <p className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{speaker.name}</p>
                                                <p className="text-sm text-gray-500">{speaker.role} @{speaker.company}</p>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            {(talk.slide || talk.video) && (
                                <div className="pt-6 border-t border-gray-200">
                                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Resources</h3>
                                    <div className="space-y-3 mt-4">
                                        {talk.video && (
                                            <a href={talk.video} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-700 hover:text-red-600 transition-colors font-medium">
                                                <Youtube className="h-5 w-5"/> Watch on YouTube
                                            </a>
                                        )}
                                        {talk.slide && (
                                            <a href={talk.slide} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition-colors font-medium">
                                                <FileText className="h-5 w-5"/> Download Slides
                                            </a>
                                        )}
                                    </div>
                                </div>
                            )}

                            <div className="pt-6 border-t border-gray-200">
                                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Details</h3>
                                <div className="space-y-3 mt-4 text-gray-700 font-medium">
                                    <div className="flex items-center gap-3"><Calendar className="h-5 w-5 text-gray-400"/> Edition {talk.year}</div>
                                    <div className="flex items-center gap-3"><Tag className="h-5 w-5 text-gray-400"/> Level: {talk.level || 'All'}</div>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
}

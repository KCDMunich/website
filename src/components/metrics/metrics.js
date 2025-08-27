'use client';
import { Users, Mic, Handshake, Shield } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const MetricItem = ({ icon, value, label, duration = 2000 }) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    let start = 0;
                    const end = parseInt(value.toString().replace(/,/g, ''));
                    if (start === end) return;

                    const totalMilSecDur = duration;
                    const incrementTime = (totalMilSecDur / end) * 0.1;

                    const timer = setInterval(() => {
                        start += 1;
                        setCount(start);
                        if (start === end) clearInterval(timer);
                    }, incrementTime);
                }
            },
            { threshold: 0.1 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [ref, value, duration]);

    return (
        <div ref={ref} className="bg-white p-8 rounded-2xl shadow-xl flex flex-col items-center text-center transform transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-blue-200/50 border-t-4 border-transparent hover:border-blue-500">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-full mb-5 ring-4 ring-gray-200">
                {icon}
            </div>
            <p className="text-6xl font-extrabold text-gray-800 tabular-nums">{count}</p>
            <p className="text-xl text-gray-500 mt-2 font-medium">{label}</p>
        </div>
    );
};

const Metrics = ({ data, teamCount, speakersCount, sponsorsCount }) => (
    <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <MetricItem icon={<Users className="h-12 w-12 text-blue-600" />} value={data.attendees} label="Attendees" />
                <MetricItem icon={<Mic className="h-12 w-12 text-indigo-600" />} value={speakersCount} label="Speakers" />
                <MetricItem icon={<Handshake className="h-12 w-12 text-sky-600" />} value={sponsorsCount} label="Sponsors" />
                <MetricItem icon={<Shield className="h-12 w-12 text-teal-600" />} value={teamCount} label="Organizers" />
            </div>
        </div>
    </div>
);

export default Metrics;

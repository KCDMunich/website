import { ChevronLeft, ChevronRight, Users, Calendar, MapPin } from 'lucide-react';
import React, { useState, useEffect } from 'react';

const IconMapPin = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
    </svg>
);

const Card = ({ children, className = '' }) => <div className={` ${className}`}>{children}</div>;
const ImageSlider = ({ images }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [fade, setFade] = useState(false);

    useEffect(() => {
        if (!isPaused) {
            const timer = setInterval(() => {
                setFade(true);
                setTimeout(() => {
                    setCurrentImageIndex((prevIndex) =>
                        prevIndex === images.length - 1 ? 0 : prevIndex + 1
                    );
                    setFade(false);
                }, 500);
            }, 5000);

            return () => clearInterval(timer);
        }
    }, [images.length, isPaused]);

    const handleMouseEnter = () => setIsPaused(true);
    const handleMouseLeave = () => setIsPaused(false);

    const goToPrevious = () => {
        setFade(true);
        setTimeout(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
            setFade(false);
        }, 500);
    };

    const goToNext = () => {
        setFade(true);
        setTimeout(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
            setFade(false);
        }, 500);
    };

    return (
        <div
            className="relative h-full w-full"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className="relative h-full transition-all duration-500 ease-in-out">
                <img
                    src={images[currentImageIndex].img}
                    alt={images[currentImageIndex].alt}
                    className={`h-full w-full object-cover transition-opacity duration-500 ${
                        fade ? 'opacity-0' : 'opacity-100'
                    }`}
                />

                {/* Navigation Dots */}
                <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 transform space-x-2">
                    {images.map((_, index) => (
                        <button
                            type="button"
                            key={index}
                            className={`h-2 w-2 rounded-full ${
                                index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                            }`}
                            onClick={() => setCurrentImageIndex(index)}
                        />
                    ))}
                </div>

                {/* Navigation Arrows */}
                <button
                    type="button"
                    className="absolute left-4 top-1/2 -translate-y-1/2 transform rounded-full bg-black/30 p-2 text-white transition-colors hover:bg-black/50"
                    onClick={goToPrevious}
                >
                    <ChevronLeft size={24} />
                </button>
                <button
                    type="button"
                    className="absolute right-4 top-1/2 -translate-y-1/2 transform rounded-full bg-black/30 p-2 text-white transition-colors hover:bg-black/50"
                    onClick={goToNext}
                >
                    <ChevronRight size={24} />
                </button>
            </div>
        </div>
    );
};

const Venue = ({data}) => {
    return (
        <div className="mx-auto max-w-7xl p-4">
            <h2 className="section-title">{data.venue.title}</h2>
            <div className="gap-8 ">
                <div className="flex flex-col gap-6">
                    <div className="relative aspect-video overflow-hidden rounded-xl bg-gray-100">
                        <ImageSlider images={data.venue.images} />
                    </div>
                    <Card>
                        <div
                            className="p-6"
                            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                        >
                            <div
                                className="mb-4"
                                style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}
                            >
                                <h2 className="text-2xl font-bold text-[#004258]">{data.venue.name}</h2>
                                <h3 className="text-xl text-gray-600">{data.venue.city}</h3>
                            </div>

                            <div className="mb-4 flex gap-2 text-gray-600">
                                <IconMapPin />
                                <div>
                                    <p>{data.venue.street} {data.venue.zip}, {data.venue.city}</p>
                                </div>
                            </div>

                            <a
                                href={data.venue.mapLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 rounded-lg px-6 py-3 text-white transition-all"
                                style={{ backgroundColor: '#004258' }}
                            >
                                Open in Google Maps
                            </a>
                        </div>
                    </Card>
                </div>

                <div className="expect-section">
                    <div className="features-grid justify-items-center md:justify-items-start">
                        <div className="feature-item">
                            <Users className="feature-icon" />
                            <div className="feature-content">
                                <h3 className="feature-title">{data.venue.details.people.title}</h3>
                                <p className="feature-text">{data.venue.details.people.description}</p>
                            </div>
                        </div>

                        <div className="feature-item">
                            <Calendar className="feature-icon" />
                            <div className="feature-content">
                                <h3 className="feature-title">{data.venue.details.calendar.title}</h3>
                                <p className="feature-text">{data.venue.details.calendar.description}</p>
                            </div>
                        </div>

                        <div className="feature-item">
                            <MapPin className="feature-icon" />
                            <div className="feature-content">
                                <h3 className="feature-title">{data.venue.details.pin.title}</h3>
                                <p className="feature-text">{data.venue.details.pin.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Venue;

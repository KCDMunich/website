import clsx from 'clsx';
import React from 'react';
import "@/components/sponsor/sponsor.css";

const CARD_STYLES = 'w-[200px] h-[100px]';

const Sponsors = ({data}) => {
    const sponsorsList = data.sponsors.list;
    const tierConfig = data.sponsors.tiers;

    return (
        <>
            <section id="sponsors" className="mx-auto max-w-7xl px-4 py-6">
                <div className="text-center mb-8">
                    <h2 className="mb-4 text-4xl font-bold text-gray-900">{data.sponsors.become.title}</h2>
                    <p className="mb-6 text-lg text-gray-500">{data.sponsors.become.description}</p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <button
                            type="button"
                            className="button bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600"
                            onClick={() => {
                                window.location.href = `mailto:${data.sponsors.contactEmail}`;
                            }}
                        >
                            Contact Us
                        </button>
                        <a
                            href={data.sponsors.prospectus.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="button bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600"
                        >
                            {data.sponsors.prospectus.label}
                        </a>
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-4 py-6">
                <div className="text-center">
                    <h2 className="mb-8 text-3xl font-semibold text-gray-900 text-center">{data.sponsors.active.title}</h2>
                    <p className="mb-6 text-lg text-gray-500">{data.sponsors.active.description}</p>
                </div>
                {Object.entries(tierConfig).map(([tier, config]) => {
                    const tierSponsors = sponsorsList.filter((s) => s.tier === tier);

                    if (tierSponsors.length === 0) return null;

                    return (
                        <div key={tier} className="mb-12">
                            {/* Titolo Tier */}
                            <div className="mb-6 flex items-center justify-center gap-2">
                                <h3 className="text-xl font-semibold text-gray-900">{config.title}</h3>
                                <span
                                    className={clsx('rounded-full px-2 py-0.5 text-xs font-medium', config.badgeClass)}
                                >
                                    {tierSponsors.length}
                                </span>
                            </div>
                            <div className={config.containerClass}>
                                <div className="flex flex-wrap justify-center gap-4">
                                    {tierSponsors.map((sponsor, index) => (
                                        <a
                                            key={index}
                                            href={sponsor.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={clsx(
                                                'flex items-center justify-center rounded-lg transition-all duration-200',
                                                'hover:scale-[1.02] hover:shadow-md',
                                                CARD_STYLES,
                                                config.class
                                            )}
                                        >
                                            <div className="relative flex h-full w-full items-center justify-center">
                                                <img
                                                    src={sponsor.icon}
                                                    alt={sponsor.name}
                                                    loading="lazy"
                                                    style={{
                                                        maxHeight: '100%',
                                                        maxWidth: '80%',
                                                        objectFit: 'contain',
                                                    }}
                                                />
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </section>
        </>
    );
};

export default Sponsors;

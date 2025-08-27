"use client";
import clsx from 'clsx';
import React from 'react';
import Link from 'next/link';
import styles from './sponsor.css';

const CARD_STYLES = 'w-[200px] h-[100px]';


const Sponsors = ({sponsorsByTier, tiersConfig, sectionsContent, order, isCurrent = true}) => {
    if (!sponsorsByTier || !tiersConfig) return null;

    const displayOrder = order || Object.keys(tiersConfig);
    const hasActiveSponsors = Object.values(sponsorsByTier).some(tier => tier.length > 0);

    return (
        <div id="sponsors">
            {isCurrent && sectionsContent.become && (
                <section className="mx-auto max-w-7xl px-4 py-6">
                    <div className="text-center mb-8">
                        <h2 className="mb-4 text-4xl font-bold text-gray-900">{sectionsContent.become.title}</h2>
                        <p className="mb-6 text-lg text-gray-500">{sectionsContent.become.description}</p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link
                                type="button"
                                className="button bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600"
                                href={`mailto:${sectionsContent.contactEmail}`}
                            >
                                Contact Us
                            </Link>
                            <a
                                href={sectionsContent.prospectus.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="button bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600"
                            >
                                {sectionsContent.prospectus.label}
                            </a>
                        </div>
                    </div>
                </section>
            )}

            <section className="mx-auto max-w-7xl px-4 py-6">
                <div className="text-center">
                    <h2 className="mb-8 text-3xl font-semibold text-gray-900 text-center">{sectionsContent.active.title}</h2>
                    {hasActiveSponsors ? (
                        <p className="mb-6 text-lg text-gray-500">{sectionsContent.active.description}</p>
                    ) : (
                        <div className="text-center">
                            <p className="text-lg text-gray-500">The announcement of sponsors is coming soon! ...</p>
                        </div>
                    )}
                </div>

                {displayOrder.map((tier) => {
                    const config = tiersConfig[tier];
                    const tierSponsors = sponsorsByTier[tier] || [];

                    if (!config || tierSponsors.length === 0) return null;

                    return (
                        <div key={tier} className="mb-12">
                            <div className="mb-6 flex items-center justify-center gap-2">
                                <h3 className="text-xl font-semibold text-gray-900">{config.title}</h3>
                                <span className={clsx('rounded-full px-2 py-0.5 text-xs font-medium', config.badgeClass)}>
                                    {tierSponsors.length}
                                </span>
                            </div>
                            <div className="flex flex-wrap justify-center gap-4">
                                {tierSponsors
                                    .sort((a, b) => a.name.localeCompare(b.name))
                                    .map((sponsor, index) => (
                                        <a
                                            key={index}
                                            href={sponsor.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={clsx(
                                                'flex items-center justify-center rounded-lg transition-all duration-300',
                                                'hover:scale-[1.02] hover:shadow-md',
                                                CARD_STYLES,
                                                config.class,
                                                !isCurrent && 'pastSponsor'
                                            )}
                                        >
                                            <div className="relative flex h-full w-full items-center justify-center">
                                                <img
                                                    src={sponsor.logo}
                                                    alt={sponsor.name}
                                                    loading="lazy"
                                                    style={{ maxHeight: '100%', maxWidth: '80%', objectFit: 'contain' }}
                                                />
                                            </div>
                                        </a>
                                    ))}
                            </div>
                        </div>
                    );
                })}
            </section>
        </div>
    );
};

export default Sponsors;

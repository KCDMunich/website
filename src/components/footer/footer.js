"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaDiscord, FaTwitter, FaLinkedin, FaYoutube, FaMapPin } from 'react-icons/fa';
import { FaBluesky } from 'react-icons/fa6';
import "@/components/footer/footer.css";


const Footer = ({ data }) => {
    const logoSrc = data.footer.image;
    const contactEmail = data.general.contact.email;

    const icons = {
        googlemaps: {icon: FaMapPin, iconClassName: 'w-4 h-9'},
        linkedin: {icon: FaLinkedin, iconClassName: 'w-5 h-9'},
        twitter: {icon: FaTwitter, iconClassName: 'w-5 h-9'},
        youtube: {icon: FaYoutube, iconClassName: 'w-7 h-9'},
        discord: {icon: FaDiscord, iconClassName: 'w-7 h-9'},
        bluesky: {icon: FaBluesky, iconClassName: 'w-5 h-9'},
    }

    return (
        <footer className="safe-paddings border-t border-t-gray-200 bg-white py-6">
            <div className="container mx-auto flex flex-col items-center justify-between gap-6 sm:flex-row">
                <Link href="/" className="flex items-center">
                    <Image src={logoSrc} alt="Logo" width={155} height={100} />
                </Link>

                <nav className="mt-4">
                    <ul className="flex flex-wrap justify-center gap-4">
                        {data.footer.links.filter(l => l.active === true).map((link, index) => (
                            <li key={index}>
                                <a
                                    href={link.url}
                                    className="text-sm font-semibold text-gray-700 hover:text-gray-900"
                                >
                                    {link.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Social Icons */}
                <div className="flex flex-col items-center gap-4">
                    <a
                        href={`mailto:${contactEmail}`}
                        className="text-sm font-semibold text-blue-500 hover:underline"
                    >
                        Contact us
                    </a>
                    <ul className="flex gap-4">
                        {data.footer.icons.filter(i => i.active === true).map(({iconName, url, alt}, index) => {
                            const Icon = icons[iconName]?.icon;

                            return (
                                <li key={index}>
                                    <a
                                        href={url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={alt}
                                        className="flex items-center justify-center rounded-full bg-gray-200 p-2 hover:bg-gray-300"
                                    >

                                        <Icon className={icons[iconName]?.iconClassName} />
                                    </a>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

import clsx from 'clsx';
import { m, LazyMotion, domAnimation } from 'framer-motion';
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaArrowRight } from 'react-icons/fa';

const Header = ({ data, additionalClassName }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMobileMenuOpen((prev) => !prev);
    };

    const navigationLinks = data.navbar.links.header;

    const handleAnchorClick = () => {
        setIsMobileMenuOpen(false);
    };

    return (
        <header
            className={clsx('safe-paddings transition-200 z-10 transition-colors', additionalClassName)}
        >
            <div
                className="flex items-center justify-between pb-2 pt-5"
                style={{
                    position: 'relative',
                    margin: '0 auto',
                    maxWidth: '80rem',
                    padding: '1rem 1rem',
                }}
            >
                {/* Logo */}
                <Link href="/" className="z-50 ml-2">
                    <Image
                        src="/images/test.svg"
                        alt="logo"
                        width={120}
                        height={40}
                        className="navbar-logo"
                    />
                </Link>

                <nav>
                    <ul className="hidden md:flex space-x-8 text-white lg:space-x-6">
                        {navigationLinks.map(({ text, to }, index) => (
                            <li
                                className="text-[15px] font-semibold"
                                key={index}
                                style={{ color: '#004258', cursor: 'pointer' }}
                            >
                                <Link
                                    href={to}
                                    className="text-primary hover:text-primary-dark cursor-pointer transition-colors duration-200"
                                >
                                    {text}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>


                    <div className="hidden md:flex">
                        {data.navbar.CTA.label && data.navbar.CTA.url && (
                        <button
                            type="button"
                            className="button"
                            style={{
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                            }}
                            onClick={() => {
                                window.location.href = data.navbar.CTA.url;
                            }}
                        >
                            {data.navbar.CTA.label}
                            <FaArrowRight style={{ marginLeft: '1rem' }} />
                        </button>
                        )}
                    </div>


                {/* Burger Menu for Mobile */}
                <LazyMotion features={domAnimation}>
                    <m.button
                        className={clsx(
                            'relative h-[22px] w-7 z-50 md:hidden',
                            isMobileMenuOpen && 'text-black dark:text-black'
                        )}
                        type="button"
                        animate={isMobileMenuOpen ? 'toggled' : 'initial'}
                        aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                        onClick={toggleMenu}
                    >
                        <m.span
                            className="absolute top-0 right-0 block h-0.5 w-full bg-current transition-colors duration-200"
                            variants={{
                                initial: { top: 0 },
                                toggled: { top: 9 },
                            }}
                        />
                        <m.span
                            className="absolute bottom-0 right-0 block h-0.5 w-full bg-current transition-colors duration-200"
                            variants={{
                                initial: { bottom: 0 },
                                toggled: { bottom: 9 },
                            }}
                        />
                    </m.button>
                </LazyMotion>
            </div>

            {isMobileMenuOpen && (
                <nav className="fixed inset-0 bg-gray-900 bg-opacity-95 z-40 flex flex-col items-center justify-center space-y-6">
                    {navigationLinks.map(({ text, to }, index) => (
                        <Link
                            href={to}
                            key={index}
                            className="text-white text-2xl font-semibold"
                            onClick={handleAnchorClick}
                        >
                            {text}
                        </Link>
                    ))}
                    {/* if data.navbar.CTA have property label and url and they are not empty */}
                    {data.navbar.CTA.label && data.navbar.CTA.url && (
                        <button
                            type="button"
                            className="text-white bg-blue-500 px-4 py-2 rounded flex items-center"
                            onClick={() => {
                                window.location.href = data.navbar.CTA.url;
                            }}
                        >
                            {data.navbar.CTA.label}
                            <FaArrowRight style={{marginLeft: '0.5rem'}}/>
                        </button>
                    )}
                </nav>
            )}
        </header>
    );
};

export default Header;

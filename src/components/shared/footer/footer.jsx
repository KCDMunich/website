import React from 'react';
import slugify from 'slugify';

import LINKS from 'constants/links.js';
import MENUS from 'constants/menus';
import GoogleMaps from 'icons/google-maps-icon.inline.svg';

import LinkedIn from 'icons/linkedin-logo.inline.svg';
import Twitter from 'icons/twitter-logo.inline.svg';
import Youtube from 'icons/youtube.inline.svg';
import { FaDiscord } from 'react-icons/fa';

import { StaticImage } from 'gatsby-plugin-image';

import Button from '../button';
import Link from '../link';

import './footer.css';

const items = [
  { icon: GoogleMaps, iconClassName: 'w-4 h-9', url: LINKS.googlemaps.to },
  { icon: LinkedIn, iconClassName: 'w-5 h-9', url: LINKS.linkedin.to },
  { icon: Twitter, iconClassName: 'w-5 h-9', url: LINKS.twitter.to },
  { icon: Youtube, iconClassName: 'w-7 h-9', url: LINKS.youtube.to },
  { icon: FaDiscord, iconClassName: 'w-7 h-9', url: 'https://discord.com/invite/Ht3upbGey9' },
];

const Footer = () => {
  const handleAnchorClick = (e) => {
    const getAnchor = (str) => slugify(str).toLocaleLowerCase();

    const id = getAnchor(e.target.firstChild.data);
    const element = document.getElementById(id);

    if (element) {
      const indent = 50;
      const elementTop = element.getBoundingClientRect().top;
      const elementOffset = window.pageYOffset + elementTop - indent;

      window.scrollTo({
        top: elementOffset,
        behavior: 'smooth',
      });
    }
  };
  return (
    <footer id="sponsors" className="safe-paddings border-t border-t-gray-10 bg-white">
      <div className="container flex items-center justify-between gap-4 pb-5 pt-5 sm:flex-col sm:justify-around">
        <Link className="z-50 ml-2" to="/">
          <StaticImage
            src="./images/logo.svg"
            alt="logo"
            formats={['auto', 'webp', 'avif']}
            className="navbar-logo"
          />
        </Link>

        <nav className="mt-4 flex">
          <ul className="grid min-w-fit grid-cols-2 grid-rows-2 gap-x-3 gap-y-4 xl:gap-x-1 lg:mr-6 lg:gap-x-4 sm:mx-auto">
            {MENUS.footer.map(({ text, to, target }, index) => (
              <li
                className="w-fit max-w-min text-sm font-semibold"
                key={index}
                style={{ color: '#' }}
              >
                <Button
                  className="Link flex sm:flex-wrap"
                  to={to}
                  target={target}
                  onClick={handleAnchorClick}
                >
                  {text}
                </Button>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-4">
          <div className="flex h-full items-center justify-center">
            <Link
              className="Link ml-2 font-semibold transition-colors duration-200"
              theme="primary"
              to="mailto:team@cloudnativesummit.de"
            >
              Contact us
            </Link>
          </div>

          <ul className="mt-4 flex min-w-fit gap-x-2.5">
            {items.map(({ icon, iconClassName, url }, index) => {
              const Icon = icon;

              return (
                <li className="h-9 w-9" key={index}>
                  <Link
                    className="flex h-full w-full items-center justify-center"
                    to={url}
                    target="_blank"
                  >
                    <Icon className={iconClassName} />
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

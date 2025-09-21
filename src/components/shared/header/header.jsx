import clsx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import { FaDiscord } from 'react-icons/fa';
import slugify from 'slugify';

import MENUS from 'constants/menus';
import Burger from '../burger';
import Link from '../link';

import './header.css';

const Header = ({ isMobileMenuOpen, onBurgerClick, additionalClassName }) => {
  const getAnchor = (str) => slugify(str).toLocaleLowerCase();

  const handleAnchorClick = (e) => {
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
        <Link className="z-50 ml-2" to="/">
          <StaticImage
            src="./images/CNS_logo.png"
            alt="logo"
            formats={['auto', 'webp', 'avif']}
            className="navbar-logo"
            onClick={() => {
              window.location.href = `/`;
            }}
          />
        </Link>

        <nav>
          <ul className=" flex space-x-8 text-white lg:space-x-6 md:hidden">
            {MENUS.header.map((item, index) => (
              <li
                className="group relative text-[15px] font-semibold"
                key={index}
                style={{ color: '#004258', cursor: 'pointer' }}
              >
                {item.children ? (
                  <span className="text-primary cursor-default select-none">
                    {item.text}
                    <a
                      href={item.children[1].to}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary ml-2 transition-colors duration-200 hover:text-blue-1"
                    >
                      2024
                    </a>
                    <span className="mx-1 text-gray-400">|</span>
                    <a
                      href={item.children[0].to}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary transition-colors duration-200 hover:text-blue-1"
                    >
                      2025
                    </a>
                  </span>
                ) : (
                  <Link
                    to={item.to || `/#${item.homeTo}`}
                    className="text-primary hover:text-primary-dark cursor-pointer transition-colors duration-200"
                    onClick={handleAnchorClick}
                  >
                    {item.text}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:hidden">
          <button
            type="button"
            className="button"
            style={{
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
            }}
            onClick={() => {
              window.location.href = `https://discord.gg/Ht3upbGey9`;
            }}
          >
            Join our Community
            <FaDiscord style={{ marginLeft: '1rem' }} />
          </button>
        </div>

        <Burger
          className={clsx('z-50 hidden md:block', isMobileMenuOpen && 'text-black dark:text-black')}
          isToggled={isMobileMenuOpen}
          onClick={onBurgerClick}
        />
      </div>
    </header>
  );
};

Header.propTypes = {
  isMobileMenuOpen: PropTypes.bool,
  onBurgerClick: PropTypes.func.isRequired,
  additionalClassName: PropTypes.string,
  homepage: PropTypes.bool,
};

Header.defaultProps = {
  isMobileMenuOpen: false,
  additionalClassName: null,
  homepage: false,
};

export default Header;

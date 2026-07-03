import clsx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';
import { FaDiscord } from 'react-icons/fa';
import { HiChevronDown } from 'react-icons/hi2';
import slugify from 'slugify';

import MENUS from 'constants/menus';

import Burger from '../burger';
import Link from '../link';

import logo from './images/CNS_logo.png';

import './header.css';

const Header = ({ isMobileMenuOpen = false, onBurgerClick, additionalClassName = null }) => {
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
          <img
            src={logo}
            alt="logo"
            className="navbar-logo"
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
                  <>
                    <button
                      type="button"
                      className="text-primary inline-flex items-center gap-1 whitespace-nowrap transition-colors duration-200 hover:text-primary-1"
                      aria-haspopup="true"
                    >
                      {item.text}
                      <HiChevronDown className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />
                    </button>
                    <ul className="invisible absolute left-1/2 top-full z-50 mt-2 min-w-[7rem] -translate-x-1/2 rounded-md border border-gray-100 bg-white py-1 opacity-0 shadow-lg transition-all duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                      {item.children.map((child, childIndex) => (
                        <li key={childIndex}>
                          <a
                            href={child.to}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block px-4 py-2 text-[15px] font-semibold text-primary-1 transition-colors duration-200 hover:bg-primary-1/10"
                          >
                            {child.text}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </>
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

export default Header;

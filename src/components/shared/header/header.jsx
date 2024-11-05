import clsx from 'clsx';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import slugify from 'slugify';
import MENUS from 'constants/menus';
import Logo from 'icons/logo.inline.svg';
import Burger from '../burger';
import Link from '../link';
import './header.css';

const Header = ({ isMobileMenuOpen, onBurgerClick, additionalClassName, homepage }) => {
  const [isHovered, setIsHovered] = useState(false);

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
      className={clsx(
        'safe-paddings transition-200 z-10 transition-colors',
        isMobileMenuOpen ? 'bg-white bg-opacity-100' : 'bg-[#ffffff] bg-opacity-10',
        additionalClassName
      )}
    >
      <div className="container flex items-center justify-between pb-2 pt-5">
        <Link className="z-50 ml-2" to="/">
          <Logo className="h-12" />
        </Link>

        <nav>
          <ul className="-ml-8 flex space-x-8 text-white lg:ml-0 lg:space-x-6 md:hidden">
            {MENUS.header.map(({ text, to, homeTo }, index) => (
              <li className="text-[15px] font-semibold text-primary-1" key={index}>
                <Link
                  to={to || `/#${homeTo}`}
                  className="text-primary hover:text-primary-dark transition-colors duration-200"
                  onClick={handleAnchorClick}
                >
                  {text}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:hidden">
          <Link
            to="https://kcdmunich-2.ticketbutler.io/en/e/kcd-munich-2024/"
            className={`hero-cta-primary ${isHovered ? 'hovered' : ''} `}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            Get your tickets now
          </Link>
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

import clsx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';
import slugify from 'slugify';

import MENUS from 'constants/menus';
import Logo from 'icons/logo.inline.svg';

import Burger from '../burger';
import Button from '../button';
import Link from '../link';

const Header = ({ isMobileMenuOpen, onBurgerClick, additionalClassName, homepage }) => {
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
        isMobileMenuOpen ? 'bg-white bg-opacity-100' : 'bg-[#EDC3C7] bg-opacity-10',
        additionalClassName
      )}
    >
      <div className="container flex items-center justify-between pt-5 pb-2">
        <Link className="z-50 ml-2" to="/">
          <Logo className="h-12 w-44" />
        </Link>

        <nav>
          <ul className="-ml-8 flex space-x-8 text-white lg:ml-0 lg:space-x-6 md:hidden">
            {MENUS.header.map(({ text, to, homeTo }, index) => (
              <li className="text-[15px] font-semibold text-primary-1" key={index}>
                {homepage ? (
                  <Button to={homeTo} theme="link-primary" onClick={handleAnchorClick}>
                    {text}
                  </Button>
                ) : (
                  <Button to={to} theme="link-primary">
                    {text}
                  </Button>
                )}
              </li>
            ))}
          </ul>
        </nav>
        <Button
          className="-mr-2 md:hidden"
          to="https://www.eventbrite.de/e/kubernetes-community-days-munich-2023-tickets-526260839337"
          theme="primary"
          size="sm"
          target="_blank"
        >
          Get your ticket
        </Button>

        <Burger
          className={clsx('z-50 hidden md:block', isMobileMenuOpen && 'text-black dark:text-white')}
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

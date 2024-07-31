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
            <a
              href="https://lightroom.adobe.com/shares/42d27333b09147bba84e9ed1fb859739"
              style={{ color: '#26305a', fontSize: '15px', fontWeight: '600' }}
            >
              KCD24 Image Gallery
            </a>
          </ul>
        </nav>
        <Button
          className="group relative -mr-2 inline-flex items-center justify-center overflow-hidden border-none p-0.5 font-bold md:hidden"
          to="https://kcdmunich-2.ticketbutler.io/en/e/kcd-munich-2024/"
          theme="primary"
          target="_blank"
        >
          <span className="absolute h-full w-full bg-gradient-to-br from-[#3333ff] via-[#3333ff] to-[#3333ff] group-hover:from-[#ff00c6] group-hover:via-[#ff5478] group-hover:to-[#ff8a05]"></span>
          <span className="bg-gray-900 duration-400 relative rounded-md px-6 py-3 transition-all ease-out group-hover:bg-opacity-0">
            <span className="relative text-white">Get your tickets now</span>
          </span>
        </Button>
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

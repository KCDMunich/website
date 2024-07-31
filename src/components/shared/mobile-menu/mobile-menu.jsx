import { m, LazyMotion, domAnimation, useAnimation } from 'framer-motion';
import PropTypes from 'prop-types';
import React from 'react';

import MENUS from 'constants/menus';
import useScrollOverflow from 'hooks/use-scroll-overflow';

import Button from '../button';

const ANIMATION_DURATION = 0.2;

const variants = {
  from: {
    opacity: 0,
    translateY: 30,
    transition: {
      duration: ANIMATION_DURATION,
    },
    transitionEnd: {
      zIndex: -1,
    },
  },
  to: {
    zIndex: 40,
    opacity: 1,
    translateY: 0,
    transition: {
      duration: ANIMATION_DURATION,
    },
  },
};

const MobileMenu = ({ isOpen, onButtonClick }) => {
  const controls = useAnimation();

  useScrollOverflow(controls, isOpen);

  return (
    <LazyMotion features={domAnimation}>
      <m.nav
        className="safe-paddings fixed inset-0 z-[-1] mt-[70px] hidden overflow-x-hidden overflow-y-hidden bg-white px-8 pb-5 pt-[72px] lg:flex lg:flex-col lg:justify-between"
        initial="from"
        animate={controls}
        variants={variants}
      >
        <div className="scrollbar-hidden my-auto flex h-full w-full overflow-x-hidden overflow-y-scroll">
          <ul className="mx-auto flex flex-col justify-center space-y-3 text-center text-xl font-semibold text-primary-1">
            {MENUS.mobile.map(({ text, to, id }, index) => (
              <li key={index}>
                <Button
                  className="block py-4"
                  theme="link-primary"
                  to={to || `/#${id}`}
                  onClick={onButtonClick}
                >
                  {text}
                </Button>
              </li>
            ))}
            <a
              href="https://lightroom.adobe.com/shares/42d27333b09147bba84e9ed1fb859739"
              style={{ color: '#26305a', fontSize: '15px', fontWeight: '900' }}
            >
              KCD24 Image Gallery
            </a>
          </ul>
        </div>
        <div className="flex items-center justify-center">
          <Button
            className="border-nonemd:hidden group relative inline-flex w-fit items-center justify-center overflow-hidden"
            to="https://kcdmunich-2.ticketbutler.io/en/e/kcd-munich-2024/"
            target="_blank"
          >
            <span className="absolute h-full w-full bg-gradient-to-br from-[#3333ff] via-[#3333ff] to-[#3333ff] group-hover:from-[#ff00c6] group-hover:via-[#ff5478] group-hover:to-[#ff8a05]"></span>
            <span className="bg-gray-900 duration-400 relative rounded-md px-6 py-3 transition-all ease-out group-hover:bg-opacity-0">
              <span className="relative font-bold text-white">Get your tickets now</span>
            </span>
          </Button>
        </div>
      </m.nav>
    </LazyMotion>
  );
};

MobileMenu.propTypes = {
  isOpen: PropTypes.bool,
  onButtonClick: PropTypes.func.isRequired,
};

MobileMenu.defaultProps = {
  isOpen: false,
};

export default MobileMenu;

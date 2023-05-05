import React from 'react';

import Button from 'components/shared/button';

import illustration from './images/hero-illustration.png';

const TITLE = 'Kubernetes Community Days Munich';

const DESCRIPTION =
  'The Kubernetes & Cloud Native community will gather at the smartvillage Bogenhausen in Munich, Germany. Join us for a two-day technical event loaded with exciting talks and networking opportunities. KCD Munich is aimed at developers, platform people, and other IT professionals with an interest in cloud native technologies. This community event is supported by the CNCF.';

const Hero = () => (
  <section className="safe-paddings overflow-hidden bg-[#EDC3C7] bg-opacity-10 pt-28 pb-40 lg:pb-32 md:pt-24 md:pb-[500px] sm:pb-[520px] [@media(max-width:600px)]:pb-[430px] [@media(max-width:460px)]:pb-[420px]">
    <div className="container relative md:flex md:flex-col">
      <div className="absolute top-0 -left-[40%] h-[566px] w-[566px] translate-x-1/2 bg-white blur-[100px] md:-left-[30%] md:h-[350px] md:w-[350px]" />
      <div className="relative md:flex md:flex-col md:items-center md:text-center">
        <span className="rounded-3xl bg-yellow px-4 py-2 text-sm font-bold leading-none text-black">
          JULY 17th - 18th, 2023
        </span>
        <h1 className="mt-3 max-w-[570px] text-8xl font-bold leading-denser text-primary-1 lg:max-w-[500px] sm:text-7xl">
          {TITLE}
        </h1>
        <p className="mt-5 max-w-[500px] text-lg leading-normal text-primary-1 lg:max-w-[500px]">
          {DESCRIPTION}
        </p>
        <Button
          className="mt-7 text-white shadow-[0_15px_40px_#999999] hover:shadow-[0px_15px_30px_#adadad]"
          to="https://www.eventbrite.de/e/kubernetes-community-days-munich-2023-tickets-526260839337"
          theme="blue"
          size="lg"
          target="_blank"
        >
          Get your ticket
        </Button>
      </div>
      <img
        className="absolute -top-44 -left-32 translate-x-1/2 xl:-top-28 xl:-left-8 xl:w-full xl:max-w-[920px] lg:left-[38%] lg:-top-16 lg:w-[750px] lg:translate-x-1 md:top-[37%] md:left-1/2 md:-translate-x-1/2 md:translate-y-1/2 sm:top-[27%] [@media(max-width:600px)]:top-[47%] [@media(max-width:600px)]:w-[600px] [@media(max-width:460px)]:top-[65%] [@media(max-width:460px)]:w-[490px]"
        src={illustration}
        width={1090}
        height="auto"
        loading="eager"
        alt="Illustration"
      />
    </div>
  </section>
);

export default Hero;

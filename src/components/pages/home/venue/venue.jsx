import React from 'react';

import Link from 'components/shared/link';

import CardIllusrtation from './images/card-illustration.jpg';

const TITLE = 'Venue information';

const Venue = () => (
  <section className="safe-paddings bg-white py-40 md:py-24 sm:py-16">
    <div className="container-md">
      <div className="text-2xl text-primary-1 sm:text-lg">
        <p>
          <span className="font-bold">Kubernetes Community Days</span> (KCDs) are global,
          community-organized events that gather adopters and technologists from open source and
          cloud native communities, supported by the Cloud Native Computing Foundation (CNCF).
        </p>
        <p className="mt-7">
          This is our second edition in <span className="font-bold">Munich</span>, and we’re excited
          to bring the community together. We want to provide a platform for professionals and
          experts from all levels and backgrounds to learn, network, and share their knowledge on
          all things cloud native.
        </p>
      </div>

      <div className="lg:mt-38 mt-40 xl:mt-32 md:mt-24">
        <h2 className="mt-3 text-center text-6xl font-bold leading-tight text-primary-1">
          {TITLE}
        </h2>
        <div className="mt-14 flex justify-between lg:justify-around md:flex-col sm:items-center">
          <div className="grid max-w-[384px] grid-cols-1 rounded shadow-[0_14px_40px_#CCCCCC] md:max-w-none md:grid-cols-2 sm:max-w-[500px] sm:grid-cols-1">
            <img
              className="min-w-full md:col-span-1 md:col-start-1 md:row-start-1 md:h-full"
              src={CardIllusrtation}
              width={384}
              height="auto"
              loading="eager"
              alt="card-illustration"
            />
            <div className="pt-5 pb-8 pl-10 pr-16 leading-normal md:row-start-1 md:px-6 sm:row-start-2">
              <Link
                to="https://goo.gl/maps/yQ2Xr6Mnoyivh3qq5"
                className="text-2xl font-semibold sm:text-xl"
                theme="primary"
              >
                smartvillage Bogenhausen <br />
                at Munich Arabellapark
              </Link>
              <p className="mt-5 text-lg text-[#262F59] opacity-60 sm:text-lg">
                smartvillage Bogenhausen <br /> Rosenkavalierpl. 13 <br /> 81925 Munich
              </p>
            </div>
          </div>

          <div className="w-[520px] self-center text-lg leading-normal text-primary-1 xl:max-w-[470px] lg:ml-8 lg:max-w-[530px] md:ml-0 md:mt-5 md:w-full md:max-w-none sm:text-lg">
            <p>
              The Kubernetes Community Days in Munich will be held at the smartvillage Bogenhausen
              at Munich Arabellapark. Attendees can expect to enjoy a variety of vegetarian and
              vegan food options throughout the day.
            </p>
            <p className="mt-5">
              Do not miss out on the opportunity of fun, to connect with fellow attendees and
              continue the conversation at the networking Bowling event.
            </p>
            <p className="mt-5 font-bold">We can not wait to see you there!</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Venue;

import React from 'react';

import Link from 'components/shared/link';

const TITLE = 'Hotel information';

const Details = () => (
  <section className="safe-paddings bg-white py-40 2xl:py-24 md:py-24 sm:py-16">
    <div className="container-md">
      <div className="lg:mt-38 2xl:mt-24 xl:mt-32 md:mt-24">
        <h2 className="mt-3 text-center text-6xl font-bold leading-tight text-primary-1">
          {TITLE}
        </h2>

        <div className="lg:mt-38 2xl:mt-24 xl:mt-32 md:mt-24">
          <div className="mx-auto mt-5 max-w-[800px] text-center text-lg leading-normal text-primary-1">
            <p className="mt-7">Below you will find a hotel for accommodation:</p>
            <p className="mt-7">
              <span className="font-bold">Best Western Hotel Arabellapark Munich</span>
            </p>
            <p className="mt-7">
              Your <b>arrival is scheduled for June 30</b>, 2024, with <b>departure on July 2</b>,
              2024. The room rates are set at <b>105 Euros</b> per double room for single use per
              night.
            </p>

            <p className="mt-7">Address: Arabellastraße 15, 81925 Munich</p>

            <p className="mt-7">
              Bookable under the following email address:{' '}
              <a href="mailto:info@arabellapark.bestwestern.de" style={{ color: '#1800d4' }}>
                info@arabellapark.bestwestern.de
              </a>{' '}
              with the code "KCD Munich"
            </p>
            <p className="mt-7">
              Further details:{' '}
              <a href="https://hotel-arabellapark.de/" style={{ color: '#1800d4' }}>
                https://hotel-arabellapark.de
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Details;

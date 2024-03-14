import React from 'react';

import Link from 'components/shared/link';

const TITLE = 'Hotel information';

const Details = () => (
  <section className="safe-paddings bg-white py-40 md:py-24 sm:py-16">
    <div className="container-md">
      <div className="lg:mt-38 xl:mt-32 md:mt-24">
        <h2 className="mt-3 text-center text-6xl font-bold leading-tight text-primary-1">
          {TITLE}
        </h2>

        <div className="lg:mt-38 xl:mt-32 md:mt-24">
          <div className="mx-auto mt-5 max-w-[800px] text-lg leading-normal text-primary-1">
            <p className="mt-7">Below you will find a hotel for accommodation.</p>
            <p className="mt-7">
              <span className="font-bold">Best Western Hotel Arabellapark Munich</span>
            </p>
            <p className="mt-7">
              We are pleased to provide you with a detailed offer for your stay at our hotel. Your
              group is scheduled to <b>arrive on the 30th of June</b>, 2024, and{' '}
              <b>depart on the 2nd of July</b>, 2024. <br /> <br />
              For your accommodation needs, we have reserved{' '}
              <b>20 single rooms for the night of June 30th</b>. In addition, we have set aside{' '}
              <b>50 single rooms for the night of July 1st</b>, to comfortably accommodate the size
              of your group. <br /> <br />
              Regarding the room rates, we are offering the single rooms at a rate of{' '}
              <b>105.00 EUR per night</b>. This rate applies to single occupancy, ensuring that each
              of your guests will have their own private space to relax and unwind after a day in
              Munich.
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

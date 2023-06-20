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
        <p className="mt-7">
          Below you will find a hotel with which we have agreed discount rates for accommodation.
        </p>
        <p className="mt-7">
          <span className="font-bold">Best Western Hotel Arabellapark Munich</span>
        </p>
        <p className="mt-7">
          We have negotiated the following discount rates: 103€ /night/double room for single use/ breakfast not included. Room Book closes on 26.06.2023. The generall available dates are 16, 17, 18 July.
        </p>
        <p className="mt-7">
          Address: Arabellastraße 15, 81925 Munich
        </p>
        <p className="mt-7">
          Cancellation policy: The rooms can be canceled free of charge until 23.06. 2023. From 24. - 29.06. 2023, 50% of the reservation will be charged. From 30.06. - 05.07.23, 75% of the reservation will be charged. Everything after 05.07.23, including no show, will be charged at 90% of the reservation.
        </p>
        <p className="mt-7">
          Bookable under the following email address: <a href='mailto:info@arabellapark.bestwestern.de'>info@arabellapark.bestwestern.de</a> with the code "KCD Munich"
        </p>
        <p className="mt-7">
          Further details: <a href='https://hotel-arabellapark.de/'>https://hotel-arabellapark.de</a> 
        </p>
       </div>
      </div>
    </div>
  </div>
  </section>
);

export default Details;

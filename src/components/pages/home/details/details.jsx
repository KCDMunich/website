import React from 'react';

//import Link from 'components/shared/link';

//const TITLE = 'Hotel information';

const Details = () => (
  <section
    className="safe-paddings bg-white 2xl:pb-10 2xl:pt-0 md:pb-10 md:pt-0 sm:pb-10 sm:pt-0"
    style={{ paddingBottom: '93px' }}
  >
    <div className="container-md">
      <div className="2xl:mt-16 xl:mt-16 lg:mt-16 md:mt-16">
        <h2 className="mt-3 text-center text-6xl font-bold leading-tight text-primary-1">
          {/*   {TITLE}  */} Nearby Hotels
        </h2>
        {/* 
        <div className="lg:mt-38 2xl:mt-24 xl:mt-32 md:mt-24">
          <div className="mx-auto mt-5 max-w-[800px] text-center text-lg leading-normal text-primary-1">
            <p style={{ marginTop: '-43px' }}>
              <span className="font-bold">Best Western Hotel Arabellapark Munich</span>
            </p>
            <p className="mt-7">
              Your <b>arrival is scheduled for June 30 or July 1</b>, 2024, with{' '}
              <b>departure on July 2</b>, 2024. The room rates are set at <b>105 Euros</b> per
              double room for single use per night.
            </p>

            <p className="mt-7">Address: Arabellastraße 15, 81925 Munich</p>

            <p className="mt-7">
              Bookable under the following email address:{' '}
              <a href="mailto:info@hotel-arabellapark.de" style={{ color: '#1800d4' }}>
                info@hotel-arabellapark.de
              </a>{' '}
              with the code "CNS Munich"
            </p>
            <p className="mt-7">
              Further details:{' '}
              <a href="https://hotel-arabellapark.de/" style={{ color: '#1800d4' }}>
                https://hotel-arabellapark.de
              </a>
            </p>
          </div>
        </div>{' '}
        */}
        <div>
          <div className="mx-auto mt-5 max-w-[800px] text-center text-lg leading-normal text-primary-1">
            <div className="mt-7 text-center">
              <p>
                <b>Best Western Hotel Arabellapark Munich</b> - Arabellastraße 15, Munich
              </p>
              <p>
                <b>Four Points by Sheraton Munich Arabellapark</b> - Arabellastraße 5, Munich
              </p>
              <p>
                <b>Leonardo Hotel Munich Arabellapark</b> - Effnerstraße 99, Munich
              </p>
              <p>
                <b>The Westin Grand Munich</b> - Arabellastraße 6, Munich
              </p>
              <p>
                <b>Hilton Munich Park</b> - Am Tucherpark 7, Munich
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Details;

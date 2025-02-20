/* eslint-disable react/prop-types */
import React from 'react';

import Hero from 'components/pages/home/hero';
import HotelList from 'components/pages/home/hotels';
import Info from 'components/pages/home/info';
import Proposal from 'components/pages/home/proposal';
import Sponsors from 'components/pages/home/sponsors';
import Venue from 'components/pages/home/venue';
import Layout from 'components/shared/layout';
import SEO from 'components/shared/seo';

const HomePage = ({ location }) => (
  <Layout homepage>
    <Hero />
    <Info />
    <Proposal />
    <Venue />
    <HotelList />
    <Sponsors />
  </Layout>
);

/*
<Speakers location={location} />
<FloorPlan />
<GoldSponsor />
<Schedule />
<Venue />
<Details />
<Partners />
<Proposal />
<Tickets />
    <Speakers />
    <Sponsors />
    <Details />
*/

export default HomePage;

export const Head = ({ location: { pathname } }) => <SEO pathname={pathname} />;

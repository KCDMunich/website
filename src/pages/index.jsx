/* eslint-disable react/prop-types */
import React from 'react';

import Hero from 'components/pages/home/hero';
import Info from 'components/pages/home/info';
import Sponsors from 'components/pages/home/sponsors';
import Venue from 'components/pages/home/venue';
import HotelList from 'components/pages/home/hotels';
import Layout from 'components/shared/layout';
import SEO from 'components/shared/seo';

import GoldSponsor from 'components/pages/home/goldsponsor';

const HomePage = ({ location }) => (
  <Layout homepage>
    <Hero />
    <Info />
    <Venue />
    <HotelList />
    <Sponsors />
  </Layout>
);

/*
<Speakers location={location} />
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

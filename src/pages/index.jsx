/* eslint-disable react/prop-types */
import React from 'react';

import Hero from 'components/pages/home/hero';
import HotelList from 'components/pages/home/hotels';
import Info from 'components/pages/home/info';
import Sponsors from 'components/pages/home/sponsors';
import ScheduleTeaser from 'components/pages/home/schedule-teaser';
import Venue from 'components/pages/home/venue';
import Proposal from 'components/pages/home/proposal';
import Ticketing from 'components/pages/home/ticketing';
import Layout from 'components/shared/layout';
import SEO from 'components/shared/seo';

const HomePage = () => (
  <Layout homepage>
    <Hero />
    <Info />
    <ScheduleTeaser />
    <Ticketing />
    <Proposal />
    <Sponsors />
    <Venue />
    <HotelList />
  </Layout>
);

/*
<Speakers location={location} />
<FloorPlan />
<GoldSponsor />
<Proposal />
<Schedule />
<Venue />
<Partners />
<Tickets />
<Speakers />
<Sponsors />
*/

export default HomePage;

export const Head = ({ location: { pathname } }) => <SEO pathname={pathname} />;

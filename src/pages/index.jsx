/* eslint-disable react/prop-types */
import React from 'react';

import About from 'components/pages/home/about';
import Expect from 'components/pages/home/expect';
import Hero from 'components/pages/home/hero';
import HotelList from 'components/pages/home/hotels';
import ScheduleTeaser from 'components/pages/home/schedule-teaser';
import Speakers from 'components/pages/home/speakers';
import Sponsors from 'components/pages/home/sponsors';
import Ticketing from 'components/pages/home/ticketing';
import Venue from 'components/pages/home/venue';
import Layout from 'components/shared/layout';
import SEO from 'components/shared/seo';

const HomePage = () => (
  <Layout homepage>
    <Hero />
    <About />
    <Ticketing />
    <Expect />
    <ScheduleTeaser />
    <Speakers />
    <Sponsors />
    <Venue />
    <HotelList />
  </Layout>
);

export default HomePage;

export const Head = ({ location: { pathname } }) => <SEO pathname={pathname} />;

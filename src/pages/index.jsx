/* eslint-disable react/prop-types */
import React from 'react';

import Hero from 'components/pages/home/hero';
import Partners from 'components/pages/home/partners';
import Proposal from 'components/pages/home/proposal';
import Schedule from 'components/pages/home/schedule';
import Speakers from 'components/pages/home/speakers';
import Sponsors from 'components/pages/home/sponsors';
import Venue from 'components/pages/home/venue';
import Info from 'components/pages/home/info';
import Details from 'components/pages/home/details';
// import Workshops from 'components/pages/home/workshops';
import Layout from 'components/shared/layout';
import SEO from 'components/shared/seo';

const HomePage = ({ location }) => (
  <Layout homepage>
    <Hero />
    <Info />
    <Speakers location={location} />
    <Schedule />
    <Venue />
    <Details />
    <Sponsors />
    <Partners />
  </Layout>
);

export default HomePage;

export const Head = ({ location: { pathname } }) => <SEO pathname={pathname} />;

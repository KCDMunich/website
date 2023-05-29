/* eslint-disable react/prop-types */
import React from 'react';

import Hero from 'components/pages/speakers/hero';
import Speaker from 'components/pages/speakers/speakers';
import Layout from 'components/shared/layout';
import SEO from 'components/shared/seo';
import SEO_DATA from 'constants/seo-data';

const SpeakersPage = ({ location }) => (
  <Layout headerClassnames="!bg-white">
    <Hero />
    <Speaker location={location} />
  </Layout>
);

export default SpeakersPage;

export const Head = ({ location: { pathname } }) => (
  <SEO {...SEO_DATA.schedule} pathname={pathname} />
);
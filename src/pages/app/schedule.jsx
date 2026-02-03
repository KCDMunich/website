/* eslint-disable react/prop-types */
import React from 'react';

import Schedule from 'components/pages/schedule/schedule';
import SEO from 'components/shared/seo';
import SEO_DATA from 'constants/seo-data';

const ScheduleAppPage = ({ location }) => <Schedule location={location} variant="app" />;

export default ScheduleAppPage;

export const Head = ({ location: { pathname } }) => (
  <SEO {...SEO_DATA.schedule} pathname={pathname} />
);

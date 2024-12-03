import React from 'react';

import clsx from 'clsx';

import ApeFactory from 'icons/apefactory.svg';

import './goldsponsor.css';

const sponsors = [
  {
    name: 'Apple',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg',
  },
  {
    name: 'Google',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg',
  },
  {
    name: 'Microsoft',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg',
  },
  { name: 'Amazon', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg' },
  {
    name: 'Facebook',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/8/89/Facebook_Logo_%282019%29.svg',
  },
  { name: 'Tesla', logo: 'https://upload.wikimedia.org/wikipedia/commons/b/bd/Tesla_Motors.svg' },
  {
    name: 'Netflix',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg',
  },
  { name: 'Twitter', logo: ApeFactory },
  { name: 'Uber', logo: 'https://upload.wikimedia.org/wikipedia/commons/5/58/Uber_logo_2018.svg' },
  {
    name: 'Airbnb',
    logo: ApeFactory,
  },
];

const sponsorsList = [
  // Gold Sponsors
  { name: 'APE Factory', icon: ApeFactory, url: 'https://www.apefactory.com/de', tier: 'gold' },
  { name: 'Cisco', icon: ApeFactory, url: 'https://www.cisco.com/', tier: 'gold' },
  { name: 'Consol', icon: ApeFactory, url: 'https://www.consol.com/', tier: 'gold' },
  { name: 'MetalStack', icon: ApeFactory, url: 'https://metalstack.cloud/de', tier: 'gold' },
  { name: 'Palo Alto', icon: ApeFactory, url: 'https://www.paloaltonetworks.com/', tier: 'gold' },
  { name: 'Veeam', icon: ApeFactory, url: 'https://www.veeam.com/', tier: 'gold' },
];

const GoldSponsor = () => {
  return (
    <div className="sponsor-showcase">
      <div className="sponsor-container">
        {[...sponsors, ...sponsors].map((sponsor, index) => (
          <img key={index} src={sponsor.logo} alt={sponsor.name} className="sponsor-logo" />
        ))}
      </div>
    </div>
  );
};

export default GoldSponsor;

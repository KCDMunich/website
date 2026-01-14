/* eslint-disable react/prop-types */
import { useStaticQuery, graphql } from 'gatsby';
import React from 'react';

const defaultTitle = 'CNS Munich';
const defaultDescription = 'Experience the power of community at the Cloud Native Summit Munich!';

const SEO = ({ title, description, pathname }) => {
  const {
    site: {
      siteMetadata: { siteTitle, siteDescription, siteUrl, siteImage },
    },
  } = useStaticQuery(graphql`
    query SEO {
      site {
        siteMetadata {
          siteTitle
          siteDescription
          siteUrl
          siteImage
        }
      }
    }
  `);

  const currentTitle = title || defaultTitle || siteTitle;
  const currentDescription = description || defaultDescription || siteDescription;
  const currentUrl = pathname !== '/' ? `${siteUrl}${pathname}` : siteUrl;

  return (
    <>
      <title key="title">{currentTitle}</title>
      {/* General */}
      <meta key="description" name="description" content={currentDescription} />
      <meta key="robots" name="robots" content="index,follow" />
      {/* Open Graph */}
      <meta key="og:title" property="og:title" content={currentTitle} />
      <meta key="og:description" property="og:description" content={currentDescription} />
      <meta key="og:url" property="og:url" content={currentUrl} />
      <meta key="og:image" property="og:image" content={siteUrl + siteImage} />
      <meta key="og:type" property="og:type" content="website" />
      {/* Twitter */}
      <meta key="twitter:card" name="twitter:card" content="summary_large_image" />
    </>
  );
};

export default SEO;

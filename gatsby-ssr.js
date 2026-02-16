const React = require('react');

exports.onRenderBody = ({ setHtmlAttributes, setHeadComponents }) => {
  setHtmlAttributes({ lang: 'en', prefix: 'og: http://ogp.me/ns#' });
  setHeadComponents([
    React.createElement('link', {
      key: 'favicon-svg',
      rel: 'icon',
      href: '/favicon.svg',
      type: 'image/svg+xml',
    }),
    React.createElement('link', {
      key: 'apple-touch-icon',
      rel: 'apple-touch-icon',
      href: '/apple-touch-icon.png',
      sizes: '180x180',
    }),
  ]);
};

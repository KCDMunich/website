import clsx from 'clsx';
import { Link as GatsbyLink } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';

const styles = {
  base: 'font-semibold inline-flex items-baseline leading-none transition-colors duration-200 group relative cursor-pointer',
  size: {},
  theme: {
    primary: 'text-primary-1 hover:text-blue-1',
    'blue-underlined':
      'text-blue-1 border-b-2 hover:border-blue-1 pb-0.5 border-transparent transition-colors duration-200 cursor-pointer',
  },
};

const Link = ({ className: additionalClassName, size, theme, to, children, ...props }) => {
  const className = clsx(
    styles.base,
    size && styles.size[size],
    theme && styles.theme[theme],
    additionalClassName
  );

  return (
    <GatsbyLink to={to} className={className} {...props}>
      {children}
    </GatsbyLink>
  );
};

Link.propTypes = {
  className: PropTypes.string,
  size: PropTypes.string,
  theme: PropTypes.string,
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Link;

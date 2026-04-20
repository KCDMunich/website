exports.createPages = require('./gatsby/create-pages');
exports.onCreateNode = require('./gatsby/on-create-node');
exports.createSchemaCustomization = require('./gatsby/create-schema-customization');

// Disable Gatsby's built-in eslint-webpack-plugin — it doesn't support ESLint 9 flat config.
// Linting is handled by `npm run lint:js` using eslint.config.js instead.
exports.onCreateWebpackConfig = ({ actions, getConfig }) => {
  const config = getConfig();
  config.plugins = config.plugins.filter(
    (plugin) => plugin.constructor.name !== 'ESLintWebpackPlugin'
  );
  actions.replaceWebpackConfig(config);
};

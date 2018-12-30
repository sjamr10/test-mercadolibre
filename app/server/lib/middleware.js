const _ = require('lodash');
const { SSR } = require('app/shared/radioactive');

const isDevelopment = process.env.NODE_ENV === 'production';
const manifestPath = `${__dirname}/../../public/manifest.json`;
let manifest = null;

// List of HTML entities for escaping.
const htmlEscapes = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
};

// Regex containing the keys listed immediately above.
const htmlEscaper = /[&<>]/g;

// Escape a string for HTML interpolation.
const escape = (string) => `${string}`.replace(htmlEscaper, (match) => htmlEscapes[match]);

const environmentWhitelist = [
  'API.MAX_RETRIES',
  'API.TIMEOUT',
  'API.BASE_URL',
];

const getAssets = (type) => {
  const reg = new RegExp(`\~.*(\.${type})$`);
  const jsFiles = Object.keys(manifest).filter((file) => reg.test(file));
  return jsFiles.map((file) => manifest[file]);
};

const envMiddleware = (req, res, next) => {
  manifest = manifest === null ? require(manifestPath) : manifest;
  // is we are in development we need to always load the manifest to listen changes
  manifest = isDevelopment ? require(manifestPath) : manifest;
  const env = process.env.NODE_ENV === 'production' ? 'production' : 'development';
  const environmentVars = _.pick(JSON.parse(process.env.APP), environmentWhitelist);
  res.locals.TEST_MERCADOLIBRE = JSON.stringify(environmentVars);
  res.locals.MANIFEST = manifest;
  res.locals.ASSETS_JS = getAssets('js');
  res.locals.ASSETS_CSS = getAssets('css');
  res.locals.APP = environmentVars;
  res.locals.ENV = env;
  res.locals.escape = escape;
  next();
};

// Set SSR class to res locals
const ssrMiddleware = (req, res, next) => {
  res.locals.SSR = new SSR();
  res.locals.REACT_STATE = {};
  next();
};

module.exports = {
  envMiddleware,
  ssrMiddleware,
};

// Content-security-policy
const CSP = {
  directives: {
    defaultSrc: [
      "'self'",
      "data: * 'unsafe-inline' 'unsafe-eval'",
      'googletagmanager.com',
      'google-analytics.com',
      '*.olark.com',
      '*.hotjar.com',
      '*.facebook.net',
      'facebook.com',
    ],
    fontSrc: ["'self'"],
    imgSrc: ["'self'", 'data: *', 'google-analytics.com'],
  },
};

// Strict-transport-security
const STS = (req, res, next) => {
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  return next();
};

// generate robot txt file
const robotTXT = (req, res) => {
  res.type('text/plain');
  res.send('User-agent: *\nDisallow: /');
};

// Hot module reload for development
const HMR = (app) => {
  const webpack = require('webpack');
  const webpackMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const config = require('../../webpack.config.js');

  const compiler = webpack(config);
  const wpmw = webpackMiddleware(compiler, {
    hot: true,
    serverSideRender: true,
    publicPath: config.output.publicPath,
  });
  app.use(wpmw);
  const wphmw = webpackHotMiddleware(compiler);
  app.use(wphmw);
};

module.exports = {
  CSP,
  HMR,
  STS,
  robotTXT,
};

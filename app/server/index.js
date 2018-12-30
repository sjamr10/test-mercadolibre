global.__SSR__ = true;
global.TEST_MERCADOLIBRE = JSON.parse(process.env.APP);

// just for hhtps request to api
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const errorhandler = require('errorhandler');
const helmet = require('helmet');
const morgan = require('morgan');
const responseTime = require('response-time');
const serveStatic = require('serve-static');
const views = require('./views');
const routes = require('./routes');
const {
  CSP, STS, robotTXT, HMR,
} = require('./utils');

const isDevelopment = process.env.NODE_ENV === 'development';
const publicPath = 'app/public';
const staticFN = isDevelopment
  ? express.static(publicPath)
  : serveStatic(publicPath, { maxAge: '1d' });

const whitelist = ['/', '/cotizacion'];
const logFormat =
  'ip: :remote-addr, user: :remote-user, date: [:date[clf]], method: ":method :url HTTP/:http-version", status: :status, content: :res[content-length] ":referrer" ":user-agent, responseTime: :response-time ms';

const app = express();

// Constants
const { PORT, HOST } = TEST_MERCADOLIBRE;
app.use(helmet());
app.use(helmet.contentSecurityPolicy(CSP));
app.use(STS);
app.get('/robots.txt', robotTXT);
app.use(responseTime());
app.use(morgan(logFormat, {
  skip: (req) => !(req.baseUrl && (req.baseUrl.includes('/api') || whitelist.includes(req.url))),
}));
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(staticFN);

if (isDevelopment) {
  HMR(app);
  // better error handler
  app.use(errorhandler());
}

views(app);
routes(app);

app.listen(PORT, HOST, () => {
  console.log(`Running on http://${HOST}:${PORT}`);
});

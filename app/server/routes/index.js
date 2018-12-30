const { ssrMiddleware, envMiddleware } = require('../lib/middleware');
const MainRoutes = require('./main');

module.exports = (app) => {
  app.use(envMiddleware);
  app.use(ssrMiddleware);

  // home routes
  app.use(MainRoutes);
};

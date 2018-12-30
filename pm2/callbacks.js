const nconf = require('nconf');
const pm2 = require('pm2');
const logger = require('./logger');
const pkg = require('../package');

const isDevelopment = nconf.get('NODE_ENV') === 'development';

function displayLogs() {
  pm2.launchBus((err, bus) => {
    bus.on('log:out', (packet) => {
      let message = {};

      try {
        message = JSON.parse(packet.data);
      } catch (e) {
        message = { message: packet.data };
      }

      if (!isDevelopment) {
        logger.log({
          level: 'info',
          appName: pkg.name,
          appVersion: pkg.version,
          environment: nconf.get('NODE_ENV'),
          ...message,
        });
      } else {
        console.log(packet.data);
      }
    });

    bus.on('log:err', (packet) => {
      if (!isDevelopment) {
        logger.log({
          level: 'error',
          appName: pkg.name,
          appVersion: pkg.version,
          environment: nconf.get('NODE_ENV'),
          message: packet.data,
        });
      } else {
        console.error(packet.data);
      }
    });
  });
}

module.exports = {
  log() {
    displayLogs();
  },
};

const nconf = require('nconf');
const { createLogger, format, transports } = require('winston');

const { LogstashUDP } = require('winston-logstash-udp');
const { compact } = require('lodash');

const Logger = createLogger({
  level: nconf.get('BASE__LOGGER__LEVEL'),
  transports: compact([
    new transports.Console(),
    null,
  ]),
  format: format.logstash(),
});

module.exports = Logger;

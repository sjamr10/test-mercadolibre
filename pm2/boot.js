require('../settings');
const path = require('path');
const nconf = require('nconf');
const pm2 = require('pm2');
const bootCallback = require('./callbacks');
const varSchema = require('./environmentSchema');

const ENV = nconf.get('NODE_ENV');
const instances = nconf.get('BASE__CONCURRENCY');
const maxMemory = nconf.get('BASE__MAX_MEMORY');
const MACHINE_NAME = nconf.get('BASE__NAME');
const isDevelopment = ENV === 'development';
const ENVIRONMENT_VARS = nconf.get('APP');

console.log(`MACHINE_NAME:${MACHINE_NAME}`);
console.log(`WEB_MEMORY: ${maxMemory}`);

const apps = [
  {
    script: 'index.js',
    name: MACHINE_NAME,
    exec_mode: isDevelopment ? 'fork' : 'cluster',
    node_args: isDevelopment ? ['--inspect=5858'] : [],
    instances,
    watch: isDevelopment,
    ignore_watch: [
      'test',
      '.git',
      'node_modules',
      'app/assets/scss',
      'app/assets/images',
      'app/public',
      'app/client',
      'pm2',
    ],
    max_memory_restart: `${maxMemory}M`,
    env: {
      APP: varSchema.cast(ENVIRONMENT_VARS),
      NODE_ENV: ENV,
      DEBUG_COLORS: !isDevelopment,
    },
    args: ['--color'],
    post_update: ['npm install'],
  },
];

// just in development mode, watch file changing to reload app
if (isDevelopment) {
  apps.unshift({
    script: path.join(__dirname, '/dev-apps/assets-dev.js'),
    name: 'ASSETS-DEV-BUILD',
    exec_mode: 'fork',
    instances: 1,
  });
}

pm2.connect(() => {
  pm2.killInteract(() => {});
  pm2.start(apps, (appName) => {
    bootCallback.log();
  });
});

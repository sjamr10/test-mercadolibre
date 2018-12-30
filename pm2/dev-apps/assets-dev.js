const shell = require('shelljs');

shell.exec('rm -rf app/public');
shell.exec('npx webpack --config library.webpack.config.js');
shell.exec('npx gulp watch', { async: true });

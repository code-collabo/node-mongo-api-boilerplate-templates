const { spawn } = require('child_process');
const { success, error } = require('./consolemsg');
const package_json = require('../../package.json');

/* eslint-disable no-console */

const watchEslint = () => {
  const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm';
  spawn(npm, ['run', 'lint:watch'], { cwd: './', stdio: 'inherit' });
}

const server = (serverPort) => {
  try {
    success(`\nnode-mongo (Commonjs Module) API boilerplate template v${package_json.version}`);
    success(`\nServer running at ${serverPort}`);
  } catch (err) {
    error(`${{ err }}`);
  }
}

const eslintAndServer = (serverPort) => {
  watchEslint();
  server(serverPort);
}

const afterAtlasDBconnectSuccessful = (serverPort) => {
  success('\nConnected to mongoDB ATLAS');
  eslintAndServer(serverPort);
}

const afterLocalDBconnectSuccessful = (serverPort) => {
  success('\nConnected to LOCAL mongoDB');
  eslintAndServer(serverPort);
}

module.exports = {
  watchEslint,
  server,
  afterAtlasDBconnectSuccessful,
  afterLocalDBconnectSuccessful
};

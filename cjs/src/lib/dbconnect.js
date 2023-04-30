const { spawn } = require('child_process');
const { success, error, warning } = require('./consolemsg');
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

const connectToDBunsuccessful = (err) => {
  error(`\nError in DB connection: ${err.message}\n`);
  warning('Refer to the node-mongo documentation: https://code-collabo.gitbook.io/node-mongo-v2.0.0\n\nGet further help from Code Collabo Community\'s Node mongo channel: https://matrix.to/#/#collabo-node-mongo:gitter.im');
}

module.exports = {
  watchEslint,
  server,
  afterAtlasDBconnectSuccessful,
  afterLocalDBconnectSuccessful,
  connectToDBunsuccessful,
};

import { spawn } from 'child_process';
import { success, error, warning } from './consolemsg';
import package_json from '../../package.json';

/* eslint-disable no-console */

export const watchEslint = () => {
  const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm';
  spawn(npm, ['run', 'lint:watch'], { cwd: './', stdio: 'inherit' });
}

export const server = (serverPort) => {
  try {
    success(`\nnode-mongo (ES Module) API boilerplate template v${package_json.version}`);
    success(`\nServer running at ${serverPort}`);
  } catch (err) {
    error(`${{ err }}`);
  }
}

const eslintAndServer = (serverPort) => {
  watchEslint();
  server(serverPort);
}

export const afterAtlasDBconnectSuccessful = (serverPort) => {
  success('\nConnected to mongoDB ATLAS');
  eslintAndServer(serverPort);
}

export const afterLocalDBconnectSuccessful = (serverPort) => {
  success('\nConnected to LOCAL mongoDB');
  eslintAndServer(serverPort);
}

export const connectToDBunsuccessful = (err) => {
  error(`\nError in DB connection: ${err.message}\n`);
  warning('Refer to the node-mongo documentation: https://code-collabo.gitbook.io/node-mongo-v2.0.0\n\nGet further help from Code Collabo Community\'s Node mongo channel: https://matrix.to/#/#collabo-node-mongo:gitter.im');
}

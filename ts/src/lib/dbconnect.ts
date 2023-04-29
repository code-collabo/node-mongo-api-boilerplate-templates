import { spawn } from 'child_process';
import { success, error } from './consolemsg';
import package_json from '../../package.json';

/* eslint-disable no-console */

const watchEslint = () => {
  const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm';
  spawn(npm, ['run', 'lint:watch'], { cwd: './', stdio: 'inherit' });
}

const server = (serverPort: number | string): void => {
  try {
    success(`\nnode-mongo (Typescript) API boilerplate template v${package_json.version}`);
    success(`\nServer running at ${serverPort}`);
  } catch (err) {
    error(`${{ err }}`);
  }
}

export const afterDBconnectSuccessful = (serverPort: number | string) => {
  success('\nConnected to mongoDB ATLAS');
  watchEslint();
  server(serverPort);
}

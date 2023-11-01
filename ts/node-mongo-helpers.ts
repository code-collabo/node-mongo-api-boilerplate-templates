import { spawn } from 'child_process';
import package_json from './package.json';
import chalk from 'chalk';

/* eslint-disable no-console */

// console
export const success = (message: string) => {
  console.log( chalk.greenBright(message) );
}

export const warning = (message: string) => {
  console.log( chalk.yellowBright(message) );
}

export const error = (message: string) => {
  console.log( chalk.redBright(message) );
}

// DB connect
export const npmRunPackageJsonScript = ({ script, currentWorkingDir } : { script: string, currentWorkingDir: string }): void => {
  const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm';
  spawn(npm, ['run', script], { cwd: currentWorkingDir, stdio: 'inherit' });
}

export const server = (serverPort: number | string): void => {
  try {
    success(`\nnode-mongo (Typescript) API boilerplate template v${package_json.version}`);
    success(`\nServer running at ${serverPort}`);
  } catch (err) {
    error(`${{ err }}`);
  }
}

const eslintAndServer = (serverPort: number | string) => {
  npmRunPackageJsonScript({ script: 'lint:watch', currentWorkingDir: './' });
  server(serverPort);
}

export const afterDBConnectSuccessful = (serverPort: number | string, message: string) => {
  success(message);
  eslintAndServer(serverPort);
}

export const connectToDBunsuccessful = (err: { message: unknown; }) => {
  error(`\nError in DB connection: ${err.message}\n`);
  warning('Refer to the node-mongo documentation: https://code-collabo.gitbook.io/node-mongo-v2.0.0\n\nGet further help from Code Collabo Community\'s Node mongo channel: https://matrix.to/#/#collabo-node-mongo:gitter.im\n');
}

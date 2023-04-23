import { spawn } from 'child_process';

/* eslint-disable no-console */

export const watchEslint = () => {
  const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm';
  spawn(npm, ['run', 'lint:watch'], { cwd: './', stdio: 'inherit' });
}

export const server = (serverPort: number | string): void => {
  try {
    console.log(`\nServer running at ${serverPort}`);
  } catch (err) {
    console.log({ err });
  }
}
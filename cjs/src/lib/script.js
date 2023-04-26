const { spawn } = require('child_process');

/* eslint-disable no-console */

const watchEslint = () => {
  const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm';
  spawn(npm, ['run', 'lint:watch'], { cwd: './', stdio: 'inherit' });
}

const server = (serverPort) => {
  try {
    console.log(`\nServer running at ${serverPort}`);
  } catch (err) {
    console.log({ err });
  }
}

module.exports = {
  watchEslint,
  server
};
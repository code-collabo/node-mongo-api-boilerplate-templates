const chalk = require('chalk');

/* eslint-disable no-console */

const success = (message) => {
  console.log( chalk.greenBright(message) );
}

const error = (message) => {
  console.log( chalk.redBright(message) );
}

module.exports = {
  success,
  error
};

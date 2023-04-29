const chalk = require('chalk');

/* eslint-disable no-console */

async function getAppController (req, res) {
  res.status(200).json({
    message: 'App works!'
  });
  console.log( chalk.greenBright('App works!') );
}

module.exports = { getAppController };

import chalk from 'chalk';

/* eslint-disable no-console */

export const getAppController = async (req, res) => {
  res.status(200).json({
    message: 'App works!'
  });
  console.log( chalk.greenBright('App works!') );
}

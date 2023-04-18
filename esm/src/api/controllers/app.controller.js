import chalk from 'chalk';

/* eslint-disable no-console */

const getAppController = async (req, res) => {
  res.status(200).json({
    message: "App works!",
  });
  console.log(
    chalk.greenBright("\nApp works! \n\nRunning at http://localhost:3000/\n")
  );
};


export { getAppController };

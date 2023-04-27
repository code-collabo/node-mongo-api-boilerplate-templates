import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { server, watchEslint } from './lib/script';
import chalk from "chalk";
/* eslint-disable no-console */

dotenv.config();

const mongooseAtlasConnect = async (port: number | string) => {
  try {
    await mongoose.connect(`${process.env.MONGODB_ATLAS_URI}`);
    console.log(chalk.green('\nConnected to mongoDB ATLAS'));
    server(port);
    watchEslint();
  } catch (err) {
    console.log(chalk.red(`\nError in DB connection: ${err.message} \n`));
  }
}

export default mongooseAtlasConnect;

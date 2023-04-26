import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { server, watchEslint } from './lib/script';

/* eslint-disable no-console */

dotenv.config();

const mongooseLocalConnect = async (port) => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}`);
    console.log('\nConnected to local mongoDB');
    server(port);
    watchEslint();
  } catch (err) {
    console.log(`\nError in DB connection: ${err.message} \n`);
  }
}

export default mongooseLocalConnect;

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { server } from './server.atlas';
import { watchEslint } from './lib/script';

/* eslint-disable no-console */

dotenv.config();

async function mongooseAtlasConnect(port: number | string) {
  try {
    await mongoose.connect(`${process.env.MONGODB_ATLAS_URI}`);
    console.log('\nConnection to mongoDB ATLAS successful!!!');
    server(port);
    watchEslint();
  } catch (err) {
    console.log(`\nError in DB connection: ${err.message} \n`);
  }
}

export default mongooseAtlasConnect;

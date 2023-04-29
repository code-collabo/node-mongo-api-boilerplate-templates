import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { afterAtlasDBconnectSuccessful } from './lib/dbconnect';
import { error } from './lib/consolemsg';

dotenv.config();

const mongooseAtlasConnect = async (port) => {
  try {
    await mongoose.connect(`${process.env.MONGODB_ATLAS_URI}`);
    afterAtlasDBconnectSuccessful(port);
  } catch (err) {
    error(`\nError in DB connection: ${err.message} \n`);
  }
}

export default mongooseAtlasConnect;

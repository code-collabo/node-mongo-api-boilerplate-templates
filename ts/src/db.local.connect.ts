import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { afterDBconnectSuccessful } from './lib/dbconnect';
import { error } from './lib/consolemsg';

dotenv.config();

const mongooseLocalConnect = async (port: number | string) => {
  try {
    await mongoose.connect(`${process.env.MONGODB_LOCAL_URI}`);
    afterDBconnectSuccessful(port);
  } catch (err) {
    error(`\nError in DB connection: ${err.message} \n`);
  }
}

export default mongooseLocalConnect;

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { afterLocalDBconnectSuccessful } from './lib/dbconnect';
import { error } from './lib/consolemsg';

dotenv.config();

const mongooseLocalConnect = async (port) => {
  try {
    await mongoose.connect(`${process.env.MONGODB_LOCAL_URI}`);
    afterLocalDBconnectSuccessful(port);
  } catch (err) {
    error(`\nError in DB connection: ${err.message} \n`);
  }
}

export default mongooseLocalConnect;

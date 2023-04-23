import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

async function mongooseAtlasConnect() {
  try {
   await mongoose.connect(`${process.env.MONGODB_ATLAS_URI}`);
    console.log('\nConnection to mongoDB ATLAS successful!!!');
  } catch (err) {
    console.log(`\nError in DB connection: ${err.message} \n`);
    // process.exit(1);
  }
}

export default mongooseAtlasConnect;

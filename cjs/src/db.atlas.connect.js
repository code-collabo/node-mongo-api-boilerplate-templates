const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { server, watchEslint } = require('./lib/script');

/* eslint-disable no-console */

dotenv.config();

const mongooseAtlasConnect = async (port) => {
  try {
    await mongoose.connect(`${process.env.MONGODB_ATLAS_URI}`);
    console.log('\nConnected to mongoDB ATLAS');
    server(port);
    watchEslint();
  } catch (err) {
    console.log(`\nError in DB connection: ${err.message} \n`);
  }
}

module.exports = mongooseAtlasConnect;

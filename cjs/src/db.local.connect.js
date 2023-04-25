const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { server, watchEslint }  = require('./lib/script');

/* eslint-disable no-console */

dotenv.config();

const mongooseConnect = async (port) => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}`);
    console.log('\nConnected to local mongoDB');
    server(port);
    watchEslint();
  } catch (err) {
    console.log(`\nError in DB connection: ${err.message} \n`);
  }
}

module.exports = mongooseConnect;

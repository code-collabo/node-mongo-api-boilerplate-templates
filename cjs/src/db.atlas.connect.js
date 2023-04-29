const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { afterAtlasDBconnectSuccessful } = require('./lib/dbconnect');
const { error } = require('./lib/consolemsg');

dotenv.config();

const mongooseAtlasConnect = async function (port) {
  try {
    await mongoose.connect(`${process.env.MONGODB_ATLAS_URI}`);
    afterAtlasDBconnectSuccessful(port);
  } catch (err) {
    error(`\nError in DB connection: ${err.message} \n`);
  }
}

module.exports = mongooseAtlasConnect;

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { afterLocalDBconnectSuccessful }  = require('./lib/dbconnect');
const { error }  = require('./lib/consolemsg');

dotenv.config();

const mongooseLocalConnect = async function (port) {
  try {
    await mongoose.connect(`${process.env.MONGODB_LOCAL_URI}`);
    afterLocalDBconnectSuccessful(port);
  } catch (err) {
    error(`\nError in DB connection: ${err.message} \n`);
  }
}

module.exports = mongooseLocalConnect;

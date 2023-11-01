const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { app } = require('./app');
const { afterDBConnectSuccessful, connectToDBunsuccessful } = require('../node-mongo-helpers');

dotenv.config();

// Define logic to check type of connection used and create necessary variables
const mode = process.env.MODE || 'atlas';
const connectionValues = {
    'URI': '',
    'port': '',
    'successMessage': ''
}

if (mode == 'local') {
    connectionValues.URI = `${process.env.MONGODB_LOCAL_URI}`,
    connectionValues.port = `${process.env.PORT_LOCAL || 3000}`,
    connectionValues.successMessage = '\nConnected to LOCAL mongoDB'
} else {
    connectionValues.URI = `${process.env.MONGODB_ATLAS_URI}`,
    connectionValues.port = `${process.env.PORT_ATLAS || 3000}`,
    connectionValues.successMessage = '\nConnected to mongoDB ATLAS'
}

const mongooseConnect = async (port, uri, successMessage) => {
    try {
        await mongoose.connect(uri);
        afterDBConnectSuccessful(port, successMessage);
    } catch (err) {
        connectToDBunsuccessful(err);
    }
}

app.listen(connectionValues.port, () => {
    mongooseConnect(connectionValues.port, connectionValues.URI, connectionValues.successMessage);
});

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
let appRouter = require('./api/routes/app.route');
let demoRouter = require('./api/routes/demo.route');

//===== Installed mongoDB's db =======
const mongooseModuleExport = require('./db'); //eslint-disable-line no-unused-vars

//===== MongoDB ATLAS db =======
//const mongooseModuleExportAtlas = require('./atlas/db'); //eslint-disable-line no-unused-vars

const app = express();

app.use(morgan('dev'));
app.use(express.urlencoded({
  extended: false
}));
app.use(express.json());
app.use(cors({ origin: 'http://localhost:4200' }));

app.use('/', appRouter);
app.use('/demo', demoRouter);

app.use((req, res, next) => {
  const error = new Error('Route not found!');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {//eslint-disable-line no-unused-vars
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;

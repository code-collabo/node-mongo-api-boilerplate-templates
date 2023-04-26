const mongooseLocalConnect = require('./db.local.connect');
const { app } = require('./app');

const port = process.env.PORT || 3000;

app.listen(port, function () {
  mongooseLocalConnect(port);
});

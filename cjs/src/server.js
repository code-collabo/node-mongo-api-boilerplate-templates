const mongooseConnect = require('./db.connect');
const { app } = require('./app');

const port = process.env.PORT || 3000;

app.listen(port, () => {
  mongooseConnect(port);
});

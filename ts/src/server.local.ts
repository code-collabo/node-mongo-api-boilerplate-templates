import mongooseConnect from './db.local.connect';
import { app as app } from './app';

const port = process.env.PORT || 3000;

app.listen(port, () => {
  mongooseConnect(port);
});

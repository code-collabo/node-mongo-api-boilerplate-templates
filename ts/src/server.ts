import mongooseConnect from './db.connect';
import { app as app } from './app';

const port = process.env.PORT || 3000;

app.listen(port, async () => {
  try {
    console.log(`\nServer running at ${process.env.API_HOST_URL}`);
    await mongooseConnect();
  } catch (err) {
    console.log(err);
  }
});

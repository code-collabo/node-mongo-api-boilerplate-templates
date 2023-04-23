import mongooseAtlasConnect from './db.atlas.connect';
import { app as app } from './app';

const port = process.env.PORT || 3000;

(async () => {
  await mongooseAtlasConnect();
  app.listen(port, () => {
    try {
      console.log(`\nServer running at http://localhost:${port}`);
    } catch (err) {
      console.log(err);
    }
  });
})();


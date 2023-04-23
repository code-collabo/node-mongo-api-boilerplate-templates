import mongooseConnect from './db.connect';
import { app as app } from './app';

const port = process.env.PORT || 3000;

(async () =>{
  await mongooseConnect();
  app.listen(port, () => {
    try {
      console.log(`\nServer running at ${process.env.API_HOST_URL}`);
    } catch (err) {
      console.log(err);
    }
  });
})();



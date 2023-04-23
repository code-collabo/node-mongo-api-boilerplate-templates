import mongooseAtlasConnect from './db.atlas.connect';
import { app as app } from './app';

/* eslint-disable no-console */

const port = process.env.PORT || 3000;

export const server = (serverPort: number | string): void => {
  try {
    console.log(`\nServer running at ${serverPort}`);
  } catch (err) {
    console.log({ err });
  }
}

app.listen(port, () => {
  mongooseAtlasConnect(port);
});

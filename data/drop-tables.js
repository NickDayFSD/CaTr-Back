/* eslint-disable no-console */
import client from '../lib/client.js';

run();

async function run() {

  try {
    await client.query(`
      DROP TABLE IF EXISTS users CASCADE,
      DROP TABLE IF EXISTS characters CASCADE,
      DROP TABLE IF EXISTS campaigns CASCADE,
      DROP TABLE IF EXISTS statistics CASCADE
    `);

    console.log('Tables have been dropped');
  }
  catch(err) {
    console.log(err);
  }
  finally {
    client.end();
  }
}

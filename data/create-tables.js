/* eslint-disable no-console */
import client from '../lib/client.js';

run();

async function run() {
  try{
    await client.query(`
      CREATE TABLE users (
        id SERIAL PRIMARY KEY NOT NULL,
        email VARCHAR(256) NOT NULL,
        player_name VARCHAR(256) NOT NULL,
        hash VARCHAR(512) NOT NULL
      );
      
      CREATE TABLE characters (
        character_name VARCHAR(256) NOT NULL,
        player VARCHAR(256) NOT NULL REFERENCES users(player_name),
        level NUMBER(2) NOT NULL,
        description VARCHAR(512),
        backstory VARCHAR(9001)
      );

      CREATE TABLE campaigns (
        id SERIAL PRIMARY KEY NOT NULL,
        campaign_name VARCHAR(256) NOT NULL,
        user_id VARCHAR(256) NOT NULL REFERENCES users(id),
        story VARCHAR(9001),
        dm_notes VARCHAR(9001)
      );

      CREATE TABLE statistics (
        character_name VARCHAR(256) NOT NULL,
        damage_round VARCHAR(256),
        damage_hit VARCHAR(256),
        kill_list VARCHAR(512),
        skill_check VARCHAR(256)
      );
    `);

    console.log('create tables complete');
  } 
  catch(err) {
    console.log(err);
  }
  finally {
    client.end();
  }
}


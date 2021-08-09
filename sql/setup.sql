DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS characters,
campaigns,
statistics;
CREATE TABLE users (
  id BIGINT GENERATED ALWAYS AS PRIMARY KEY,
  email VARCHAR(256) NOT NULL UNIQUE,
  player_name VARCHAR(256) NOT NULL,
  password_hash VARCHAR(512) NOT NULL
);
CREATE TABLE characters (
  id BIGINT GENERATED ALWAYS AS PRIMARY KEY,
  character_name VARCHAR(256) NOT NULL,
  player_id BIGINT REFERENCES users(id),
  level NUMBER(2) NOT NULL,
  description VARCHAR(512),
  backstory VARCHAR(9001)
);
CREATE TABLE campaigns (
  id BIGINT GENERATED ALWAYS AS PRIMARY KEY,
  campaign_name VARCHAR(256) NOT NULL,
  users VARCHAR(256) NOT NULL REFERENCES users(id),
  story VARCHAR(9001),
  dm_notes VARCHAR(9001)
);
CREATE TABLE statistics (
  character_id BIGINT REFERENCES characters(id),
  campaign_id damage_round VARCHAR(256),
  damage_hit VARCHAR(256),
  kill_list VARCHAR(512),
  skill_check VARCHAR(256)
);
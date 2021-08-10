import pool from '../utils/pool.js';

class Character {
  id;
  characterName;
  playerId;
  level;
  description;
  backstory;

  constructor(row) {
    this.id = row.id;
    this.characterName = row.character_name;
    this.playerId = row.player_id;
    this.level = row.level;
    this.description = row.description;
    this.backstory = row.backstory;    
  }

  static async insert({ characterName, playerId, level, description, backstory }) {
    const { rows } = await pool.query(
      'INSERT INTO characters (character_name, player_id, level, description, backstory) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [characterName, playerId, level, description, backstory]
    );
    return new Character(rows[0]);
  }

  static async findById(id) {
    const { rows } = await pool.query(
      'SELECT * FROM characters WHERE id = $1', [id]
    );
    return new Character(rows[0]);
  }

  static async findAll() {
    const { rows } = await pool.query(
      'SELECT * FROM characters'
    );
    return rows.map(row => new Character(row));
  }

  static async update(id, { characterName, playerId, level, description, backstory }) {
    const { rows } = await pool.query(
      'UPDATE characters SET character_name = $1, player_id = $2, level = $3, description = $4, backstory = $5 WHERE id = $6 RETURNING *',
      [characterName, playerId, level, description, backstory, id]
    );
    console.log(rows[0])
    return new Character(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(
      'DELETE FROM characters WHERE id = $1 RETURNING *', [id]
    );
    return new Character(rows[0]);
  }
}

export default Character;

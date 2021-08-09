import pool from '../utils/pool.js';

class User {
  id;
  email;
  playerName;
  passwordHash;

  constructor(row) {
    this.id = row.id;
    this.email = row.email;
    this.playerName = row.player_name;
    this.passwordHash = row.password_hash;
  }

  static async insert({ email, playerName, passwordHash }) {
    const { rows } = await pool.query(
      'INSERT INTO users (email, player_name, password_hash) VALUES $X RETURNING *',
      [email, playerName, passwordHash]
    );
    return new User(rows[0]);
  }

  static async findById(id) {
    const { rows } = await pool.query(
      'SELECT * FROM users WHERE id = $1', [id]
    );

    if(!rows) return null;

    return new User(rows[0]);
  }

  static async update({ id, email, playerName, passwordHash }) {
    const { rows } = await pool.query(
      'UPDATE users SET email = $1, player_name = $2, password_hash = $3 WHERE id = $4',
      [email, playerName, passwordHash, id]
    );

    return new User(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(
      'DELETE FROM users WHERE id = $1 RETURNING *', [id]
    );

    return new User(rows[0]);
  }
}

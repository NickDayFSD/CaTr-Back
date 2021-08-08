import dotenv from 'dotenv';
import pg from 'pg';

dotenv.config();
const Client = pg.Client;

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.PGSSLMODE && { rejectUnauthorized: false }
});

client.connect().then(() => {
  const { database, host, port } = client;
  console.log(`Connected to PG Database: ${database} on ${host}:${port}`);
});

export default client;

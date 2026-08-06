import pool from './db/index.js';

afterAll(async () => {
  await pool.end(); // cierra todas las conexiones abiertas
});
import pool from '../../db/index.js';

// Obtener todos los autores
export async function getAllAuthors() {
  const result = await pool.query('SELECT * FROM authors ORDER BY id');
  return result.rows;
}

// Obtener autor por ID
export async function getAuthorById(id) {
  const result = await pool.query('SELECT * FROM authors WHERE id = $1', [id]);
  return result.rows[0] || null;
}

// Crear autor
export async function createAuthor({ name, email, bio }) {
  if (!name) throw new Error('name es obligatorio');
  if (!email) throw new Error('email es obligatorio');

  const result = await pool.query(
    'INSERT INTO authors (name, email, bio) VALUES ($1, $2, $3) RETURNING *',
    [name, email, bio]
  );
  return result.rows[0];
}

// Actualizar autor
export async function updateAuthor(id, { name, email, bio }) {
  const result = await pool.query(
    'UPDATE authors SET name=$1, email=$2, bio=$3 WHERE id=$4 RETURNING *',
    [name, email, bio, id]
  );
  return result.rows[0] || null;
}

// Eliminar autor
export async function deleteAuthor(id) {
  const result = await pool.query(
    'DELETE FROM authors WHERE id=$1 RETURNING *',
    [id]
  );
  return result.rows[0] || null;
}
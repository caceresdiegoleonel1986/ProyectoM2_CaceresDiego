import pool from '../../db/index.js';

// Listar todos los posts
export async function getAllPosts() {
  const result = await pool.query(
    `SELECT p.*, a.name AS author_name, a.email AS author_email
     FROM posts p
     JOIN authors a ON p.author_id = a.id
     ORDER BY p.id`
  );
  return result.rows;
}

// Obtener un post por ID
export async function getPostById(id) {
  const result = await pool.query(
    `SELECT p.*, a.name AS author_name, a.email AS author_email
     FROM posts p
     JOIN authors a ON p.author_id = a.id
     WHERE p.id = $1`,
    [id]
  );
  return result.rows[0] || null;
}

// Obtener posts de un autor
export async function getPostsByAuthor(authorId) {
  const result = await pool.query(
    `SELECT p.*, a.name AS author_name, a.email AS author_email
     FROM posts p
     JOIN authors a ON p.author_id = a.id
     WHERE p.author_id = $1
     ORDER BY p.id`,
    [authorId]
  );
  return result.rows;
}

// Crear un nuevo post
export async function createPost({ title, content, author_id, published }) {
  if (!title) throw new Error('title es obligatorio');
  if (!content) throw new Error('content es obligatorio');
  if (!author_id) throw new Error('author_id es obligatorio');

  const result = await pool.query(
    `INSERT INTO posts (title, content, author_id, published)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [title, content, author_id, published ?? false]
  );
  return result.rows[0];
}

// Actualizar un post
export async function updatePost(id, { title, content, author_id, published }) {
  // Construimos dinámicamente los SET
  const fields = [];
  const values = [];
  let idx = 1;

  if (title !== undefined) {
    fields.push(`title=$${idx++}`);
    values.push(title);
  }
  if (content !== undefined) {
    fields.push(`content=$${idx++}`);
    values.push(content);
  }
  if (author_id !== undefined) {
    fields.push(`author_id=$${idx++}`);
    values.push(author_id);
  }
  if (published !== undefined) {
    fields.push(`published=$${idx++}`);
    values.push(published);
  }

  if (fields.length === 0) {
    // nada para actualizar
    return null;
  }

  values.push(id);

  const result = await pool.query(
    `UPDATE posts SET ${fields.join(', ')} WHERE id=$${idx} RETURNING *`,
    values
  );

  return result.rows[0] || null;
}

// Eliminar un post
export async function deletePost(id) {
  const result = await pool.query(
    'DELETE FROM posts WHERE id=$1 RETURNING *',
    [id]
  );
  return result.rows[0] || null;
}
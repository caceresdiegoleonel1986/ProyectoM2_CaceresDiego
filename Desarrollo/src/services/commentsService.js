import pool from '../../db/index.js';

// Obtener todos los comentarios
export async function getAllComments() {
  const result = await pool.query("SELECT * FROM comments ORDER BY id ASC");
  return result.rows;
}

// Obtener comentarios de un post
export async function getCommentsByPost(postId) {
  const result = await pool.query(
    `SELECT c.*, a.name AS author_name
     FROM comments c
     JOIN authors a ON c.author_id = a.id
     WHERE c.post_id = $1
     ORDER BY c.id`,
    [postId]
  );
  return result.rows;
}

// Crear un nuevo comentario
export async function createComment({ post_id, author_id, content }) {
  if (!content) throw new Error('content es obligatorio');
  if (!post_id) throw new Error('post_id es obligatorio');
  if (!author_id) throw new Error('author_id es obligatorio');

  const result = await pool.query(
    `INSERT INTO comments (post_id, author_id, content)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [post_id, author_id, content]
  );
  return result.rows[0];
}

// Actualizar comentario
export async function updateComment(id, { content }) {
  const result = await pool.query(
    `UPDATE comments
     SET content = $1
     WHERE id = $2
     RETURNING *`,
    [content, id]
  );
  return result.rows[0] || null;
}

// Eliminar comentario
export async function deleteComment(id) {
  const result = await pool.query(
    'DELETE FROM comments WHERE id = $1 RETURNING *',
    [id]
  );
  return result.rows[0] || null;
}
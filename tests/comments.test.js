import request from 'supertest';
import app from '../app.js';

describe('Comments API', () => {
  let createdPostId;
  let createdAuthorId;
  let createdCommentId;

  beforeAll(async () => {
    // 1. Crear un author con email único
    const authorRes = await request(app).post('/authors').send({
      name: 'Autor Test',
      email: `autor_comments_${Date.now()}@example.com`, // email dinámico
      bio: 'Bio de prueba',
    });
    createdAuthorId = authorRes.body.id;

    // 2. Crear un post asociado
    const postRes = await request(app).post('/posts').send({
      title: 'Post de prueba',
      content: 'Contenido inicial',
      author_id: createdAuthorId,
      published: true,
    });
    createdPostId = postRes.body.id;
  });

  // 3. Listar todos los comentarios
  it('📋 should list all comments', async () => {
    const res = await request(app).get('/comments');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  // 4. Crear un nuevo comentario
  it('✅ should create a new comment', async () => {
    const res = await request(app).post('/comments').send({
      post_id: createdPostId,
      author_id: createdAuthorId,
      content: 'Este es un comentario de prueba',
    });
    expect(res.statusCode).toBe(201);
    expect(res.body.content).toBe('Este es un comentario de prueba');
    createdCommentId = res.body.id;
  });

  // 5. Listar comentarios de un post
  it('📋 should list comments for a post', async () => {
    const res = await request(app).get(`/comments/post/${createdPostId}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  // 6. Actualizar un comentario
  it('✏️ should update a comment', async () => {
    const res = await request(app).put(`/comments/${createdCommentId}`).send({
      content: 'Comentario actualizado',
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.content).toBe('Comentario actualizado');
  });

  // 7. Eliminar un comentario
  it('🗑️ should delete a comment', async () => {
    const res = await request(app).delete(`/comments/${createdCommentId}`);
    expect(res.statusCode).toBe(204);
  });

  // 8. Intentar actualizar un comentario inexistente
  it('🚫 should return 404 when updating a non-existing comment', async () => {
    const res = await request(app).put('/comments/99999').send({
      content: 'No existe',
    });
    expect(res.statusCode).toBe(404);
    expect(res.body.error).toBe('Comentario no encontrado');
  });

  // 9. Intentar eliminar un comentario inexistente
  it('🚫 should return 404 when deleting a non-existing comment', async () => {
    const res = await request(app).delete('/comments/99999');
    expect(res.statusCode).toBe(404);
    expect(res.body.error).toBe('Comentario no encontrado');
  });

  // 10. Validación: crear comentario sin content
  it('⚠️ should return 400 when creating comment without content', async () => {
    const res = await request(app).post('/comments').send({
      post_id: createdPostId,
      author_id: createdAuthorId,
      // falta content
    });
    expect(res.statusCode).toBe(400);
    const messages = res.body.errors.map(e => e.msg);
    expect(messages).toContain('content es obligatorio');
  });

  // 11. Validación: crear comentario sin post_id
  it('⚠️ should return 400 when creating comment without post_id', async () => {
    const res = await request(app).post('/comments').send({
      author_id: createdAuthorId,
      content: 'Comentario sin post_id',
    });
    expect(res.statusCode).toBe(400);
    const messages = res.body.errors.map(e => e.msg);
    expect(messages).toContain('post_id debe ser un número entero positivo');
  });

  // 12. Validación: crear comentario sin author_id
  it('⚠️ should return 400 when creating comment without author_id', async () => {
    const res = await request(app).post('/comments').send({
      post_id: createdPostId,
      content: 'Comentario sin author_id',
    });
    expect(res.statusCode).toBe(400);
    const messages = res.body.errors.map(e => e.msg);
    expect(messages).toContain('author_id debe ser un número entero positivo');
  });

  // 13. Validación: crear comentario con post_id inválido
  it('⚠️ should return 400 when creating comment with invalid post_id', async () => {
    const res = await request(app).post('/comments').send({
      post_id: -1, // inválido
      author_id: createdAuthorId,
      content: 'Comentario con post_id inválido',
    });
    expect(res.statusCode).toBe(400);
    const messages = res.body.errors.map(e => e.msg);
    expect(messages).toContain('post_id debe ser un número entero positivo');
  });

  // 14. Validación: crear comentario con author_id inválido
  it('⚠️ should return 400 when creating comment with invalid author_id', async () => {
    const res = await request(app).post('/comments').send({
      post_id: createdPostId,
      author_id: 'abc', // inválido
      content: 'Comentario con author_id inválido',
    });
    expect(res.statusCode).toBe(400);
    const messages = res.body.errors.map(e => e.msg);
    expect(messages).toContain('author_id debe ser un número entero positivo');
  });
});
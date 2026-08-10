import request from 'supertest';
import app from '../app.js';

describe('Comments API Integration Flow', () => {
  let authorId;
  let postId;
  let commentId; // 👈 declaramos la variable al inicio

  it('🔨 should create author, post, comment, update, get and delete it', async () => {
    // 1. Crear autor con email único
    const authorRes = await request(app).post('/authors').send({
      name: 'Autor Comments Flow',
      email: `autor_comments_${Date.now()}@example.com`, // 👈 email dinámico
      bio: 'Bio integración comments',
    });
    expect(authorRes.statusCode).toBe(201);
    authorId = authorRes.body.id;

    // 2. Crear post
    const postRes = await request(app).post('/posts').send({
      title: 'Post integración comments',
      content: 'Contenido inicial integración',
      author_id: authorId,
      published: true,
    });
    expect(postRes.statusCode).toBe(201);
    postId = postRes.body.id;

    // 3. Crear comentario
    const commentRes = await request(app).post('/comments').send({
      post_id: postId,
      author_id: authorId,
      content: 'Comentario inicial integración',
    });
    expect(commentRes.statusCode).toBe(201);
    expect(commentRes.body.content).toBe('Comentario inicial integración');
    commentId = commentRes.body.id; // 👈 ahora sí existe

    // 4. Actualizar comentario
    const updateRes = await request(app).put(`/comments/${commentId}`).send({
      content: 'Comentario actualizado integración',
    });
    expect(updateRes.statusCode).toBe(200);
    expect(updateRes.body.content).toBe('Comentario actualizado integración');

    // 5. Obtener comentarios del post
    const listRes = await request(app).get(`/comments/post/${postId}`);
    expect(listRes.statusCode).toBe(200);
    expect(Array.isArray(listRes.body)).toBe(true);
    expect(listRes.body.some(c => c.id === commentId)).toBe(true);

    // 6. Borrar comentario
    const deleteRes = await request(app).delete(`/comments/${commentId}`);
    expect(deleteRes.statusCode).toBe(204);

    // 7. Verificar que ya no existe
    const listAfterDelete = await request(app).get(`/comments/post/${postId}`);
    expect(listAfterDelete.statusCode).toBe(200);
    expect(listAfterDelete.body.some(c => c.id === commentId)).toBe(false);
  });
});
import request from 'supertest';
import app from '../app.js';

describe('Author → Post → Comments Integration Flow', () => {
  let authorId;
  let postId;
  let commentId1;
  let commentId2;

  it('🔨 should create author, post, multiple comments, list them and delete all', async () => {
    // 1. Crear autor con email único
    const authorRes = await request(app).post('/authors').send({
      name: 'Autor Full Flow',
      email: `autor_fullflow_${Date.now()}@example.com`, // email dinámico
      bio: 'Bio integración completa',
    });
    expect(authorRes.statusCode).toBe(201);
    authorId = authorRes.body.id;

    // 2. Crear post asociado al autor
    const postRes = await request(app).post('/posts').send({
      title: 'Post Full Flow',
      content: 'Contenido inicial del flujo completo',
      author_id: authorId,
      published: true,
    });
    expect(postRes.statusCode).toBe(201);
    postId = postRes.body.id;

    // 3. Crear primer comentario
    const commentRes1 = await request(app).post('/comments').send({
      post_id: postId,
      author_id: authorId,
      content: 'Primer comentario',
    });
    expect(commentRes1.statusCode).toBe(201);
    commentId1 = commentRes1.body.id;

    // 4. Crear segundo comentario
    const commentRes2 = await request(app).post('/comments').send({
      post_id: postId,
      author_id: authorId,
      content: 'Segundo comentario',
    });
    expect(commentRes2.statusCode).toBe(201);
    commentId2 = commentRes2.body.id;

    // 5. Listar comentarios del post
    const listRes = await request(app).get(`/comments/post/${postId}`);
    expect(listRes.statusCode).toBe(200);
    expect(Array.isArray(listRes.body)).toBe(true);
    const contents = listRes.body.map(c => c.content);
    expect(contents).toContain('Primer comentario');
    expect(contents).toContain('Segundo comentario');

    // 6. Borrar comentarios
    const deleteRes1 = await request(app).delete(`/comments/${commentId1}`);
    expect(deleteRes1.statusCode).toBe(204);
    const deleteRes2 = await request(app).delete(`/comments/${commentId2}`);
    expect(deleteRes2.statusCode).toBe(204);

    // 7. Verificar que ya no existen comentarios
    const listAfterDelete = await request(app).get(`/comments/post/${postId}`);
    expect(listAfterDelete.statusCode).toBe(200);
    expect(Array.isArray(listAfterDelete.body)).toBe(true);
    expect(listAfterDelete.body.length).toBe(0);

    // 8. Borrar post
    const deletePostRes = await request(app).delete(`/posts/${postId}`);
    expect(deletePostRes.statusCode).toBe(204);

    // 9. Verificar que el post ya no existe
    const getDeletedPost = await request(app).get(`/posts/${postId}`);
    expect(getDeletedPost.statusCode).toBe(404);

    // 10. Verificar que el autor sigue existiendo
    const getAuthorRes = await request(app).get(`/authors/${authorId}`);
    expect(getAuthorRes.statusCode).toBe(200);
  });
});
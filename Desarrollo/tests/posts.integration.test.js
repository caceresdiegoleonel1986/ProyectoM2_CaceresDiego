import request from 'supertest';
import app from '../app.js';

describe('Posts API Integration Flow', () => {
  let authorId;
  let postId; // 👈 declaramos la variable al inicio

  it('should return 404 when listing posts for a non-existent author', async () => {
    const res = await request(app).get('/posts/author/999999');

    expect(res.statusCode).toBe(404);
    expect(res.body.error).toBe('Autor no encontrado');
  });

  it('🔨 should create an author and a post, update, get and delete it', async () => {
    // 1. Crear autor con email único
    const authorRes = await request(app).post('/authors').send({
      name: 'Autor Integración Posts',
      email: `autor_posts_${Date.now()}@example.com`, // 👈 email dinámico
      bio: 'Bio integración',
    });
    expect(authorRes.statusCode).toBe(201);
    authorId = authorRes.body.id;

    // 2. Crear post
    const postRes = await request(app).post('/posts').send({
      title: 'Post integración',
      content: 'Contenido inicial integración',
      author_id: authorId,
      published: true,
    });
    expect(postRes.statusCode).toBe(201);
    expect(postRes.body.title).toBe('Post integración');
    postId = postRes.body.id; // 👈 ahora sí existe

    // 3. Actualizar post
    const updateRes = await request(app).put(`/posts/${postId}`).send({
      title: 'Post integración actualizado',
      content: 'Contenido actualizado',
      published: false,
    });
    expect(updateRes.statusCode).toBe(200);
    expect(updateRes.body.title).toBe('Post integración actualizado');

    // 4. Obtener post
    const getRes = await request(app).get(`/posts/${postId}`);
    expect(getRes.statusCode).toBe(200);
    expect(getRes.body.id).toBe(postId);

    // 5. Borrar post
    const deleteRes = await request(app).delete(`/posts/${postId}`);
    expect(deleteRes.statusCode).toBe(204);

    // 6. Verificar que ya no existe
    const getDeletedRes = await request(app).get(`/posts/${postId}`);
    expect(getDeletedRes.statusCode).toBe(404);
  });
});
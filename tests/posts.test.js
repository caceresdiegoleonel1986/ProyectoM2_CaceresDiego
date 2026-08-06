import request from 'supertest';
import app from '../app.js';

describe('Posts API', () => {
  let createdAuthorId;
  let createdPostId;

  beforeAll(async () => {
    // 1. Crear un author para asociar posts con email único
    const authorRes = await request(app).post('/authors').send({
      name: 'Autor Posts',
      email: `autor_posts_${Date.now()}@example.com`, // email dinámico
      bio: 'Bio para posts',
    });
    createdAuthorId = authorRes.body.id;
  });

  // 2. Crear un nuevo post
  it('✅ should create a new post', async () => {
    const res = await request(app).post('/posts').send({
      title: 'Post de prueba',
      content: 'Contenido inicial',
      author_id: Number(createdAuthorId),
      published: true,
    });
    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe('Post de prueba');
    createdPostId = res.body.id;
  });

  // 3. Listar todos los posts
  it('📋 should list posts', async () => {
    const res = await request(app).get('/posts');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  // 4. Obtener un post por ID
  it('🔎 should get post by id', async () => {
    const res = await request(app).get(`/posts/${createdPostId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe(createdPostId);
  });

  // 5. Listar posts por autor
  it('👤 should list posts by author', async () => {
    const res = await request(app).get(`/posts/author/${createdAuthorId}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  // 6. Actualizar un post
  it('✏️ should update a post', async () => {
    const res = await request(app).put(`/posts/${createdPostId}`).send({
      title: 'Post actualizado',
      content: 'Contenido nuevo',
      published: false,
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe('Post actualizado');
  });

  // 7. Eliminar un post
  it('🗑️ should delete a post', async () => {
    const res = await request(app).delete(`/posts/${createdPostId}`);
    expect(res.statusCode).toBe(204);
  });

  // 8. Intentar obtener un post inexistente
  it('🚫 should return 404 for non-existing post (GET)', async () => {
    const res = await request(app).get('/posts/99999');
    expect(res.statusCode).toBe(404);
  });

  // 9. Intentar eliminar un post inexistente
  it('🚫 should return 404 when deleting non-existing post', async () => {
    const res = await request(app).delete('/posts/99999');
    expect(res.statusCode).toBe(404);
    expect(res.body.error).toBe('Post not found');
  });

  // 10. Validación: crear post sin título
  it('⚠️ should return 400 when creating post without title', async () => {
    const res = await request(app).post('/posts').send({
      content: 'Contenido sin título',
      author_id: Number(createdAuthorId),
    });
    expect(res.statusCode).toBe(400);
    expect(res.body.errors[0].msg).toBe('El título es obligatorio');
  });

  // 11. Validación: crear post sin contenido
  it('⚠️ should return 400 when creating post without content', async () => {
    const res = await request(app).post('/posts').send({
      title: 'Post sin contenido',
      author_id: Number(createdAuthorId),
    });
    expect(res.statusCode).toBe(400);
    expect(res.body.errors[0].msg).toBe('El contenido es obligatorio');
  });

  // 12. Validación: crear post con author_id inválido
  it('⚠️ should return 400 when creating post with invalid author_id', async () => {
    const res = await request(app).post('/posts').send({
      title: 'Post inválido',
      content: 'Contenido inválido',
      author_id: -1,
    });
    expect(res.statusCode).toBe(400);
    expect(res.body.errors[0].msg).toBe('author_id debe ser un número entero positivo');
  });

  // 13. Validación: crear post con published inválido
  it('⚠️ should return 400 when creating post with invalid published value', async () => {
    const res = await request(app).post('/posts').send({
      title: 'Post inválido',
      content: 'Contenido inválido',
      author_id: Number(createdAuthorId),
      published: 'yes', // inválido
    });
    expect(res.statusCode).toBe(400);
    const messages = res.body.errors.map(e => e.msg);
    expect(messages).toContain('published debe ser true o false');
  });

  // 14. Validación: actualizar post con author_id inválido
  it('⚠️ should return 400 when updating post with invalid author_id', async () => {
    const res = await request(app).put('/posts/99999').send({
      title: 'Intento inválido',
      content: 'Contenido inválido',
      author_id: -5,
    });
    expect(res.statusCode).toBe(400);
    expect(res.body.errors[0].msg).toBe('author_id debe ser un número entero positivo');
  });

  // 15. Validación: actualizar post con published inválido
  it('⚠️ should return 400 when updating post with invalid published value', async () => {
    const res = await request(app).put('/posts/99999').send({
      title: 'Intento inválido',
      content: 'Contenido inválido',
      published: 'notabool',
    });
    expect(res.statusCode).toBe(400);
    expect(res.body.errors[0].msg).toBe('published debe ser true o false');
  });

  // 16. Intentar actualizar un post inexistente con datos válidos
  it('🚫 should return 404 when updating non-existing post with valid data', async () => {
    const res = await request(app).put('/posts/99999').send({
      title: 'Post válido pero inexistente',
      content: 'Contenido válido',
      author_id: Number(createdAuthorId),
      published: true,
    });
    expect(res.statusCode).toBe(404);
    expect(res.body.error).toBe('Post not found');
  });
});
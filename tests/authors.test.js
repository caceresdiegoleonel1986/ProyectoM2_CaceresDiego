import request from 'supertest';
import app from '../app.js';

describe('Authors API', () => {
  let createdAuthorId;
  let emailCounter = 1; // contador para emails únicos

  // 1. Crear un nuevo autor
  it('✅ should create a new author', async () => {
    const res = await request(app).post('/authors').send({
      name: 'Autor Test',
      email: `autor_test${emailCounter++}@example.com`, // email único
      bio: 'Bio de prueba',
    });
    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe('Autor Test');
    createdAuthorId = res.body.id;
  });

  // 2. Listar todos los autores
  it('📋 should list authors', async () => {
    const res = await request(app).get('/authors');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  // 3. Obtener autor por ID
  it('🔎 should get author by id', async () => {
    const res = await request(app).get(`/authors/${createdAuthorId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe(createdAuthorId);
  });

  // 4. Actualizar un autor
  it('✏️ should update an author', async () => {
    const res = await request(app).put(`/authors/${createdAuthorId}`).send({
      name: 'Autor Actualizado',
      email: `autor_actualizado${emailCounter++}@example.com`, // email único
      bio: 'Bio nueva',
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe('Autor Actualizado');
  });

  // 5. Eliminar un autor
  it('🗑️ should delete an author', async () => {
    const res = await request(app).delete(`/authors/${createdAuthorId}`);
    expect(res.statusCode).toBe(204);
  });

  // 6. Intentar obtener un autor inexistente
  it('🚫 should return 404 for non-existing author (GET)', async () => {
    const res = await request(app).get('/authors/99999');
    expect(res.statusCode).toBe(404);
    expect(res.body.error).toBe('Author not found');
  });

  // 7. Intentar eliminar un autor inexistente
  it('🚫 should return 404 when deleting non-existing author', async () => {
    const res = await request(app).delete('/authors/99999');
    expect(res.statusCode).toBe(404);
    expect(res.body.error).toBe('Author not found');
  });

  // 8. Validación: crear autor con email inválido
  it('⚠️ should return 400 when creating author with invalid email', async () => {
    const res = await request(app).post('/authors').send({
      name: 'Autor Malo',
      email: 'autor_malo.com', // sin @
      bio: 'Bio inválida',
    });
    expect(res.statusCode).toBe(400);
    const messages = res.body.errors.map(e => e.msg);
    expect(messages).toContain('Email must be valid');
  });

  // 9. Validación: crear autor sin nombre
  it('⚠️ should return 400 when creating author without name', async () => {
    const res = await request(app).post('/authors').send({
      email: `autor_sin_nombre${emailCounter++}@example.com`, // email único
      bio: 'Bio sin nombre',
    });
    expect(res.statusCode).toBe(400);
    const messages = res.body.errors.map(e => e.msg);
    expect(messages).toContain('Name is required');
  });
});
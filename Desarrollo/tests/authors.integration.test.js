import request from 'supertest';
import app from '../app.js';

describe('Authors API Integration Flow', () => {
  let authorId;

  it('🔨 should create, list, get, update, delete and verify author', async () => {
    // 1. Crear autor con email único
    const createRes = await request(app).post('/authors').send({
      name: 'Autor Integración',
      email: `autor_integracion_${Date.now()}@example.com`, // 👈 email dinámico
      bio: 'Bio integración completa',
    });
    expect(createRes.statusCode).toBe(201);
    authorId = createRes.body.id;

    // 2. Listar autores
    const listRes = await request(app).get('/authors');
    expect(listRes.statusCode).toBe(200);
    expect(Array.isArray(listRes.body)).toBe(true);
    expect(listRes.body.some(a => a.id === authorId)).toBe(true);

    // 3. Obtener autor por ID
    const getRes = await request(app).get(`/authors/${authorId}`);
    expect(getRes.statusCode).toBe(200);
    expect(getRes.body.id).toBe(authorId);

    // 4. Actualizar autor
    const updateRes = await request(app).put(`/authors/${authorId}`).send({
      name: 'Autor Integración Actualizado',
      email: 'autor_integracion_actualizado@example.com',
      bio: 'Bio actualizada',
    });
    expect(updateRes.statusCode).toBe(200);
    expect(updateRes.body.name).toBe('Autor Integración Actualizado');

    // 5. Borrar autor
    const deleteRes = await request(app).delete(`/authors/${authorId}`);
    expect(deleteRes.statusCode).toBe(204);

    // 6. Verificar que ya no existe
    const getDeletedRes = await request(app).get(`/authors/${authorId}`);
    expect(getDeletedRes.statusCode).toBe(404);
    expect(getDeletedRes.body.error).toBe('Autor no encontrado');
  });
});
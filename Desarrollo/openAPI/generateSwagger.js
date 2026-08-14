import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outPath = path.join(__dirname, 'swagger.json');

const doc = {
  openapi: '3.0.3',
  info: { title: 'MiniBlog API', version: '1.0.0', description: 'Documentación OpenAPI para el proyecto MiniBlog. Se organiza por recursos: autores, posts y comentarios.' },
  servers: [{ url: 'http://localhost:3000', description: 'Servidor local (ejemplo)' }],
  tags: [
    { name: 'Authors', description: 'Gestión de autores' },
    { name: 'Posts', description: 'Gestión de posts y publicaciones' },
    { name: 'Comments', description: 'Gestión de comentarios por post' }
  ],
  paths: {
    '/authors': {
      get: { tags: ['Authors'], summary: 'Listar autores', description: 'Devuelve la lista completa de autores.', responses: { '200': { description: 'Lista de autores', content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/Author' } } } } } } },
      post: { tags: ['Authors'], summary: 'Crear autor', description: 'Crea un nuevo autor con nombre, email y bio opcional.', requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/AuthorCreate' } } } }, responses: { '201': { description: 'Autor creado', content: { 'application/json': { schema: { $ref: '#/components/schemas/Author' } } } }, '400': { description: 'Datos inválidos' } } }
    },
    '/authors/{id}': {
      parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
      get: { tags: ['Authors'], summary: 'Obtener autor por ID', responses: { '200': { description: 'Autor encontrado', content: { 'application/json': { schema: { $ref: '#/components/schemas/Author' } } } }, '400': { description: 'ID inválido' }, '404': { description: 'Autor no encontrado' } } },
      put: { tags: ['Authors'], summary: 'Actualizar autor', requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/AuthorUpdate' } } } }, responses: { '200': { description: 'Autor actualizado', content: { 'application/json': { schema: { $ref: '#/components/schemas/Author' } } } }, '400': { description: 'Solicitud inválida' }, '404': { description: 'Autor no encontrado' } } },
      delete: { tags: ['Authors'], summary: 'Eliminar autor', responses: { '204': { description: 'Eliminado' }, '400': { description: 'ID inválido' }, '404': { description: 'Autor no encontrado' } } }
    },
    '/posts': {
      get: { tags: ['Posts'], summary: 'Listar posts', description: 'Devuelve todos los posts registrados.', responses: { '200': { description: 'Lista de posts', content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/Post' } } } } } } },
      post: { tags: ['Posts'], summary: 'Crear post', description: 'Crea un post asociado a un autor existente.', requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/PostCreate' } } } }, responses: { '201': { description: 'Post creado', content: { 'application/json': { schema: { $ref: '#/components/schemas/Post' } } } }, '400': { description: 'Solicitud inválida' }, '404': { description: 'Autor no encontrado' } } }
    },
    '/posts/{id}': {
      parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
      get: { tags: ['Posts'], summary: 'Obtener post por ID', responses: { '200': { description: 'Post encontrado', content: { 'application/json': { schema: { $ref: '#/components/schemas/Post' } } } }, '400': { description: 'ID inválido' }, '404': { description: 'Post no encontrado' } } },
      put: { tags: ['Posts'], summary: 'Actualizar post', requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/PostUpdate' } } } }, responses: { '200': { description: 'Post actualizado', content: { 'application/json': { schema: { $ref: '#/components/schemas/Post' } } } }, '400': { description: 'Solicitud inválida' }, '404': { description: 'Post no encontrado' } } },
      delete: { tags: ['Posts'], summary: 'Eliminar post', responses: { '204': { description: 'Eliminado' }, '400': { description: 'ID inválido' }, '404': { description: 'Post no encontrado' } } }
    },
    '/posts/author/{authorId}': {
      parameters: [{ name: 'authorId', in: 'path', required: true, schema: { type: 'integer' } }],
      get: { tags: ['Posts'], summary: 'Listar posts por autor', responses: { '200': { description: 'Lista de posts', content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/Post' } } } } }, '400': { description: 'ID inválido' }, '404': { description: 'Autor no encontrado' } } }
    },
    '/comments': {
      get: { tags: ['Comments'], summary: 'Listar comentarios', description: 'Devuelve la lista de comentarios de la base.', responses: { '200': { description: 'Lista de comentarios', content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/Comment' } } } } } } },
      post: { tags: ['Comments'], summary: 'Crear comentario', description: 'Crea un comentario asociado a un post y autor existentes.', requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/CommentCreate' } } } }, responses: { '201': { description: 'Comentario creado', content: { 'application/json': { schema: { $ref: '#/components/schemas/Comment' } } } }, '400': { description: 'Solicitud inválida' }, '404': { description: 'Post o autor no encontrado' } } }
    },
    '/comments/post/{postId}': {
      parameters: [{ name: 'postId', in: 'path', required: true, schema: { type: 'integer' } }],
      get: { tags: ['Comments'], summary: 'Obtener comentarios por post', responses: { '200': { description: 'Lista de comentarios', content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/Comment' } } } } }, '400': { description: 'ID inválido' }, '404': { description: 'Post no encontrado' } } }
    },
    '/comments/{id}': {
      parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
      put: { tags: ['Comments'], summary: 'Actualizar comentario', requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/CommentUpdate' } } } }, responses: { '200': { description: 'Comentario actualizado', content: { 'application/json': { schema: { $ref: '#/components/schemas/Comment' } } } }, '400': { description: 'Solicitud inválida' }, '404': { description: 'Comentario no encontrado' } } },
      delete: { tags: ['Comments'], summary: 'Eliminar comentario', responses: { '204': { description: 'Eliminado' }, '400': { description: 'ID inválido' }, '404': { description: 'Comentario no encontrado' } } }
    }
  },
  components: {
    schemas: {
      Author: { type: 'object', properties: { id: { type: 'integer' }, name: { type: 'string' }, email: { type: 'string', format: 'email' }, bio: { type: 'string', nullable: true } } },
      AuthorCreate: { type: 'object', required: ['name', 'email'], properties: { name: { type: 'string' }, email: { type: 'string', format: 'email' }, bio: { type: 'string' } } },
      AuthorUpdate: { type: 'object', properties: { name: { type: 'string' }, email: { type: 'string', format: 'email' }, bio: { type: 'string' } } },
      Post: { type: 'object', properties: { id: { type: 'integer' }, title: { type: 'string' }, content: { type: 'string' }, author_id: { type: 'integer' }, published: { type: 'boolean' }, created_at: { type: 'string', format: 'date-time' } } },
      PostCreate: { type: 'object', required: ['title', 'content', 'author_id'], properties: { title: { type: 'string' }, content: { type: 'string' }, author_id: { type: 'integer' }, published: { type: 'boolean' } } },
      PostUpdate: { type: 'object', properties: { title: { type: 'string' }, content: { type: 'string' }, author_id: { type: 'integer' }, published: { type: 'boolean' } } },
      Comment: { type: 'object', properties: { id: { type: 'integer' }, post_id: { type: 'integer' }, author_id: { type: 'integer' }, content: { type: 'string' }, created_at: { type: 'string', format: 'date-time' } } },
      CommentCreate: { type: 'object', required: ['post_id', 'author_id', 'content'], properties: { post_id: { type: 'integer' }, author_id: { type: 'integer' }, content: { type: 'string' } } },
      CommentUpdate: { type: 'object', required: ['content'], properties: { content: { type: 'string' } } }
    }
  }
};

fs.writeFileSync(outPath, JSON.stringify(doc, null, 2), 'utf8');
console.log('swagger.json generado in', outPath);

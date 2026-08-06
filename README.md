# MiniBlog API

API REST construida con **Node.js + Express** y **PostgreSQL** para gestionar autores, posts y comentarios.  
Forma parte del proyecto integrador del Módulo 2 (SoyHenry).  
Incluye tests unitarios e integraciones con **Jest** y **Supertest**.

---

## 🚀 Funcionalidades

- CRUD de **Authors** (usuarios).
- CRUD de **Posts** (publicaciones).
- CRUD de **Comments** (comentarios asociados a posts y autores).
- Validaciones básicas (campos obligatorios, email único).
- Respuestas HTTP coherentes (200, 201, 204, 400, 404, 500).
- Tests automatizados con **Jest + Supertest**.
- Documentación en **OpenAPI (JSON)**.
- Preparado para deploy en **Railway**.

---

## ⚙️ Requisitos

- Node.js v18+ (se recomienda v20 o superior).
- PostgreSQL instalado y corriendo localmente.
- Railway (para deploy).

---

## 📄 Variables de entorno

Crea un archivo `.env` en la raíz del proyecto basado en `.env.example`:

```env
DATABASE_URL=postgresql://usuario:contraseña@localhost:5432/miniblog
PORT=3000

Para los tests, también crea un archivo .env.test con credenciales específicas para la base de datos de pruebas:

env
DATABASE_URL=postgresql://usuario:contraseña@localhost:5432/miniblog_test
PORT=4000
⚠️ Nunca subir .env a GitHub. Solo .env.example.

🛠️ Instalación y ejecución local
Clonar el repositorio:

bash
git clone https://github.com/tuusuario/miniblog-api.git
cd miniblog-api
Instalar dependencias:

bash
npm install
Crear la base de datos y tablas:

bash
psql -U postgres -d miniblog -f ./sql/setup.sql
Insertar datos iniciales:

bash
psql -U postgres -d miniblog -f ./sql/seed.sql
Ejecutar en modo desarrollo:

bash
npm run dev
API disponible en:
http://localhost:3000

🧪 Tests
Ejecutar todos los tests:

bash
npm test -- --verbose
Ejecutar en modo debug para detectar fugas de recursos:

bash
npm run test:debug
✅ Todos los tests unitarios e integraciones pasan en verde (40 en total).

📖 Documentación OpenAPI
El archivo openapi.json describe todos los endpoints.
Puedes visualizarlo con Swagger UI o importarlo en Postman.

Ejemplo con swagger-ui-express:

js
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './openapi.json' assert { type: "json" };

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
Luego acceder a:
http://localhost:3000/docs

🚀 Deploy en Railway
Crear proyecto en Railway y conectar con tu repo de GitHub.

Añadir variable de entorno DATABASE_URL en Railway.

Railway detecta Node.js y hace el deploy automáticamente.

La API quedará disponible en una URL pública, por ejemplo:
https://miniblog-production.up.railway.app

📌 Ejemplos de Endpoints
Autores
bash
# Crear autor
curl -X POST http://localhost:3000/authors \
  -H "Content-Type: application/json" \
  -d '{"name":"Juan Pérez","email":"juan@example.com","bio":"Bio de Juan"}'

# Listar autores
curl http://localhost:3000/authors

# Obtener autor por ID
curl http://localhost:3000/authors/1
Posts
bash
# Crear post
curl -X POST http://localhost:3000/posts \
  -H "Content-Type: application/json" \
  -d '{"title":"Mi primer post","content":"Contenido del post","author_id":1,"published":true}'

# Actualizar post
curl -X PUT http://localhost:3000/posts/1 \
  -H "Content-Type: application/json" \
  -d '{"title":"Post actualizado","content":"Nuevo contenido"}'

# Listar posts
curl http://localhost:3000/posts
Comentarios
bash
# Crear comentario
curl -X POST http://localhost:3000/comments \
  -H "Content-Type: application/json" \
  -d '{"post_id":1,"author_id":1,"content":"Buen post!"}'

# Listar comentarios de un post
curl http://localhost:3000/comments/post/1

# Actualizar comentario
curl -X PUT http://localhost:3000/comments/1 \
  -H "Content-Type: application/json" \
  -d '{"content":"Comentario editado"}'

🧩 Uso con Thunder Client / Postman
Abrir Thunder Client (VSCode) o Postman.

Crear una colección llamada MiniBlog API.

Agregar requests:

POST /authors → body JSON con name, email, bio.

POST /posts → body JSON con title, content, author_id, published.

POST /comments → body JSON con post_id, author_id, content.

Probar el flujo completo:
Crear autor → Crear post → Crear comentario → Listar → Actualizar → Borrar.

📊 Diagrama de relaciones
text
┌─────────────┐        ┌─────────────┐        ┌───────────────┐
│   Authors   │ 1    n │    Posts    │ 1    n │   Comments    │
│─────────────│--------│─────────────│--------│───────────────│
│ id (PK)     │        │ id (PK)     │        │ id (PK)       │
│ name        │        │ title       │        │ content       │
│ email       │        │ content     │        │ post_id (FK)  │
│ bio         │        │ author_id(FK)│       │ author_id (FK)│
└─────────────┘        │ published   │        │ created_at    │
                       │ created_at  │        └───────────────┘
                       └─────────────┘

🔄 Flujo de un request típico (POST /comments)
text
Cliente (curl / Thunder Client / Postman)
        │
        ▼
Express Router (commentsRoutes.js)
        │
        ▼
Controller (commentsController.js)
  - Valida datos de entrada
  - Llama al servicio correspondiente
        │
        ▼
Service (commentsService.js)
  - Construye la query SQL
  - Interactúa con el pool de PostgreSQL
        │
        ▼
Base de Datos (PostgreSQL)
  - Inserta el nuevo comentario en la tabla "comments"
        │
        ▼
Service → Controller → Router
  - Devuelve el objeto creado con su `id`
        │
        ▼
Cliente
  - Recibe respuesta JSON con el comentario creado

🏗️ Arquitectura general
text
┌───────────────┐
│   Cliente      │
│ (curl, Postman,│
│ Thunder Client)│
└───────▲───────┘
        │ HTTP Requests (REST)
        ▼
┌─────────────────────┐
│   Express API        │
│  (MiniBlog Backend)  │
│─────────────────────│
│ Routers (authors,    │
│ posts, comments)     │
│ Controllers          │
│ Services             │
│ Middlewares          │
└─────────▲───────────┘
          │ SQL Queries
          ▼
┌─────────────────────┐
│ PostgreSQL Database │
│─────────────────────│
│ Tables:             │
│ - authors           │
│ - posts             │
│ - comments          │
└─────────────────────┘

✨ Autor
Diego Caceres– Proyecto integrador Módulo 2 (SoyHenry).
Uso de IA: apoyo en generación de ejemplos, servicios, controladores, rutas, tests y documentación.
El código fue revisado y adaptado manualmente para asegurar coherencia y funcionalidad.
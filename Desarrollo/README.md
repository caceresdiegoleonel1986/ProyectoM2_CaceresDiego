# MiniBlog API

API REST construida con Node.js, Express y PostgreSQL para gestionar autores, posts y comentarios. Este proyecto forma parte del trabajo integrador del Módulo 2 de SoyHenry y cuenta con tests automatizados usando Jest y Supertest.

---

## 🚀 Funcionalidades

- CRUD de autores.
- CRUD de posts.
- CRUD de comentarios asociados a posts y autores.
- Validaciones básicas de entrada.
- Respuestas HTTP coherentes para operaciones exitosas y errores.
- Tests unitarios e integraciones.
- Documentación OpenAPI disponible en la app.
- Preparado para despliegue en Railway.

---

## 🛠️ Tecnologías

- Node.js
- Express
- PostgreSQL
- pg
- Jest
- Supertest
- Swagger UI
- dotenv

---

## ⚙️ Requisitos

- Node.js 18 o superior.
- PostgreSQL instalado y corriendo localmente.
- Cliente de PostgreSQL para ejecutar los scripts SQL.

---

## 📄 Variables de entorno

Crea un archivo .env en la raíz del proyecto copiando la estructura de .env.example.

```env
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=1234
DB_NAME=miniblog
DB_PORT=5432
PORT=3000
NODE_ENV=development
```

Para tests, crea un archivo .env.test con las credenciales de la base de datos de pruebas:

```env
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=1234
DB_NAME=miniblog_test
DB_PORT=5432
PORT=4000
NODE_ENV=test
```

> No subas archivos .env ni .env.test al repositorio.

---

## ▶️ Instalación y ejecución local

1. Clona el repositorio:

```bash
git clone <url-del-repo>
cd MiniBlog/Desarrollo
```

2. Instala las dependencias:

```bash
npm install
```

3. Crea la base de datos y las tablas:

```bash
psql -U postgres -d miniblog -f ./sql/setup.sql
```

4. Inserta datos iniciales:

```bash
psql -U postgres -d miniblog -f ./sql/seed.sql
```

5. Ejecuta la API en modo desarrollo:

```bash
npm run dev
```

La API quedará disponible en:

```text
http://localhost:3000
```

También puedes verificar la conexión a la base de datos en:

```text
http://localhost:3000/health
```

---

## 🧪 Tests

Ejecuta todos los tests:

```bash
npm test
```

Ejecuta los tests en modo verbose para depurar problemas de recursos:

```bash
npm run test:debug
```

---

## 📖 Documentación OpenAPI

La documentación Swagger queda disponible en:

```text
http://localhost:3000/api-docs
```

Además, el archivo JSON generado se sirve en:

```text
http://localhost:3000/swagger.json
```

Si querés regenerar la documentación:

```bash
npm run gen:openapi
```

---

## 🔗 Endpoints principales

### Autores

```bash
# Crear autor
curl -X POST http://localhost:3000/authors \
  -H "Content-Type: application/json" \
  -d '{"name":"Juan Pérez","email":"juan@example.com","bio":"Bio de Juan"}'

# Obtener autores
curl http://localhost:3000/authors
```

### Posts

```bash
# Crear post
curl -X POST http://localhost:3000/posts \
  -H "Content-Type: application/json" \
  -d '{"title":"Mi primer post","content":"Contenido","author_id":1,"published":true}'
```

### Comentarios

```bash
# Crear comentario
curl -X POST http://localhost:3000/comments \
  -H "Content-Type: application/json" \
  -d '{"post_id":1,"author_id":1,"content":"Buen post!"}'
```

---

## 🗄️ Estructura de la base de datos

```text
Authors 1---n Posts 1---n Comments
```

- Authors: id, name, email, bio, created_at
- Posts: id, title, content, author_id, published, created_at
- Comments: id, post_id, author_id, content, created_at

---

## ✨ Autor

Diego Cáceres — Proyecto integrador del Módulo 2 de SoyHenry.

Este README fue ajustado para reflejar mejor la estructura real del proyecto, los scripts disponibles y los endpoints actuales.
# MiniBlog API

API REST construida con Node.js, Express y PostgreSQL para gestionar autores, posts y comentarios.

## 🛠️ Tecnologías

- Node.js
- Express
- PostgreSQL
- pg
- Jest
- Supertest
- Swagger UI
- dotenv

## ⚙️ Requisitos

- Node.js 18 o superior
- PostgreSQL instalado y corriendo localmente
- Cliente de PostgreSQL para ejecutar scripts SQL

## 📄 Variables de entorno

Crea el archivo `.env` dentro de `Desarrollo` usando `.env.example` como referencia.

```env
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=1234
DB_NAME=miniblog
DB_PORT=5432
PORT=3000
NODE_ENV=development
DEBUG=false
```

Para tests:

```env
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=1234
DB_NAME=miniblog_test
DB_PORT=5432
PORT=4000
NODE_ENV=test
DEBUG=false
```

> No subas archivos `.env` ni `.env.test` al repositorio.

## ▶️ Instalación y ejecución

Desde la raíz:

```bash
npm install
npm run dev
```

O desde `Desarrollo`:

```bash
cd Desarrollo
npm install
npm run dev
```

La API quedará disponible en:

```text
http://localhost:3000
```

## 🧪 Tests

```bash
npm test
```

```bash
npm run test:debug
```

## 📖 Swagger

```text
http://localhost:3000/api-docs
```

## 🌐 Despliegue

La versión desplegada queda en:

https://proyectom2caceresdiego-production-74e9.up.railway.app/api-docs/

En Railway, la app usa `DATABASE_URL` y `PORT` del entorno cuando están disponibles.

## ✨ Autor

Diego Cáceres — Proyecto integrador del Módulo 2 de SoyHenry.
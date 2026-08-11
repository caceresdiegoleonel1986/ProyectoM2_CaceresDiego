# MiniBlog API – Documentación

MiniBlog es una API REST desarrollada con Node.js, Express y PostgreSQL para gestionar autores, publicaciones y comentarios.  
Este proyecto forma parte del trabajo integrador del módulo 2 de SoyHenry y fue diseñado para demostrar una estructura backend organizada, con pruebas automatizadas y documentación interactiva.

## 📌 Descripción del proyecto

La aplicación permite realizar operaciones CRUD sobre autores, posts y comentarios, ofreciendo una arquitectura simple pero funcional para el manejo de datos y la exposición de endpoints claros y documentados.

## ⚙️ Requisitos

- Node.js 18 o superior
- PostgreSQL 14 o superior
- Railway para el despliegue

## 🚀 Ejecución local

1. Clonar el repositorio:
   ```bash
   git clone <URL_DEL_REPO>
   cd MiniBlog/Desarrollo
   ```

2. Instalar dependencias:
   ```bash
   npm install
   ```

3. Configurar variables de entorno en un archivo `.env` a partir de `.env.example`.

4. Ejecutar los scripts SQL:
   ```bash
   psql -U postgres -d miniblog -f sql/setup.sql
   psql -U postgres -d miniblog -f sql/seed.sql
   ```

5. Iniciar el servidor:
   ```bash
   npm run dev
   ```

## 🧪 Tests

Para ejecutar la suite de pruebas:

```bash
npm test
```

## 📖 Documentación OpenAPI

La API cuenta con documentación Swagger/OpenAPI para visualizar y probar los endpoints.

### Acceso local

```text
http://localhost:3000/api-docs
```

También puede consultarse el archivo JSON generado en:

```text
http://localhost:3000/swagger.json
```

## 🌐 Despliegue en Railway

El proyecto fue preparado para su despliegue en Railway con una base de datos PostgreSQL provisionada en la misma plataforma.

### Enlace del proyecto desplegado
- Documentación Swagger: https://proyectom2caceresdiego-production-74e9.up.railway.app/api-docs/

## 🤖 Uso de IA en el proyecto

Durante el desarrollo se utilizó inteligencia artificial como apoyo para:

- proponer estructuras de carpetas y organización del proyecto;
- generar ejemplos de servicios, controladores y rutas;
- crear tests básicos con Jest y Supertest;
- redactar documentación técnica y README.

El código fue revisado y adaptado manualmente para asegurar coherencia, claridad y funcionalidad.
import express from 'express';
import cors from 'cors';
import pool from './db/index.js';

import authorsRouter from './src/routes/authors.js';
import postsRouter from './src/routes/posts.js';
import commentsRouter from './src/routes/comments.js';

import { errorHandler } from './src/middlewares/errorHandler.js';
import swaggerUi from 'swagger-ui-express';
import path from 'path';
import { fileURLToPath } from 'url';

// Inicializa la aplicación principal de Express
const app = express();

// Middleware para interpretar el cuerpo de las solicitudes en formato JSON
app.use(express.json());

//  habilita CORS (puede ser abierto o restringido)
app.use(cors()); 
// Si querés limitarlo solo a tu frontend:
// app.use(cors({ origin: "http://localhost:5173" }));

// Registro de las rutas principales con sus respectivos prefijos
app.use('/authors', authorsRouter);
app.use('/posts', postsRouter);
app.use('/comments', commentsRouter);

// Endpoint de salud para probar la conexión a la DB
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', service: 'up' });
});

// Swagger UI - sirve la documentación en /api-docs
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.get('/swagger.json', (req, res) => res.sendFile(path.join(__dirname, 'openAPI', 'swagger.json')));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(null, { swaggerUrl: '/swagger.json' }));

// Middleware global para manejar errores en toda la aplicación
app.use(errorHandler);

// Exporta la aplicación para que pueda ser utilizada en server.js
export default app;
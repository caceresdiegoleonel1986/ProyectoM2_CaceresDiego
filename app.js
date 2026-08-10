import express from 'express';
import cors from 'cors';
import pool from './db/index.js'; // importa tu pool

// Importa los routers que manejan las rutas específicas de cada recurso
import authorsRouter from './src/routes/authors.js';
import postsRouter from './src/routes/posts.js';
import commentsRouter from './src/routes/comments.js';

// Importa el middleware de manejo de errores
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
app.get('/health', async (req, res) => {
  try {
    // Loguea la configuración actual del pool
    console.log("DB Config:", {
      host: pool.options.host,
      user: pool.options.user,
      database: pool.options.database,
      port: pool.options.port,
    });

    await pool.query('SELECT 1');
    res.json({ status: 'ok', db: 'connected' });
  } catch (error) {
    console.error("Error de conexión:", error.message);
    res.status(500).json({ status: 'error', db: 'not connected', error: error.message });
  }
});

// Swagger UI - sirve la documentación en /api-docs
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.get('/swagger.json', (req, res) => res.sendFile(path.join(__dirname, 'openAPI', 'swagger.json')));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(null, { swaggerUrl: '/swagger.json' }));

// Middleware global para manejar errores en toda la aplicación
app.use(errorHandler);

// Exporta la aplicación para que pueda ser utilizada en server.js
export default app;
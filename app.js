import express from 'express';

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

// Registro de las rutas principales con sus respectivos prefijos
app.use('/authors', authorsRouter);
app.use('/posts', postsRouter);
app.use('/comments', commentsRouter);

// Swagger UI - sirve la documentación en /api-docs
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.get('/swagger.json', (req, res) => res.sendFile(path.join(__dirname, 'openAPI', 'swagger.json')));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(null, { swaggerUrl: '/swagger.json' }));

// Middleware global para manejar errores en toda la aplicación
app.use(errorHandler);

// Exporta la aplicación para que pueda ser utilizada en server.js
export default app;
import express from 'express';

// Importa los routers que manejan las rutas específicas de cada recurso
import authorsRouter from './src/routes/authors.js';
import postsRouter from './src/routes/posts.js';
import commentsRouter from './src/routes/comments.js';

// Importa el middleware de manejo de errores
import { errorHandler } from './src/middlewares/errorHandler.js';

// Inicializa la aplicación principal de Express
const app = express();

// Middleware para interpretar el cuerpo de las solicitudes en formato JSON
app.use(express.json());

// Registro de las rutas principales con sus respectivos prefijos
app.use('/authors', authorsRouter);
app.use('/posts', postsRouter);
app.use('/comments', commentsRouter);

// Middleware global para manejar errores en toda la aplicación
app.use(errorHandler);

// Exporta la aplicación para que pueda ser utilizada en server.js
export default app;
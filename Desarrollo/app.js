import express from 'express';
import cors from 'cors';

import authorsRouter from './src/routes/authors.js';
import postsRouter from './src/routes/posts.js';
import commentsRouter from './src/routes/comments.js';

import { errorHandler } from './src/middlewares/errorHandler.js';
import swaggerUi from 'swagger-ui-express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();

app.use(express.json());

// Habilita CORS para todas las rutas y orígenes
// app.use(cors());

//* Configuración de CORS con lista de orígenes permitidos

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://proyectom2caceresdiego-production-74e9.up.railway.app'
];

app.use(
   cors({
     origin: (origin, callback) => {
       if (!origin || allowedOrigins.includes(origin)) {
         callback(null, true);
         return;
       }
      callback(new Error('No permitido por CORS'));
   },
    credentials: true
  })
);

app.use('/authors', authorsRouter);
app.use('/posts', postsRouter);
app.use('/comments', commentsRouter);

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', service: 'up' });
});

const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.get('/swagger.json', (req, res) =>
  res.sendFile(path.join(__dirname, 'openAPI', 'swagger.json'))
);

app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(null, { swaggerUrl: '/swagger.json' })
);

app.use(errorHandler);

export default app;
import { Router } from 'express';
import { body } from 'express-validator';
import { validate } from '../middlewares/validate.js';
import {
  getPosts,
  getPostById,
  getPostsByAuthor,
  createPost,
  updatePost,
  deletePost,
} from '../controllers/postsController.js';

// Crea una instancia de Router
const router = Router();

// ⚠️ Importante: las rutas más específicas primero
// Ruta para obtener todos los posts
router.get('/', getPosts);
// Ruta para obtener posts por autor
router.get('/author/:authorId', getPostsByAuthor);
// Ruta para obtener un post por su ID
router.get('/:id', getPostById);

// Ruta para crear un nuevo post con validaciones
router.post(
  '/',
  [
    body('title').notEmpty().withMessage('El título es obligatorio'),
    body('content').notEmpty().withMessage('El contenido es obligatorio'),
    body('author_id').isInt({ gt: 0 }).withMessage('author_id debe ser un número entero positivo'),
    body('published').optional().isBoolean().withMessage('published debe ser true o false'),
    validate, // middleware que procesa los errores de validación
  ],
  createPost
);

// Ruta para actualizar un post existente con validaciones
router.put(
  '/:id',
  [
    body('title').optional().notEmpty().withMessage('El título es obligatorio'),
    body('content').optional().notEmpty().withMessage('El contenido es obligatorio'),
    body('author_id').optional().isInt({ gt: 0 }).withMessage('author_id debe ser un número entero positivo'),
    body('published').optional().isBoolean().withMessage('published debe ser true o false'),
    validate, // middleware que procesa los errores de validación
  ],
  updatePost
);

// Ruta para eliminar un post por su ID
router.delete('/:id', deletePost);

export default router;
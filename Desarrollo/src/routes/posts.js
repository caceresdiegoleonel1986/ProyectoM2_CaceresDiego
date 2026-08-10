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

const router = Router();

// ⚠️ Importante: la ruta más específica primero
router.get('/', getPosts);
router.get('/author/:authorId', getPostsByAuthor);
router.get('/:id', getPostById);

router.post(
  '/',
  [
    body('title').notEmpty().withMessage('El título es obligatorio'),
    body('content').notEmpty().withMessage('El contenido es obligatorio'),
    body('author_id').isInt({ gt: 0 }).withMessage('author_id debe ser un número entero positivo'),
    body('published').optional().isBoolean().withMessage('published debe ser true o false'),
    validate,
  ],
  createPost
);

router.put(
  '/:id',
  [
    body('title').optional().notEmpty().withMessage('El título es obligatorio'),
    body('content').optional().notEmpty().withMessage('El contenido es obligatorio'),
    body('author_id').optional().isInt({ gt: 0 }).withMessage('author_id debe ser un número entero positivo'),
    body('published').optional().isBoolean().withMessage('published debe ser true o false'),
    validate,
  ],
  updatePost
);

router.delete('/:id', deletePost);

export default router;
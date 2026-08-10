import { Router } from 'express';
import { body } from 'express-validator';
import { validate } from '../middlewares/validate.js';
import {
  getComments,
  getCommentsByPost,
  createComment,
  updateComment,
  deleteComment,
} from '../controllers/commentsController.js';

const router = Router();

// Obtener todos los comentarios
router.get('/', getComments);

// Obtener comentarios de un post
router.get('/post/:postId', getCommentsByPost);

// Crear comentario
router.post(
  '/',
  [
    body('post_id')
      .isInt({ gt: 0 })
      .withMessage('post_id debe ser un número entero positivo'),
    body('author_id')
      .isInt({ gt: 0 })
      .withMessage('author_id debe ser un número entero positivo'),
    body('content')
      .notEmpty()
      .withMessage('content es obligatorio'),
    validate,
  ],
  createComment
);

// Actualizar comentario
router.put(
  '/:id',
  [
    body('content')
      .notEmpty()
      .withMessage('content es obligatorio'),
    validate,
  ],
  updateComment
);

// Eliminar comentario
router.delete('/:id', deleteComment);

export default router;
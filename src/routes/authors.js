import { Router } from 'express';
import { body } from 'express-validator';
import { validate } from '../middlewares/validate.js';
import * as controller from '../controllers/authorsController.js';

const router = Router();

// Crear autor con validación
router.post(
  '/',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Email must be valid'),
    body('bio').optional().isString(),
    validate
  ],
  controller.createAuthor
);

// Actualizar autor con validación
router.put(
  '/:id',
  [
    body('name').optional().notEmpty().withMessage('Name is required'),
    body('email').optional().isEmail().withMessage('Email must be valid'),
    body('bio').optional().isString(),
    validate
  ],
  controller.updateAuthor
);

// Listar y obtener por ID
router.get('/', controller.getAuthors);
router.get('/:id', controller.getAuthorById);

// Eliminar
router.delete('/:id', controller.deleteAuthor);

export default router;
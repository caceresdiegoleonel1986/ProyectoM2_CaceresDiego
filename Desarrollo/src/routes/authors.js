import { Router } from 'express';
import { body } from 'express-validator';
import { validate } from '../middlewares/validate.js';
import * as controller from '../controllers/authorsController.js';

const router = Router();

// Crear autor con validación
router.post(
  '/',
  [
    body('name').notEmpty().withMessage('El nombre es obligatorio'),
    body('email').isEmail().withMessage('El email no es válido'),
    body('bio').optional().isString().withMessage('La bio debe ser texto'),
    validate
  ],
  controller.createAuthor
);

// Actualizar autor con validación
router.put(
  '/:id',
  [
    body('name').optional().notEmpty().withMessage('El nombre es obligatorio'),
    body('email').optional().isEmail().withMessage('El email no es válido'),
    body('bio').optional().isString().withMessage('La bio debe ser texto'),
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
import * as service from '../services/authorsService.js';

// GET /authors
export async function getAuthors(req, res, next) {
  try {
    const authors = await service.getAllAuthors();
    res.json(authors);
  } catch (error) {
    next(error);
  }
}

// GET /authors/:id
export async function getAuthorById(req, res, next) {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
      return res.status(400).json({ error: 'ID inválido' });
    }

    const author = await service.getAuthorById(id);
    if (!author) {
      return res.status(404).json({ error: 'Autor no encontrado' });
    }
    res.json(author);
  } catch (error) {
    next(error);
  }
}

// POST /authors
export async function createAuthor(req, res, next) {
  try {
    const newAuthor = await service.createAuthor(req.body);
    res.status(201).json(newAuthor);
  } catch (error) {
    if (error.message.includes('obligatorio')) {
      return res.status(400).json({ error: error.message });
    }
    if (error.code === '23505') { // violación de UNIQUE
      return res.status(400).json({ error: 'Email ya existe' });
    }
    next(error);
  }
}

// PUT /authors/:id
export async function updateAuthor(req, res, next) {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
      return res.status(400).json({ error: 'ID inválido' });
    }

    const updated = await service.updateAuthor(id, req.body);
    if (!updated) {
      return res.status(404).json({ error: 'Autor no encontrado' });
    }
    res.json(updated);
  } catch (error) {
    next(error);
  }
}

// DELETE /authors/:id
export async function deleteAuthor(req, res, next) {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
      return res.status(400).json({ error: 'ID inválido' });
    }

    const deleted = await service.deleteAuthor(id);
    if (!deleted) {
      return res.status(404).json({ error: 'Autor no encontrado' });
    }
    res.status(204).end();
  } catch (error) {
    next(error);
  }
}
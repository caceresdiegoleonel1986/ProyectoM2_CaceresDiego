import * as service from '../services/commentsService.js';
import * as postService from '../services/postsService.js';
import * as authorService from '../services/authorsService.js';

// GET /comments
export async function getComments(req, res, next) {
  try {
    const comments = await service.getAllComments();
    res.json(comments);
  } catch (error) {
    next(error);
  }
}

// GET /comments/post/:postId
export async function getCommentsByPost(req, res, next) {
  try {
    const postId = Number(req.params.postId);
    if (Number.isNaN(postId)) {
      return res.status(400).json({ error: 'ID inválido' });
    }

    const post = await postService.getPostById(postId);
    if (!post) {
      return res.status(404).json({ error: 'Post no encontrado' });
    }

    const comments = await service.getCommentsByPost(postId);
    res.json(comments);
  } catch (error) {
    next(error);
  }
}

// POST /comments
export async function createComment(req, res, next) {
  try {
    const { post_id, author_id, content } = req.body;
    const parsedPostId = Number(post_id);
    const parsedAuthorId = Number(author_id);

    const post = await postService.getPostById(parsedPostId);
    if (!post) {
      return res.status(404).json({ error: 'Post no encontrado' });
    }

    const authorExists = await authorService.getAuthorById(parsedAuthorId);
    if (!authorExists) {
      return res.status(404).json({ error: 'Autor no encontrado' });
    }

    const newComment = await service.createComment({
      post_id: parsedPostId,
      author_id: parsedAuthorId,
      content,
    });
    res.status(201).json(newComment);
  } catch (error) {
    if (error.message.includes('obligatorio')) {
      return res.status(400).json({ errors: [{ msg: error.message }] });
    }
    if (error.code === '23503') {
      return res.status(404).json({ error: 'Recurso relacionado no encontrado' });
    }
    next(error);
  }
}

// PUT /comments/:id
export async function updateComment(req, res, next) {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
      return res.status(400).json({ error: 'ID inválido' });
    }

    const { content } = req.body;
    const updated = await service.updateComment(id, { content });
    if (!updated) {
      return res.status(404).json({ error: 'Comentario no encontrado' });
    }
    res.json(updated);
  } catch (error) {
    next(error);
  }
}

// DELETE /comments/:id
export async function deleteComment(req, res, next) {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
      return res.status(400).json({ error: 'ID inválido' });
    }

    const deleted = await service.deleteComment(id);
    if (!deleted) {
      return res.status(404).json({ error: 'Comentario no encontrado' });
    }
    res.status(204).end();
  } catch (error) {
    next(error);
  }
}
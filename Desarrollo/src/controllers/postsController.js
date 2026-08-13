import * as service from '../services/postsService.js';
import * as authorService from '../services/authorsService.js';

// GET /posts
export async function getPosts(req, res, next) {
  try {
    const posts = await service.getAllPosts();
    res.json(posts);
  } catch (error) {
    next(error);
  }
}

// GET /posts/:id
export async function getPostById(req, res, next) {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
      return res.status(400).json({ error: 'ID inválido' });
    }

    const post = await service.getPostById(id);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json(post);
  } catch (error) {
    next(error);
  }
}

// GET /posts/author/:authorId
export async function getPostsByAuthor(req, res, next) {
  try {
    const authorId = Number(req.params.authorId);
    if (Number.isNaN(authorId)) {
      return res.status(400).json({ error: 'ID inválido' });
    }

    const author = await authorService.getAuthorById(authorId);
    if (!author) {
      return res.status(404).json({ error: 'Author not found' });
    }

    const posts = await service.getPostsByAuthor(authorId);
    res.json(posts);
  } catch (error) {
    next(error);
  }
}

// POST /posts
export async function createPost(req, res, next) {
  try {
    const { title, content, author_id, published } = req.body;
    const newPost = await service.createPost({
      title,
      content,
      author_id: Number(author_id),
      published,
    });
    res.status(201).json(newPost);
  } catch (error) {
    if (error.message.includes('obligatorio')) {
      return res.status(400).json({ error: error.message });
    }
    next(error);
  }
}

// PUT /posts/:id
export async function updatePost(req, res, next) {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
      return res.status(400).json({ error: 'ID inválido' });
    }

    const { title, content, author_id, published } = req.body;

    // 👇 si author_id no viene, lo dejamos undefined
    const updated = await service.updatePost(id, {
      title,
      content,
      author_id: author_id !== undefined ? Number(author_id) : undefined,
      published,
    });

    if (!updated) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json(updated);
  } catch (error) {
    next(error);
  }
}

// DELETE /posts/:id
export async function deletePost(req, res, next) {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
      return res.status(400).json({ error: 'ID inválido' });
    }

    const deleted = await service.deletePost(id);
    if (!deleted) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.status(204).end();
  } catch (error) {
    next(error);
  }
}
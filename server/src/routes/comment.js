import { Router } from 'express';

const router = Router();

router.get('/', async (req, res) => {
  const comments = await req.context.models.Comment.find();

  return res.send(comments);
});

router.get('/:commentId', async (req, res) => {
  const comment = await req.context.models.Comment.findById(
    req.params.commentId,
  );
  
  return res.send(comment);
});

router.post('/', async (req, res) => {
  const post = await req.context.models.Post.create({
    title: req.body.title,
    description: req.body.description,
    user: req.context.me.id,
  });

  return res.send(post);
});

router.delete('/:postId', async (req, res) => {
  const post = await req.context.models.Post.findById(
    req.params.postId,
  );

  let result = null;
  if (post) {
    result = await post.remove();
  }

  return res.send(result);
});

export default router;

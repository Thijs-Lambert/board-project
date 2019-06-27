import { Router } from 'express';

const router = Router();

router.get('/', async (req, res) => {
  const posts = await req.context.models.Post.find().populate('comments');

  return res.send(posts);
});

router.get('/:postId', async (req, res) => {
  const post = await req.context.models.Post.findById(
    req.params.postId,
  ).populate('comments');
  
  return res.send(post);
});

router.post('/', async (req, res) => {
  const post = await req.context.models.Post.create({
    title: req.body.title,
    description: req.body.description,
    user: req.body.email,
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

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

router.post('/:postId/comments', async (req, res) => {
  try {
    const comment = await req.context.models.Comment.create({
      text: req.body.text,
    })

    const post = await req.context.models.Post.findByIdAndUpdate(
      req.params.postId, {$push: {"comments": comment.id}}, {new: true}
    ).populate('comments')

    return res.send(post);
    
  } catch (error) {
    return res.json(error)
  }
});

router.post('/', async (req, res) => {
  try {
    const post = await req.context.models.Post.create({
      title: req.body.title,
      description: req.body.description,
      user: req.body.user,
    })

    return res.send(post);
    
  } catch (error) {
    return res.json(error)
  }
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

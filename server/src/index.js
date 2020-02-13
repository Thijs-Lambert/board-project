import 'dotenv/config';

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import models, { connectDb } from './models';
import routes from './routes';
import checkAuth from './middlewares/auth';

const app = express();

// Application-Level Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Headers', 'Content-type,Authorization');
  next();
});

app.use(async (req, res, next) => {
  req.context = {
    models,
    me: await models.User.findByLogin('me'),
  };
  next();
});

// Routes
app.use('/auth', routes.auth);
app.use('/users', routes.user);
app.use('/posts', routes.post);
app.use('/comments', routes.comment);

// Start
const eraseDatabaseOnSync = true;

connectDb().then(async () => {
  if (eraseDatabaseOnSync) {
    await Promise.all([
      models.User.deleteMany({}),
      models.Post.deleteMany({}),
      models.Comment.deleteMany({}),
    ]);

    //seedData();
  }

  app.listen(process.env.PORT, () =>
    console.log(`Example app listening on port ${process.env.PORT}!`),
  );
});














// dummy data for dev

const seedData = async () => {
  const user = new models.User({
    username: 'me',
  });

  const comment = new models.Comment({
    text: 'A Comment',
  })

  const post = new models.Post({
    title: 'This is an example post',
    description: 'Use the form on top of the page to add your own topics to discuss. Bacon ipsum dolor amet turkey meatloaf cupim leberkas swine kielbasa tail, ham capicola burgdoggen corned beef drumstick pastrami frankfurter brisket. Alcatra cow buffalo boudin brisket ham hock picanha salami.',
    user: user.id,
    comments: [comment.id]
  });

  comment.post = post.id;

  await post.save();
  await comment.save();
  await user.save();
};

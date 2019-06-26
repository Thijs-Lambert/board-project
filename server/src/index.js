import 'dotenv/config';
import cors from 'cors';
import bodyParser from 'body-parser';
import express from 'express';

import models, { connectDb } from './models';
import routes from './routes';

const app = express();

// Application-Level Middleware

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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

    seedData();
  }

  app.listen(process.env.PORT, () =>
    console.log(`Example app listening on port ${process.env.PORT}!`),
  );
});

const seedData = async () => {
  const user = new models.User({
    username: 'me',
  });

  const comment1 = new models.Comment({
    text: 'A first comment',
  })

  const comment2 = new models.Comment({
    text: 'A  second comment',
  })

  const post1 = new models.Post({
    title: 'First Post',
    description: 'Bacon ipsum dolor amet turkey meatloaf cupim leberkas swine kielbasa tail, ham capicola burgdoggen corned beef drumstick pastrami frankfurter brisket. Alcatra cow buffalo boudin brisket ham hock picanha salami.',
    user: user.id,
    comments: [comment1.id]
  });

  comment1.post = post1.id;

  const post2 = new models.Post({
    title: 'Second Post',
    description: 'Bacon ipsum dolor amet turkey meatloaf cupim leberkas swine kielbasa tail, ham capicola burgdoggen corned beef drumstick pastrami frankfurter brisket. Alcatra cow buffalo boudin brisket ham hock picanha salami.',
    user: user.id,
    comments: [comment2.id]
  });

  comment2.post = post2.id;

  await post1.save();
  await post2.save();
  await comment1.save();
  await comment2.save();
  await user.save();
};

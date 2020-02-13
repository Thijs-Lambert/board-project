import { Router } from 'express';
import jwt from 'jsonwebtoken';

const router = Router();

router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  const user = await req.context.models.User.create({
    username: username, password: password
  });

  res.send(user);
});

router.post('/login', async (req, res) => {
  /*
  * Check if the username and password is correct
  */
  if( req.body.username === 'admin' && req.body.password === 'admin' ) {
      res.json({
          id: 1,
          username: 'admin',
          jwt: jwt.sign({
              id: 1,
          }, config.JWT_SECRET, { expiresIn: 60*60 })
      });
  } else {
    /*
    * If the username or password was wrong, return 401 ( Unauthorized )
    * status code and JSON error message
    */
    res.status(401).json({
        error: {
            message: 'Wrong username or password!'
        }
    });
  }
});

export default router;

import express from 'express';
import { userData } from '../data/index.js'

const router = express.Router();

router
  .route('/')
  .get(async (req, res) => {
    try {
      const users = await userData.getAll();
      const simplifiedUser = products.map(user => ({
        _id: users._id,
        username: user.username
      }));
      res.json(simplifiedUser);
    } catch (e) {
      res.status(400).json({ error: e });
    }
  })
  .post(async (req, res) => {
    try {
      const {
        firstName,
        lastName,
        email,
        username,
        password,
        role
      } = req.body;
      const newUser = await userData.registerUser(
        firstName,
        lastName,
        email,
        username,
        password,
        role
      );
      return res.json(newUser);
    } catch (e) {
        return res.status(400).json({ error: e });
    }
  });

  router
  .route('/:userId')
  .get(async (req, res) => {
    const userId = req.params.userId;
    try {
      const user = await userData.get(userId);
      res.status(200).json(user);
    } catch (e) {
      if(e === 'id is not a valid ObjectID'){
        res.status(400).json({error: 'Invalid product ID'});
      }
      if(e === 'no user with that id'){
        res.status(404).json({error: 'user not found'});
      } else {
        res.status(400).json({error: e}); 
      }
    }
  })




export default router;


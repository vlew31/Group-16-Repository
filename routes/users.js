import { Router } from 'express';
// import * as userData from '../data/users.js';
const router = Router();
import { userData } from '../data/index.js'
import { registerUser, loginUser, getUser, getAll } from "../data/users.js";
import xss from 'xss';

router.route('/').get(async (req, res) => {
  res.render('home', { title: '$waggle' });
});

router.route('/about').get(async (req, res) => {
  res.render('about', { title: 'About Us' });
});

router.route('/user').get(async (req, res) => {
    if (!req.session.user) {
      return res.redirect('/users/login'); 
    }
    return res.render('/user', { title: 'User Profile', user: req.session.user}); 
  });

router.route('/upload').get(async (req, res) => {
  res.render('upload', { title: 'Upload' });
});

router.route('/cart').get(async (req, res) => {
  res.render('cart', { title: 'Cart/Wishlist' });
});

router.route('/search').get(async (req, res) => {
  res.render('search', { title: 'Search Results' });
});





// Handle POST request to register a new user
router.route('/users/register')
  .get(async (req, res) => {
    if(req.session.user) {
      // res.redirect("home");
      res.render('home', { title: '$waggle' });
    }
    return res.render("register", { title: "Register Page" });
  })
  .post(async (req, res) => {
    try {
      const { firstName, lastName, email, username, password, role } = req.body;
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
      return res.status(400).json({ error: e.message });
    }
  });


router
  .route('/users/:userId')
  .get(async (req, res) => {
    const userId = req.params._id;
    try {
      const user = await userData.get(userId);
      res.status(200).json(user);
    } catch (e) {
      if (e.message === 'id is not a valid ObjectID') {
        res.status(400).json({ error: 'Invalid user ID' });
      } else if (e.message === 'no user with that id') {
        res.status(404).json({ error: 'User not found' });
      } else {
        res.status(400).json({ error: e.message });
      }
    }
  });

export default router;


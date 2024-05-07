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



router.route('/user')
  .get(async (req, res) => {
    if (!req.session.user) {
      return res.redirect('/users/login');
    }
    return res.render('user', { title: 'User Profile', user: req.session.user });
  })
  .post(async (req, res) => {
    try {
      // Handle POST request if needed
    } catch (e) {
      return res.status(400).json({ error: e.message });
    }
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
      const {
        firstName,
        lastName,
        email,
        username,
        password,
        confirmPassword,
        role } = req.body;
      const result = await registerUser(
        firstName,
        lastName,
        email,
        username,
        password,
        confirmPassword,
        role);
      res.render('login', { title: 'Log in' });
    } catch (error) {
      res.send(`<script>alert("${error || 'Invalid login. Please try again.'}"); window.location.href = "/users/register";</script>`);
    }
  });


router.route('/users/login')
  .get(async (req, res) => {
    try {
      if(req.session.user) {
        res.redirect("/user");
      }
      return res.render("login", { title: "Login Page"});
    }
    catch (error) {
    console.error('Error rendering login page:', error); 
    return res.status(500).render('error');
    }
  })
//   .post(async (req, res) => {
//   try {
//       const { username, password } = req.body;
//       const user = await loginUser(username, password);
//       res.render('user', { title: 'User Profile' });
//   } catch (error) {
//       res.status(400).json({ error: error.toString() });
//   }
// });
.post(async (req, res) => {
  try {
      const { username, password } = req.body;
      const user = await loginUser(username, password);
      req.session.user = user; // Set user information in session
      console.log(user);
      res.redirect("/user"); // Redirect to user profile page
      return user;
  } catch (error) {
    res.send(`<script>alert("${error.message || 'Invalid login. Please try again.'}"); window.location.href = "/user/login";</script>`);
}
});


  router
  .route('/user')
  .get(async (req, res) => {
    if (!req.session.user) {
      return res.redirect('/users/login');
    }
    res.render('user', { title: 'User Profile', user: req.session.user});
  })
  .post(async (req, res) => {
    try {
      // const { firstName, lastName, email, username, password, role } = req.body;
      // const newUser = await userData.registerUser(
      //   firstName,
      //   lastName,
      //   email,
      //   username,
      //   password,
      //   role
      // );
      // const user = await userData.getUser(req.session.user.username)
      // return res.json(user);
      res.render('user', { title: 'User Profile', user: req.session.user });
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

router.route('/user/logout').get(async (req, res) => {
  req.session.destroy();
  return res.redirect('/users/login');
});

// router.route('/search').get(async (req, res) => {
//   res.render('search', { title: 'Search Results' });
// });


export default router;
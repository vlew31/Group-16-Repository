import Router from 'express';
import { registerUser, loginUser } from '../data/users.js';

const router = Router();

router.route('/').get(async (req, res) => {
    res.render('home', { title: '$waggle' });
});

router.route('/register').get(async (req, res) => {
    res.render('register', {title:"Register"});
});

router.route('/register').post(async (req, res) => {
    // code here for POST
      // Extract fields from req.body
      const {
        firstName,
        lastName,
        email,
        username,
        password,
        role
      } = req.body;
      try {
        const {signupCompleted} = await registerUser(
            firstName,
            lastName,
            email,
            username,
            password,
            role
        );
        if (signupCompleted) {
          res.redirect("/login");
        } else {
          res.status(500).render("error", {
            errorMessage: "Registeration Error",
          });
        }
      } catch (error) {
        res.status(500).render("error", {
          error: error,
          page: "/register",
        });
    }
});

router.route('/login').get(async (req, res) => {
    res.render('login',{title: 'Login'});  
});

router.route('/login').post(async (req, res) => {
    // code here for POST
    try {
      let {username, password} = req.body;
      console.log('loginpost', req.body);
      console.log('loginpost',username);
      const user = await loginUser(username, password);
      // Check if username and password are provided
      if (!username || !password) {
        return res.status(400).render('login', {
          title: 'Login',
          err: true,
          error: 'Error: Username and password are required'
        });
      }
      console.log("loginpost", user.role);
      req.session.user = {
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        email: user.email,
        role: user.role
      }
        res.cookie("AuthenticationState", "authenticated");

        //here it should redirected to the logged in page

      } catch (error) {
      // Render login page with error message
      return res.status(400).render('login', {
        title: 'Login',
        err: true,
        error: error
      });
    }
  });
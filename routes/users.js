import { Router } from 'express';
// import * as userData from '../data/users.js';
import { userData } from '../data/index.js'

const router = Router();

router.route('/').get(async (req, res) => {
  //code here for GET THIS ROUTE SHOULD NEVER FIRE BECAUSE OF MIDDLEWARE #1 IN SPECS.
  return res.json({error: 'YOU SHOULD NOT BE HERE!'});
});

router
  .route('/users/register')
  .get(async (req, res) => {
    return res.render("register", {title: "Register Page"});
  })
  .post(async (req, res) => {
    try {
      const {firstName, lastName, email, username, password, role} = req.body;
      if(firstName === undefined) {
        throw {code: 400, error: "first name is missing"};
      }
      if(lastName === undefined) {
        throw {code: 400, error: "last name is missing"};
      }
      if(username === undefined) {
        throw {code: 400, error: "username is missing"};
      }
      if(password === undefined) {
        throw {code: 400, error: "password is missing"};
      }
      // if(confirmPassword === undefined) {
      //   throw {code: 400, error: "confirm password is missing"};
      // }
      if(email === undefined) {
        throw {code: 400, error: "email is missing"};
      }
      if(role === undefined) {
        throw {code: 400, error: "role is missing"};
      }

      const letterChecker = /^[a-zA-Z]+$/;
      if(firstName.length < 2 || firstName.length > 25) {
        throw {code: 400, error: "first name must be between 2 to 25 characters long"};
      }

      if(!letterChecker.test(firstName)) {
        throw {code: 400, error: "first name must only contain letters"};
      }
      if(lastName.length < 2 || lastName.length > 25) {
        throw {code: 400, error: "last name must be between 2 to 25 characters long"};
      }
      if(username.length < 5 || username.length > 10) {
        throw {code: 400, error: "username must be between 5 to 10 characters long"};
      }

      if(!letterChecker.test(username)) {
        throw {code: 400, error: "username must only contain letters"};
      }

      const upper = /[A-Z]/;
      const number = /[0-9]/;
      const specialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;

      if(password.length < 8) {
        throw {code: 400, error: "password must be at least 8 characters long"};
      }
      if(!upper.test(password) || !number.test(password) || !specialChar.test(password)) {
        if(!upper.test(password)) {
          throw {code: 400, error: "password must contain at least one uppercase letter"};
        }

        if(!number.test(password)) {
          throw {code: 400, error: "password must contain at least one number"};
        }

        if(!specialChar.test(password)) {
          throw {code: 400, error: "password must contain at least one special character"};
        }

      }

      if(role !== 'user' && role !== 'admin') {
        throw {code: 400, error: "invalid role input"};
      }
      const user = await registerUser(firstName, lastName, email, username, password, role);
      if (user.signupCompleted) {
        return res.redirect('/login');
      }
      else {
        return res.status(500).render('error: Could not register user');
      }
    }
    catch (e) {
      if (e.code) {
        return res.status(e.code).render('register', { errors: true, error: e.error})
      }
      return res.status(400).render('error');
    }
  });

router
  .route('/users/login')
  .get(async (req, res) => {
    return res.render("login", {title: "Login Page"});
  })
  .post(async (req, res) => {
    try {
      let {username, password} = req.body;
      let regUser = {username, password};
      req.session.user = await loginUser(username, password);
      if (req.session.user.role === "user") {
        return res.redirect('/user');
      } else if (req.session.user.role === "admin") {
        return res.redirect('/admin');
      }
      if(regUser.username === undefined) {
        throw "username is missing"
      }
      if(regUser.password === undefined) {
        throw "username is missing"
      }
      const u = regUser.username.trim().toLowerCase();
      const p = regUser.password.trim();
      const letterChecker = /^[a-zA-Z]+$/;
      if(typeof u !== 'string') {
        throw {code: 400, error: "username must be a string"};
      }
      if(u.length < 5 || ln.length > 10) {
        throw {code: 400, error: "username must be between 5 to 10 characters long"};
      }

      if(!letterChecker.test(u)) {
        throw {code: 400, error: "username must only contain letters"};
      }

      const upper = /[A-Z]/;
      const number = /[0-9]/;
      const specialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
      if(typeof p !== 'string') {
        throw {code: 400, error: "password must be a string"};
      }
      if(p.length < 8) {
        throw {code: 400, error: "password must be at least 8 characters long"};
      }
      if(!upper.test(p)) {
        throw {code: 400, error: "password must contain at least one uppercase letter"};
      }
      if(!number.test(p)) {
        throw {code: 400, error: "password must contain at least one number"};
      }

      if(!specialChar.test(p)) {
        throw {code: 400, error: "password must contain at least one special character"};
      }

      req.session.user = await loginUser(regUser.username, regUser.password);

      res.cookie("AuthenticationState", "authenticated");
      if (req.session.user.role === "admin") {
        return res.redirect("/admin");
      }
      return res.redirect('/user');
    }
  
    catch (e) {
      if (e.code) {
        return res.status(e.code).render('login', { errors: true, error: e.error, themePreference })
      }
      return res.status(500).render('error')
    }
  });
router
  .route('/users')
//   .get(async (req, res) => {
//     try {
//       const users = await userData.getAll();
//       const simplifiedUsers = users.map(user => ({
//         _id: user._id,
//         username: user.username
//       }));
//       res.json(simplifiedUsers);
//     } catch (e) {
//       res.status(400).json({ error: e.message });
//     }
//   })
  .post(async (req, res) => {
    console.log("hey");
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
        // console.log("uh oh");
      return res.status(400).json({ error: e.message });
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
      if (e.message === 'id is not a valid ObjectID') {
        res.status(400).json({ error: 'Invalid user ID' });
      } else if (e.message === 'no user with that id') {
        res.status(404).json({ error: 'User not found' });
      } else {
        res.status(400).json({ error: e.message });
      }
    }
  });

  router.route('/admin').get(async (req, res) => {
    return res.render('admin', {title: "Admin Page", ...req.session.user, currentTime: new Date().toUTCString()});
  });

  router.route('/logout').get(async (req, res) => {
    req.session.destroy();
    res.clearCookie('AuthenticationState', '', { expires: new Date() });
    return res.render("logout", {title: "Logout Page"});
  });

export default router;
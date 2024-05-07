
import { Router } from 'express';
let router = Router();
// import { userData } from '../data/index.js'
// import usersData from '../data/users.js';
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
    return res.render('/user', { title: 'User Profile', ...req.session.user}); 
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
    let {
      firstName,
      lastName,
      email,
      username,
      password,
      confirmPassword,
      role } = req.body;

      firstName = xss(firstName);
      lastName = xss(lastName);
      email = xss(email);
      username = xss(username);
      password = xss(password);
      confirmPassword = xss(confirmPassword);
      role = xss(role);

    try {
      if(firstName === undefined || lastName === undefined || email === undefined  || username === undefined || password === undefined || confirmPassword === undefined || role === undefined) {
        throw "all fields need to be supplied";
      }
      
      let fn = firstName.trim();
      let ln = lastName.trim();
      let u = username.trim().toLowerCase();
      let p = password.trim();
      let c = confirmPassword.trim();
      let r = role.toLowerCase().trim();
      let e = email.toLowerCase().trim();
    
      let letterChecker = /^[a-zA-Z]+$/;
      if(typeof fn !== 'string' || fn.length < 2 || fn.length > 25 || !letterChecker.test(fn)) {
        throw "invalid first name input";
      }
      
      if(typeof ln !== 'string' || ln.length < 2 || ln.length > 25 || !letterChecker.test(ln)) {
        throw "invalid last name input";
      }
    
      let emailTest = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{3,}$/;
      if(!emailTest.test(e)) {
        throw "invalid email input";
      }
      
      if(typeof u !== 'string' || u.length < 5 || !letterChecker.test(u)) {
        throw "invalid username input";
      }
      
      let upper = /[A-Z]/;
      let number = /[0-9]/;
      let specialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
      if(typeof p !== 'string' || p.length < 8 || !upper.test(p) || !number.test(p) || !specialChar.test(p)) {
        throw "invalid password input";
      }
    
      if(p !== c) {
        throw "passwords must match";
      }
      
      if(r !== 'user' && r !== 'admin') {
        throw "invalid role input";
      }
    }
  catch (error) {
    res.status(400).json({ error: error.toString() });
  }
  try {
    let result = await registerUser(
      firstName,
      lastName,
      email,
      username,
      password,
      confirmPassword,
      role);
      // if (result.insertedUser) {
      //   let checkExists = await loginUser(username, password);
      //   req.session.user = {
      //       firstName: checkExists.firstName,
      //       lastName: checkExists.lastName,
      //       email: checkExists.email,
      //       username: checkExists.username,
      //       role: checkExists.role   
      //   };
      // }
    res.render('login', { title: 'Log in' });
  } catch (error) {
      res.status(400).json({ error: error.toString() });
  }
});

router.route('/users/login')
  .get(async (req, res) => {
  //   try {
  //     if(req.session.user) {
  //       res.redirect("/user");
  //     }
  //     return res.render("login", { title: "Login Page"});
  //   }
  //   catch (error) {
  //   console.error('Error rendering login page:', error); 
  //   return res.status(500).render('error');
  //   }
  // })
  if(req.session.user) {
    res.redirect("/user");
  }
  return res.render("login", { title: "Login Page" });
})
  .post(async (req, res) => {
    let { username, password } = req.body;
    req.session.user = await loginUser(username, password);
    try {
      if(username === undefined || password === undefined) {
        throw "both inputs must be supplied";
      }
    
      let u = username.trim();
      let p = password.trim();
    
      if(u.length <= 0|| p.length <= 0) {
        throw "both inputs must be supplied";
      }
    
      let letterChecker = /^[a-zA-Z]+$/;
      if(typeof u !== 'string' || u.length < 5  || !letterChecker.test(u)) {
        throw "invalid username input";
      }
    
      let upper = /[A-Z]/;
      let number = /[0-9]/;
      let specialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
      if(typeof p !== 'string' || p.length < 8 || !upper.test(p) || !number.test(p) || !specialChar.test(p)) {
        throw "invalid password input";
      }
    }
    catch {
      res.status(400).json({ error: error.toString() });
    }
    try {
      // let user = await loginUser(username, password);
      // // let checkExists = await loginUser(username, password);
      // req.session.user = {
      //     firstName: user.firstName,
      //     lastName: user.lastName,
      //     email: user.email,
      //     username: user.username,
      //     role: user.role,
      // };
      req.session.user = await loginUser(username, password);
      res.cookie("AuthenticationState", "authenticated");
      res.redirect("/user");
      // res.render('user', { title: 'User Profile', ...req.session.user });
    }

    // try {
    //     let user = await loginUser(username, password);
    //     res.render('user', { title: 'User Profile', ...req.session.user });
    // } 
    // catch (error) {
    //     res.status(400).json({ error: error.toString() });
    // }
    catch (e) {
      if (e.code) {
        return res.status(e.code).render('login', { errors: true, error: e.error })
      }
      return res.status(500).render('error')
    }
});

router
  .route('/user')
  .get(async (req, res) => {
    if (!req.session.user) {
      return res.redirect('/users/login');
    }
    return res.render('user', { title: 'User Profile', ...req.session.user});
  })
  .post(async (req, res) => {
    // let { firstName, lastName, email, username, role } = req.session.user;
    let user = await registerUser(
      firstName,
      lastName,
      email,
      username,
      password,
      role
    );
    console.log(user);
    try {
      console.log(username);
      res.render("/user", {
          firstName: user.firstName,
          lastName: user.lastName,
          email,
          username: user.username,
          role,
      })
      // let user = await userData.getUser(req.session.user.username)
      return res.json(user);
    } catch (e) {
      return res.status(400).json({ error: e.message });
    }
  });


router
  .route('/users/:userId')
  .get(async (req, res) => {
    let userId = req.params._id;
    try {
      let user = await userData.get(userId);
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

  // router.route('/users/logout').get(async (req, res) => {
  //   // req.session.destroy();
  //   // res.clearCookie('AuthenticationState', '', { expires: new Date() });
  //   res.render('login', { title: 'Log in' });
  // });
  router.route('/users/logout').get(async (req, res) => {
    try {
      req.session.destroy((err) => {
        if (err) {
          console.error('Error destroying session:', err);
          return res.status(500).render('error'); // Handle error appropriately
        }
        res.redirect('/users/login');
      });
    } catch (error) {
      console.error('Error during logout:', error);
      res.status(500).render('error'); // Handle error appropriately
    }
  });
export default router;


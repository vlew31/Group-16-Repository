// import express from 'express';
// const app = express();
// import exphbs from 'express-handlebars';
// import configRoutes from './routes/index.js';

// const rewriteUnsupportedBrowserMethods = (req, res, next) => {
//   if (req.body && req.body._method) {
//     req.method = req.body._method;
//     delete req.body._method;
//   }
//   next();
// };

// app.use('/public', express.static('public'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(rewriteUnsupportedBrowserMethods);

// app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }));
// app.set('view engine', 'handlebars');

// configRoutes(app);

// app.listen(3000, () => {
//     console.log("We've now got a server!");
//     console.log('Your routes will be running on http://localhost:3000');
// });

// import express from 'express';
// const app = express();
// import exphbs from 'express-handlebars';
// import configRoutes from './routes/index.js';

// const rewriteUnsupportedBrowserMethods = (req, res, next) => {
//   if (req.body && req.body._method) {
//     req.method = req.body._method;
//     delete req.body._method;
//   }
//   next();
// };

// app.use('/public', express.static('public'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(rewriteUnsupportedBrowserMethods);

// app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }));
// app.set('view engine', 'handlebars');

// configRoutes(app);

// app.listen(3000, () => {
//     console.log("We've now got a server!");
//     console.log('Your routes will be running on http://localhost:3000');
// });

import express from 'express';
const app = express();
import session from 'express-session';
import exphbs from 'express-handlebars';
import configRoutes from './routes/index.js';
import cookieParser from 'cookie-parser';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const rewriteUnsupportedBrowserMethods = (req, res, next) => {
  if (req.body && req.body._method) {
    req.method = req.body._method;
    delete req.body._method;
  }
  next();
};

// const staticDir = express.static(__dirname + '/public');

app.use('/public', express.static('public'));
app.use('/lsitings', express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(rewriteUnsupportedBrowserMethods);

app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(cookieParser());
app.use(
  session({
    name: 'AuthState',
    secret: "some secret string!",
    resave: false,
    saveUninitialized: true
  })
);

const isAuthenticated = (req, res, next) => {
  if (req.session.user) {
      res.locals.isAuthenticated = true; 
      next();
  } else {
      res.locals.isAuthenticated = false;
      next();
  }
};

app.use(isAuthenticated);


// app.use('/', (req, res, next) => {
//   let time = new Date().toUTCString();
//   let rme = req.method;
//   let rr = req.originalUrl;
//   if (req.session.user) {
//       console.log(`[${time}]: ${rme} ${rr} (Authenticated User)`);
//       if ((req.session.user.role === "admin") && (rr !== "/user") && (rr !== "/admin") && (rr !== "/logout")) {
//           return res.redirect("/admin");
//       }
//       else if ((req.session.user.role === "user") && (rr !== "/user") && (rr !== "/logout")) {
//           return res.redirect("/user");
//       }
//   } else {
//       console.log(`[${time}]: ${rme} ${rr} (Non-Authenticated User)`);
//       if ((rr !== "/login") && (rr !== "/register") && (rr !== "/logout")) {
//           return res.redirect("/login");
//       }

//   }
//   next();
// })

app.use('/login', (req, res, next) => {
  if (req.session.user) {
      if (req.session.user.role === "admin") {
          return res.redirect("/admin");
      }
      else if (req.session.user.role === "user") {
          return res.redirect("/user");
      }
  }
  next();
})


// app.use('/register', (req, res, next) => {
//   if (req.session.user) {
//       if (req.session.user.role === "admin") {
//           return res.redirect("/admin");
//       }
//       else if (req.session.user.role === "user") {
//           return res.redirect("/user");
//       }
//   }
//   next();
// })

app.get('/register', (req, res) => {
  res.render("register", { title: "Register Page" });
});

app.get('/update', (req, res) => {
  res.render("update", { title: "Edit a listing" });
});

app.use('/user', (req, res, next) => {
  if (!(req.session.user)) {
    return res.redirect("/users/login");
}
next();
  // res.render("user", { title: "User Profile" });
})

app.get('/user', (req, res) => {
  const user = req.session.user;
  res.render('user', { user }); // Render userProfile template and pass user data
});

app.use('/admin', (req, res, next) => {
  if (!(req.session.user)) {
      return res.redirect("/login");
  }
  else if (req.session.user.role !== "admin") {
      return res.status(403).redirect("/error");
  }
  next();
})

// app.use('/logout', (req, res) => {
//     return res.redirect("/users/logout");
//   // next();
// })

app.use('/logout', (req, res) => {
  res.redirect("/users/login");
});

configRoutes(app);

app.listen(3000, () => {
    console.log("We've now got a server!");
    console.log('Your routes will be running on http://localhost:3000');
});
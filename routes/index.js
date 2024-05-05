import clothesRoutes from './clothes.js';
import userRoutes from './users.js';

const constructorMethod = (app) => {
<<<<<<< HEAD
  app.get('/', function (req, res) {
    res.render('login', { pageTitle: 'Login', isAuthenticated: res.locals.isAuthenticated });
  });
  app.use('/clothes', clothesRoutes);
  app.use('/users', userRoutes);
=======
  app.use('/', clothesRoutes);
  app.use('/', userRoutes);
>>>>>>> ddbb47959afcfea728504961c58e0f7268010b28
  app.use('*', (req, res) => {
    res.status(404).json({error: 'Route Not found'});
  });
};

export default constructorMethod;

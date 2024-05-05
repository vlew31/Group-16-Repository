import clothesRoutes from './clothes.js';
import userRoutes from './users.js';

const constructorMethod = (app) => {
  app.get('/', function (req, res) {
    res.render('login', { pageTitle: 'Login', isAuthenticated: res.locals.isAuthenticated });
  });
  app.use('/clothes', clothesRoutes);
  app.use('/users', userRoutes);
  app.use('*', (req, res) => {
    res.status(404).json({error: 'Route Not found'});
  });
};

export default constructorMethod;

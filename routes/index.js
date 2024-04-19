import clothesRoutes from './clothes.js';

const constructorMethod = (app) => {
    app.use('/', clothesRoutes);
    app.use('*', (req, res) => {
        res.status(404).json({ error: "Not Found" });
    });
};

export default constructorMethod;

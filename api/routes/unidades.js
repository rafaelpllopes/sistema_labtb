/*
const wrapAsync = require('../config/async-wrap');
const auth = require('../config/auth');
const unidadesController = require('../controllers/unidades-controller');

module.exports = app => {
    app.route('/unidades')
        .get(auth, wrapAsync(async (req, res) => {
            const unidades = await unidadesController.obterUnidades(req.db);
            res.json(unidades);
        }));
};
*/
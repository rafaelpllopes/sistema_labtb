/*
const wrapAsync = require('../config/async-wrap');
const auth = require('../config/auth');
const resultadosController = require('../controllers/resultados-controller');

module.exports = app => {
    app.route('/resultados')
        .get(auth, wrapAsync(async (req, res) => {
            const resultados = await resultadosController.obterResultados(req.db);
            res.json(resultados);
        }));
};
*/
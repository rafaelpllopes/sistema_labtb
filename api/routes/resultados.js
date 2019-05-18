const wrapAsync = require('../libs/async-wrap');
const auth = require('../libs/auth');
const resultadosController = require('../controllers/resultados-controller');

module.exports = app => {
    app.route('/resultados')
        .get(auth, wrapAsync(async (req, res) => {
            const resultados = await resultadosController.obterResultados(req.db);
            res.json(resultados);
        }));
};
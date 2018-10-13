const resultadosDao = require('../models/resultados-dao');
const wrapAsync = require('../libs/async-wrap');
const auth = require('../libs/auth');

module.exports = app => {
    app.route('/resultados')
        .get(auth, wrapAsync(async (req, res) => {
            const resultados = await new resultadosDao(req.db).getResultados();
            res.json(resultados);
        }));
};
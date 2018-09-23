const resultadosDao = require('../models/resultados-dao');

module.exports = app => {
    app.route('/resultados')
        .get(async (req, res) => {
            const resultados = await new resultadosDao(req.db).getResultados();
            res.json(resultados);
        });
};
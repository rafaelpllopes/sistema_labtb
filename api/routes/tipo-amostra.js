const tipoAmostraDao = require('../models/tipo-amostra-dao');
const wrapAsync = require('../libs/async-wrap');
const auth = require('../libs/auth');

module.exports = app => {
    app.route('/tipoamostra')
        .get(auth, wrapAsync(async (req, res) => {
            const tipoAmostra = await new tipoAmostraDao(req.db).getTipoAmostra();
            res.json(tipoAmostra);
        }));
};
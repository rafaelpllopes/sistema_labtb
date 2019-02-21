const unidadesDao = require('../models/unidades-dao');
const wrapAsync = require('../libs/async-wrap');
const auth = require('../libs/auth');

module.exports = app => {
    app.route('/unidades')
        .get(auth, wrapAsync(async (req, res) => {
            const unidades = await new unidadesDao(req.db).getUnidades();
            res.json(unidades);
        }));
};
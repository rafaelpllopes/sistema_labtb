const materiaisDao = require('../models/materiais-dao');
const wrapAsync = require('../libs/async-wrap');
const auth = require('../libs/auth');

module.exports = app => {
    app.route('/materiais')
        .get(auth, wrapAsync(async (req, res) => {
            const materiais = await new materiaisDao(req.db).getMaterias();
            res.json(materiais);
        }));
};
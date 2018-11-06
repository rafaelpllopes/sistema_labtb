const reportsDao = require('../models/reports-dao');
const wrapAsync = require('../libs/async-wrap');
const auth = require('../libs/auth');

module.exports = app => {
    app.route('/reports/producao')
        .get(/*auth, wrapAsync(*/async (req, res) => {
            const producao = await new reportsDao(req.db).getProducao();
            res.json(producao);
        })/*)*/;
};
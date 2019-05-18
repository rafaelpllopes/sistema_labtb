const wrapAsync = require('../libs/async-wrap');
const auth = require('../libs/auth');
const materiaisController = require('../controllers/materiais-controller');

module.exports = app => {
    app.route('/materiais')
        .get(auth, wrapAsync(async (req, res) => {
            const materiais = await materiaisController.obterMateriais(req.db);
            res.json(materiais);
        }));
};
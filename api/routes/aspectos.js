const wrapAsync = require('../libs/async-wrap');
const auth = require('../libs/auth');
const AspectosController = require('../controllers/aspectos-controller');

module.exports = app => {
    app.route('/aspectos')
        .get(auth, wrapAsync(async (req, res) => {
            const aspectos = await AspectosController.obterAspectos(req.db);
            res.json(aspectos);
        }));
};
const auth = require('../config/auth');
const AspectosController = require('../controllers/aspectos-controller');
const aspectos = new AspectosController();

module.exports = app => {
    app.route(AspectosController.rotas().aspectos)
        .get(auth, aspectos.listar());
};
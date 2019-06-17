const auth = require('../config/auth');
const unidadesController = require('../controllers/unidades-controller');
const unidades = new unidadesController();

module.exports = app => {
    app.route(unidadesController.rotas().unidades)
        .get(/*auth, */unidades.listar());
};

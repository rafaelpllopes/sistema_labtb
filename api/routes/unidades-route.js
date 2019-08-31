const auth = require('../config/auth')
const UnidadesController = require('../controllers/unidades-controller')
const unidades = new UnidadesController()

module.exports = app => {
    app.route(UnidadesController.rotas().unidades)
        .get(auth, unidades.listar());
};

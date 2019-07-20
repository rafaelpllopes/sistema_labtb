const auth = require('../config/auth');
const resultadosController = require('../controllers/resultados-controller');
const resultados = new resultadosController()

module.exports = app => {
    app.route(resultadosController.rotas().resultados)
        .get(auth, resultados.listar());
};

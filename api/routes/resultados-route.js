const auth = require('../config/auth')
const ResultadosController = require('../controllers/resultados-controller')
const resultados = new ResultadosController()

module.exports = app => {
    app.route(ResultadosController.rotas().resultados)
        .get(auth, resultados.listar());
};

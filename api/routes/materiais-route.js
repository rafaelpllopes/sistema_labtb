const auth = require('../config/auth')
const MateriaisController = require('../controllers/materiais-controller')
const materiais = new MateriaisController()

module.exports = app => {
    app.route(MateriaisController.rotas().materiais)
        .get(auth, materiais.listar());
};
const auth = require('../config/auth');
const materiaisController = require('../controllers/materiais-controller');
const materiais = new materiaisController();

module.exports = app => {
    app.route(materiaisController.rotas().materiais)
        .get(auth, materiais.listar());
};
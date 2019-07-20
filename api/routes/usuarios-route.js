const auth = require('../config/auth');
const UsuarioController = require('../controllers/usuarios-controller');
const usuario = new UsuarioController();
const validacao = require('../models/usuario');

module.exports = app => {
    app.route(UsuarioController.rotas().login)
        .post(validacao.login(), usuario.login());

    app.route(UsuarioController.rotas().usuarioId)
        .get(auth, validacao.id(), usuario.listarPorId())
        .put(auth, validacao.atualizar(), usuario.atualizar())
        .delete(auth, validacao.id(), usuario.deletar());

    app.route(UsuarioController.rotas().usuarios)
        .get(auth, usuario.listar())
        .post(auth, validacao.adicionar(), usuario.adicionar());
    
    app.route(UsuarioController.rotas().filter)
        .get(auth, usuario.getByFilter());

    app.route(UsuarioController.rotas().existe)
        .post(auth, validacao.nome(), usuario.getUserExiste());
};

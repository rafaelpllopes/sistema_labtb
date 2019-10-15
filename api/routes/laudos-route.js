const auth = require('../config/auth')
const LaudosController = require('../controllers/laudos-controller')
const laudos = new LaudosController()
const validacao = require('../models/laudo')

module.exports = app => {
    app.route(LaudosController.rotas().filtrar)
        .get(auth, laudos.listarPorFiltro())

    app.route(LaudosController.rotas().laudos)
        .get(auth, laudos.listar())
        .post(auth, validacao.adicionar(), laudos.adicionar())

    app.route(LaudosController.rotas().laudosId)
        .get(auth, validacao.id(), laudos.listarPorId())
        .put(auth, validacao.atualizar(), laudos.atualizar())
        .delete(auth, validacao.id(), laudos.deletar())

    app.route(LaudosController.rotas().resultado)
        .put(auth, validacao.id(), laudos.atualizarResultado())

    app.route(LaudosController.rotas().pacienteId)
        .get(auth, validacao.id(), laudos.listarPorIdPaciente())
}
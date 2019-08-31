const auth = require('../config/auth')
const PacientesController = require('../controllers/pacientes-controller')
const validacao = require('../models/pacientes')
const pacientes = new PacientesController()

module.exports = app => {
    app.route(PacientesController.rotas().filter)
        .get(auth, pacientes.getByFilter());

    app.route(PacientesController.rotas().cns)
        .get(auth, validacao.cns(), pacientes.getPacienteByCNS());

    app.route(PacientesController.rotas().nome)
        .get(auth, validacao.cns(), pacientes.getPacienteByNome());

    app.route(PacientesController.rotas().pacientes)
        .get(auth, pacientes.listar())
        .post(auth, validacao.adicionar(), pacientes.adicionar());

    app.route(PacientesController.rotas().pacientesId)
        .get(auth, validacao.id(), pacientes.listarPorId())
        .put(auth, validacao.atualizar(), pacientes.atualizar())
        .delete(auth, validacao.id(), pacientes.deletar());
};
const pacientesDao = require('../models/pacientes-dao');

const Pacientes = {};

Pacientes.obterPacientes = async (db, page) => {
    const pacientes = await new pacientesDao(db).getPacientes(page);
    return pacientes;
};

Pacientes.adicionar = async (db, paciente) => {
    await new pacientesDao(db).addPaciente(paciente);
};

Pacientes.filter = async (db, query) => {
    const cns = query.cns;
    const nome = query.nome;
    const sexo = query.sexo;
    const pacientes = await new pacientesDao(db).getPacientesByFilter(cns, nome, sexo);
    return pacientes;
};

Pacientes.buscaPorNome = async (db, nome) => {
    const pacientes = await new pacientesDao(db).findPacienteByName(nome);
    return pacientes;
};

Pacientes.buscaPorCns = async (db, cns) => {
    const pacientes = await new pacientesDao(db).findPacienteByCns(cns);
    return pacientes;
};

Pacientes.obterPorId = async (db, id) => {
    const paciente = await new pacientesDao(db).findPacienteById(id);
    return paciente;
};

Pacientes.atualizar = async (db, id, paciente) => {
    await new pacientesDao(db).updatePaciente(id, paciente);
};

Pacientes.delete = async (db, id) => {
    await new pacientesDao(db).deletePaciente(id);
}

module.exports = Pacientes;

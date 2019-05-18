const materiaisDao = require('../models/materiais-dao');

const MateriaisController = {};

MateriaisController.obterMateriais = async (db) => {
    const resultado = await new materiaisDao(db).getMaterias();
    return resultado;
}

module.exports = MateriaisController;
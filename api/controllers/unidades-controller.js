const unidadesDao = require('../models/unidades-dao');

const UnidadesController = {};

UnidadesController.obterUnidades = async (db) => {
    const resultado = await new unidadesDao(db).getUnidades();
    return resultado;
}

module.exports = UnidadesController;
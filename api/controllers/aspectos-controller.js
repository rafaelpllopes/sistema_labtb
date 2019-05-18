const aspectosDao = require('../models/aspectos-dao');

const AspectosController = {};

AspectosController.obterAspectos = async (db) => {
    const resultado = await new aspectosDao(db).getAspectos();
    return resultado;
}

module.exports = AspectosController;
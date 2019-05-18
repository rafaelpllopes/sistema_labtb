const resultadosDao = require('../models/resultados-dao');

const ResultadosController = {};

ResultadosController.obterResultados = async (db) => {
    const resultado = await new resultadosDao(db).getResultados();
    return resultado;
}

module.exports = ResultadosController;
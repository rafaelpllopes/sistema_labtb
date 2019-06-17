const db = require('../config/database');
const resultadosDao = require('../infra/resultados-dao');
const wrapAsync = require('../config/async-wrap');

class ResultadosController {

    static rotas() {
        return {
            resultados: '/resultados',
        };
    }

    listar() {
        return /*wrapAsync(*/async (req, res) => {
            const resultado = await new resultadosDao(db).getResultados();
            res.json(resultado);
        }/*)*/;
    }
}

module.exports = ResultadosController;
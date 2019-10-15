const db = require('../config/database')
const ResultadosDao = require('../infra/resultados-dao')
const wrapAsync = require('../config/async-wrap')

class ResultadosController {
    
    constructor() {
        this.resultadosDao = new ResultadosDao(db)
    }

    static rotas() {
        return {
            resultados: '/resultados',
        }
    }

    listar() {
        return wrapAsync(async (req, res) => {
            const resultado = await this.resultadosDao.getResultados()
            res.json(resultado)
        })
    }
}

module.exports = ResultadosController
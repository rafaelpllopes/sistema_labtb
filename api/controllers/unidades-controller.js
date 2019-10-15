const db = require('../config/database')
const UnidadesDao = require('../infra/unidades-dao')
const wrapAsync = require('../config/async-wrap')

class UnidadesController {
    
    constructor() {
        this.unidadesDao = new UnidadesDao(db)
    }

    static rotas() {
        return {
            unidades: '/unidades',
        }
    }

    listar() {
        return wrapAsync(async (req, res) => {
            const resultado = await this.unidadesDao.getUnidades()
            res.json(resultado)
        })
    }
}

module.exports = UnidadesController
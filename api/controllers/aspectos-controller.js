const db = require('../config/database')
const AspectosDao = require('../infra/aspectos-dao')
const wrapAsync = require('../config/async-wrap')

class AspectosController {

    constructor() {
        this.aspectosDao = new AspectosDao(db)
    }

    static rotas() {
        return {
            aspectos: '/aspectos',
        }
    }

    listar() {
        return wrapAsync(async (req, res) => {
            const resultado = await this.aspectosDao.getAspectos();
            res.json(resultado)
        })
    }
}

module.exports = AspectosController
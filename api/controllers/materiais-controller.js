const db = require('../config/database')
const MateriaisDao = require('../infra/materiais-dao')
const wrapAsync = require('../config/async-wrap')

class MateriaisController {

    constructor() {
        this.materiaisDao = new MateriaisDao(db)
    }

    static rotas() {
        return {
            materiais: '/materiais',
        }
    }

    listar() {
        return wrapAsync(async (req, res) => {
            const resultado = await this.materiaisDao.getMaterias()
            res.json(resultado)
        })
    }
}

module.exports = MateriaisController
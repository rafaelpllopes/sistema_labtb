const db = require('../config/database')
const unidadesDao = require('../infra/unidades-dao')
const wrapAsync = require('../config/async-wrap')

class UnidadesController {

    static rotas() {
        return {
            unidades: '/unidades',
        };
    }

    listar() {
        return wrapAsync(async (req, res) => {
            const resultado = await new UnidadesDao(db).getUnidades();
            res.json(resultado);
        });
    }
}

module.exports = UnidadesController;
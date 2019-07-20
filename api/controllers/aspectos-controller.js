const db = require('../config/database');
const AspectosDao = require('../infra/aspectos-dao');
const wrapAsync = require('../config/async-wrap');

class AspectosController {

    static rotas() {
        return {
            aspectos: '/aspectos',
        };
    }

    listar() {
        return wrapAsync(async (req, res) => {
            const resultado = await new AspectosDao(db).getAspectos();
            res.json(resultado);
        });
    }
}

module.exports = AspectosController;
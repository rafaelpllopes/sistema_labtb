const db = require('../config/database');
const materiaisDao = require('../infra/materiais-dao');
const wrapAsync = require('../config/async-wrap');

class MateriaisController {

    static rotas() {
        return {
            materiais: '/materiais',
        };
    }

    listar() {
        return wrapAsync(async (req, res) => {
            const resultado = await new materiaisDao(db).getMaterias();
            res.json(resultado);
        });
    }
}

module.exports = MateriaisController;
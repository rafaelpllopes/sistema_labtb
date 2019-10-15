const auth = require('../config/auth')
const LaudosController = require('../controllers/laudos-controller')
const laudos = new LaudosController()
const validacao = require('../models/laudo')

module.exports = app => {
    app.route(LaudosController.rotas().laudos)
        .get(auth, laudos.listar())
        .post(auth, validacao.adicionar(), laudos.adicionar())
}

/*
    app.route('/laudos/filter')
        .get(auth, wrapAsync(async (req, res) => {
            const query = req.query;
            if (query) {                
                const laudos = await laudosController.filter(req.db, query);
                if (laudos) {
                    res.status(200).json(laudos);
                } else {
                    res.sendStatus(412);
                }
            } else {
                res.sendStatus(404);
            }
        }));

    app.route('/laudos/resultado/:id')
        .put(auth, wrapAsync(async (req, res) => {
            const id = req.params.id;
            const laudo = req.body.laudo;
            if (id && laudo) {
                const existe = await laudosController.obterPorId(req.db, id);
                if (existe) {
                    await laudosController.updateResultado(req.db, id);
                    res.status(200).json({ msg: "Resultado adicionado com sucesso" });
                } else {
                    res.sendStatus(404);
                }
            } else {
                res.sendStatus(404);
            }
        }));

    app.route('/laudos/:id')
        .delete(auth, wrapAsync(async (req, res) => {
            const id = req.params.id;
            if (id) {
                const existe = await laudosController.obterPorId(req.db, id);
                if (existe) {
                    await laudosController.delete(req.db, id);
                    res.status(202).json({ msg: "Laudo deletado com sucesso" });
                } else {
                    res.sendStatus(404);
                }
            } else {
                res.sendStatus(404);
            }
        }));
};
*/
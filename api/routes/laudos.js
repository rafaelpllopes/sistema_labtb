const wrapAsync = require('../libs/async-wrap');
const auth = require('../libs/auth');
const laudosController = require('../controllers/laudos-controller');

module.exports = app => {
    app.route('/laudos')
        .get(auth, wrapAsync(async (req, res) => {
            const page = req.query.page;
            const laudos = await laudosController.obter(req.db, page);
            res.status(200).json(laudos);
        }))
        .post(auth, wrapAsync(async (req, res) => {
            const laudo = req.body;
            const paciente = laudo.laudo.paciente_id;
            if (laudo) {
                if (paciente) {
                    await laudosController.adicionar(req.db, laudo.laudo);
                    res.status(200).json({ msg: "Laudo cadastrado com sucesso" });
                } else {
                    res.status(409).json({ msg: "Paciente é obrigatorio" });
                }
            } else {
                res.sendStatus(412);
            }
        }));

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
        .get(auth, wrapAsync(async (req, res) => {
            const id = req.params.id;
            if (id) {
                const laudo = await laudosController.obterPorId(req.db, id);
                if (laudo) {
                    res.status(200).json(laudo);
                } else {
                    res.sendStatus(404);
                }
            } else {
                res.sendStatus(404);
            }
        }))
        .put(auth, wrapAsync(async (req, res) => {
            const id = req.params.id;
            const laudo = req.body.laudo;
            if (id && laudo) {
                const existe = await laudosController.obterPorId(req.db, id);
                if (existe) {
                    await laudosController.updateLaudo(req.db, id, laudo);
                    res.status(200).json({ msg: "Laudo atualizado com sucesso" });
                } else {
                    res.sendStatus(404);
                }
            } else {
                res.sendStatus(404);
            }
        }))
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
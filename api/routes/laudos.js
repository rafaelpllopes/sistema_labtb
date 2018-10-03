const laudosDao = require('../models/laudos-dao');

module.exports = app => {
    app.route('/laudos')
        .get(async (req, res) => {
            const page = req.query.page;
            const laudos = await new laudosDao(req.db).getLaudos(page);
            res.status(200).json(laudos);
        })
        .post(async (req, res) => {
            const laudo = req.body;
            const paciente = laudo.laudo.paciente_id;
            if (laudo) {
                if (paciente) {
                    await new laudosDao(req.db).addLaudo(laudo.laudo);
                    res.status(200).json({ msg: "Laudo cadastrado com sucesso" });
                } else {
                    res.status(409).json({ msg: "Paciente é obrigatorio" });
                }
            } else {
                res.sendStatus(412);
            }
        });

    app.route('/laudos/resultado/:id')
        .put(async (req, res) => {
            const id = req.params.id;
            const laudo = req.body.laudo;
            if (id && laudo) {
                const existe = await new laudosDao(req.db).getLaudoById(id);
                if (existe) {
                    await new laudosDao(req.db).updateLaudoResultado(id, laudo);
                    res.status(200).json({ msg: "Resultado adicionado com sucesso" });
                } else {
                    res.sendStatus(404);
                }
            } else {
                res.sendStatus(404);
            }
        })

    app.route('/laudos/:id')
        .get(async (req, res) => {
            const id = req.params.id;
            if (id) {
                const laudo = await new laudosDao(req.db).getLaudoById(id);
                if (laudo) {
                    res.status(200).json(laudo);
                } else {
                    res.sendStatus(404);
                }
            } else {
                res.sendStatus(404);
            }
        })
        .put(async (req, res) => {
            const id = req.params.id;
            const laudo = req.body.laudo;
            if (id && laudo) {
                const existe = await new laudosDao(req.db).getLaudoById(id);
                if (existe) {
                    await new laudosDao(req.db).updateLaudo(id, laudo);
                    res.status(200).json({ msg: "Laudo atualizado com sucesso" });
                } else {
                    res.sendStatus(404);
                }
            } else {
                res.sendStatus(404);
            }
        })
        .delete(async (req, res) => {
            const id = req.params.id;
            if (id) {
                const laudo = await new laudosDao(req.db).getLaudoById(id);
                if (laudo) {
                    await new laudosDao(req.db).deleteLaudo(id);
                    res.status(202).json({msg: "Laudo deletado com sucesso"});
                } else {
                    res.sendStatus(404);
                }
            } else {
                res.sendStatus(404);
            }
        });
};
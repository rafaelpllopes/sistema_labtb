const laudosDao = require('../models/laudos-dao');

module.exports = app => {
    app.route('/laudos')
        .get(async (req, res) => {
            const laudos = await new laudosDao(req.db).getLaudos();
            res.status(200).json(laudos);
        })
        .post(async (req, res) => {
            const paciente = req.body.paciente_id;
            if(req.body) {
                if(paciente) {
                    await new laudosDao(req.db).addLaudo(req.body);
                    res.status(200).json({msg: "Laudo cadastrado com sucesso"});
                } else {
                    res.status(409).json({msg: "Paciente é obrigatorio"});
                }
            } else {
                res.sendStatus(412);
            }
        });

    app.route('/laudos/:id')
        .get(async (req, res) => {
            const id = req.params.id;
            if (id) {
                const laudo = await new laudosDao(req.db).getLaudoById(id);
                if(laudo) {
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
            const paciente= req.body.paciente_id;
            if(id && req.body) {
                if(paciente) {
                    const laudo = await new laudosDao(req.db).getLaudoById(id)
                    if(laudo) {
                        await new laudosDao(req.db).updateLaudo(id, req.body);
                        res.status(200).json({msg: "Laudo atualizado com sucesso"});
                    } else {
                        res.sendStatus(404);
                    }
                } else {
                    res.status(409).json({msg: "Paciente é obrigatorio"});
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
                    res.sendStatus(202);
                } else {
                    res.sendStatus(404);
                }
            } else {
                res.sendStatus(404);
            }
        });
};
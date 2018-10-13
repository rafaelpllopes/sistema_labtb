const laudosDao = require('../models/laudos-dao');
const wrapAsync = require('../libs/async-wrap');
const auth = require('../libs/auth');

module.exports = app => {
    app.route('/laudos')
        .get(auth, wrapAsync(async (req, res) => {
            const page = req.query.page;
            const laudos = await new laudosDao(req.db).getLaudos(page);
            res.status(200).json(laudos);
        }))
        .post(auth, wrapAsync(async (req, res) => {
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
        }));

    app.route('/laudos/filter')
        .get(auth, wrapAsync(async (req, res) => {
            const cns = req.query.cns;
            const nome = req.query.nome;
            const mes = req.query.mes;
            const ano = req.query.ano;
            if (cns || nome || mes && ano) {
                let dia = '';
                let dataInicial = '';
                let dataFinal = '';

                if (mes && ano) {
                    switch (mes) {
                        case '01':
                        case '03':
                        case '05':
                        case '07':
                        case '08':
                        case '10':
                        case '12': {
                            dia = '31';
                        } break;
                        case '02': {
                            if (parseInt(mes) % 4 === 0) {
                                dia = '29';
                            } else {
                                dia = '28';
                            }
                        }
                            break;
                        default: {
                            dia = '30';
                        }
                    }
                    dataInicial = `${ano}-${mes}-01`;
                    dataFinal = `${ano}-${mes}-${dia}`;
                }

                const laudos = await new laudosDao(req.db).filterLaudos(cns, nome, dataInicial, dataFinal);

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
        }));

    app.route('/laudos/:id')
        .get(auth, wrapAsync(async (req, res) => {
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
        }))
        .put(auth, wrapAsync(async (req, res) => {
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
        }))
        .delete(auth, wrapAsync(async (req, res) => {
            const id = req.params.id;
            if (id) {
                const laudo = await new laudosDao(req.db).getLaudoById(id);
                if (laudo) {
                    await new laudosDao(req.db).deleteLaudo(id);
                    res.status(202).json({ msg: "Laudo deletado com sucesso" });
                } else {
                    res.sendStatus(404);
                }
            } else {
                res.sendStatus(404);
            }
        }));
};
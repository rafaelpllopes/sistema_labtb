const wrapAsync = require('../libs/async-wrap');
const auth = require('../libs/auth');
const pacientesController = require('../controllers/pacientes-controller');
const laudosController = require('../controllers/laudos-controller');

module.exports = app => {
    app.route('/pacientes')
        .get(auth, wrapAsync(async (req, res) => {
            const page = req.query.page;
            const pacientes = await pacientesController.obterPacientes(req.db, page);
            res.status(200).json(pacientes);
        }))
        .post(auth, wrapAsync(async (req, res) => {
            const paciente = req.body.paciente;
            if (paciente) {
                const cns = paciente.paciente_cns;
                const nome = paciente.paciente_nome;
                const dataNasc = paciente.paciente_data_nascimento;
                const sexo = paciente.paciente_sexo;
                if (cns) {
                    const cnsNumber = cns.length === 15 ? parseInt(cns) : undefined;
                    if (typeof cnsNumber === 'number' && cnsNumber.toString().length === 15) {
                        const cnsExiste = await pacientesController.buscaPorCns(req.db, cns);
                        if (!cnsExiste) {
                            if (nome && dataNasc && sexo) {
                                await pacientesController.adicionar(req.db, paciente);
                                res.status(201).json({ msg: "Paciente cadastrado com sucesso" });
                            } else {
                                res.status(412).json('Nome, data de nascimento, sexo são obrigatorios.');
                            }
                        } else {
                            res.status(409).json({ msg: "O CNS informado ja esta cadastrado" });
                        }
                    } else {
                        res.status(412).json({ msg: "CNS deve ter o tamanho de 15 caracteres e deve ser somente numeros" })
                    }
                } else {
                    if (nome && dataNasc && sexo) {
                        await pacientesController.adicionar(req.db, paciente);
                        res.status(201).json({ msg: "Paciente cadastrado com sucesso" });
                    } else {
                        res.status(412).json('Nome, data de nascimento, sexo são obrigatorios.')
                    }
                }

            } else {
                res.sendStatus(412);
            }
        }));

    app.route('/pacientes/filter')
        .get(auth, wrapAsync(async (req, res) => {
            const pacientes = await pacientesController.filter(req.db, req.query);
            res.status(200).json(pacientes);
        }));

    app.route('/pacientes/nome/:nome')
        .get(auth, wrapAsync(async (req, res) => {
            const nome = req.params.nome;
            if (nome) {
                const pacientes = await pacientesController.buscaPorNome(req.db, nome);
                res.status(200).json(pacientes);
            } else {
                res.sendStatus(404);
            }
        }));

    app.route('/pacientes/cns/:cns')
        .get(auth, wrapAsync(async (req, res) => {
            const cns = req.params.cns;
            if (cns) {
                const cnsNumber = cns.length === 15 ? parseInt(cns) : undefined;
                if (typeof cnsNumber === 'number' && cnsNumber.toString().length === 15) {
                    const pacientes = await pacientesController.buscaPorCns(req.db, cns);
                    res.status(200).json(pacientes);
                } else {
                    res.sendStatus(404);
                }
            } else {
                res.sendStatus(404);
            }
        }));

    app.route('/pacientes/:id')
        .get(auth, wrapAsync(async (req, res) => {
            const id = req.params.id;
            if (id) {
                const paciente = await pacientesController.obterPorId(req.db, id);
                res.status(200).json(paciente);
            } else {
                res.sendStatus(404);
            }
        }))
        .put(auth, wrapAsync(async (req, res) => {
            const id = req.params.id;
            const paciente = req.body.paciente;
            if (id) {
                if (paciente) {
                    const cns = paciente.paciente_cns;
                    const nome = paciente.paciente_nome;
                    const dataNasc = paciente.paciente_data_nascimento;
                    const sexo = paciente.paciente_sexo;

                    if (cns) {
                        const cnsNumber = cns.length === 15 ? parseInt(cns) : undefined;
                        if (typeof cnsNumber === 'number' && cnsNumber.toString().length === 15) {
                            const cnsExiste = await pacientesController.buscaPorCns(req.db, cns);
                            if (cnsExiste) {
                                if (nome && dataNasc && sexo) {
                                    await pacientesController.atualizar(req.db, id, paciente);
                                    res.status(202).json({ msg: 'Paciente atualizado com sucesso' });
                                } else {
                                    res.status(412).json({ msg: 'Nome, data de nascimento e sexo sao obrigatorios' });
                                }
                            } else {
                                if (nome && dataNasc && sexo) {
                                    await pacientesController.atualizar(req.db, id, paciente);
                                    res.status(202).json({ msg: 'Paciente atualizado com sucesso' });
                                } else {
                                    res.status(412).json({ msg: 'Nome, data de nascimento e sexo sao obrigatorios' });
                                }
                            }
                        } else {
                            res.status(412).json({ msg: 'Nome, data de nascimento, sexo são obrigatorios' })
                        }
                    } else {
                        if (nome && dataNasc && sexo) {
                            await pacientesController.atualizar(req.db, id, paciente);
                            res.status(202).json({ msg: 'Paciente atualizado com sucesso' });
                        } else {
                            res.status(412).json({ msg: 'Nome, data de nascimento e sexo sao obrigatorios' });
                        }
                    }
                }
            } else {
                res.sendStatus(404);
            }
        }))
        .delete(auth, wrapAsync(async (req, res) => {
            const id = req.params.id;
            if (id) {
                const laudos  = await laudosController.obterPorPacienteId(req.db, id);
                if (laudos.length === 0) {
                    await pacientesController.delete(req.db, id);
                    res.status(202).json({ msg: 'Paciente excluso com sucesso' });
                } else {
                    res.status(403).send('Exclusão não permitida, pois o paciente possui lados cadastrados');
                }
                return;
            } else {
                res.sendStatus(404);
                return;
            }
        }));
};
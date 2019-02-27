const pacientesDao = require('../models/pacientes-dao');
const laudosDao = require('../models/laudos-dao');
const wrapAsync = require('../libs/async-wrap');
const auth = require('../libs/auth');

module.exports = app => {
    app.route('/pacientes')
        .get(auth, wrapAsync(async (req, res) => {
            const page = req.query.page;
            const pacientes = await new pacientesDao(req.db).getPacientes(page);
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
                        const cnsExiste = await new pacientesDao(req.db).findPacienteByCns(cns);
                        if (!cnsExiste) {
                            if (nome && dataNasc && sexo) {
                                await new pacientesDao(req.db).addPaciente(paciente);
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
                        await new pacientesDao(req.db).addPaciente(paciente);
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
            const cns = req.query.cns;
            const nome = req.query.nome;
            const sexo = req.query.sexo;
            const pacientes = await new pacientesDao(req.db).getPacientesByFilter(cns, nome, sexo);
            res.status(200).json(pacientes);
        }));

    app.route('/pacientes/nome/:nome')
        .get(auth, wrapAsync(async (req, res) => {
            const nome = req.params.nome;
            if (nome) {
                const pacientes = await new pacientesDao(req.db).findPacienteByName(nome);
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
                    const pacientes = await new pacientesDao(req.db).findPacienteByCns(cns);
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
                const paciente = await new pacientesDao(req.db).findPacienteById(id);
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
                            const cnsExiste = await new pacientesDao(req.db).findPacienteByCns(cns);
                            if (cnsExiste) {
                                if (nome && dataNasc && sexo) {
                                    await new pacientesDao(req.db).updatePaciente(id, paciente);
                                    res.status(202).json({ msg: 'Paciente atualizado com sucesso' });
                                } else {
                                    res.status(412).json({ msg: 'Nome, data de nascimento e sexo sao obrigatorios' });
                                }
                            } else {
                                if (nome && dataNasc && sexo) {
                                    await new pacientesDao(req.db).updatePaciente(id, paciente);
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
                            await new pacientesDao(req.db).updatePaciente(id, paciente);
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
                const laudos  = await new laudosDao(req.db).getLaudosByPacienteId(id);
                if (laudos.length === 0) {
                    await new pacientesDao(req.db).deletePaciente(id);
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
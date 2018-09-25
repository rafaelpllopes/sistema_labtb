const pacientesDao = require('../models/pacientes-dao');

module.exports = app => {
    app.route('/pacientes')
        .get(async (req, res) => {
            const pacientes = await new pacientesDao(req.db).getPacientes();
            res.status(200).json(pacientes);
        })
        .post(async (req, res) => {
            if (req.body) {

                const cns = req.body.paciente_cns;
                const nome = req.body.paciente_nome;
                const dataNasc = req.body.paciente_data_nascimento;

                const cnsNumber = cns.length === 15 ? parseInt(cns) : undefined;

                if (typeof cnsNumber === 'number' && cnsNumber.toString().length === 15) {
                    const cnsExiste = await new pacientesDao(req.db).findPacienteByCns(cns);
                    if (!cnsExiste) {
                        if (nome && dataNasc) {
                            await new pacientesDao(req.db).addPaciente(req.body);
                            res.sendStatus(201);
                        } else {
                            res.status(412).json('Nome e data de nascimento são obrigatorios.')
                        }
                    } else {
                        res.status(409).json({ msg: "O CNS informado ja esta cadastrado" });
                    }
                } else {
                    res.status(412).json({ msg: "CNS deve ter o tamanho de 15 caracteres e deve ser somente numeros" })
                }
            } else {
                res.sendStatus(412);
            }
        });

    app.route('/pacientes/:id')
        .get(async (req, res) => {
            const id = req.params.id;
            if (id) {
                const paciente = await new pacientesDao(req.db).findPacienteById(id);
                res.status(200).json(paciente);
            } else {
                res.sendStatus(404);
            }
        })
        .put(async (req, res) => {
            const id = req.params.id;
            if (id) {
                const pacienteExiste = await new pacientesDao(req.db).findPacienteById(id);
                if (pacienteExiste) {
                    if (req.body) {

                        const cns = req.body.paciente_cns;
                        const nome = req.body.paciente_nome;
                        const dataNasc = req.body.paciente_data_nascimento;

                        const cnsNumber = cns.length === 15 ? parseInt(cns) : undefined;

                        if (typeof cnsNumber === 'number' && cnsNumber.toString().length === 15) {
                            if (pacienteExiste.paciente_cns === cns) {
                                if (nome && dataNasc) {
                                    await new pacientesDao(req.db).updatePaciente(id, req.body);
                                    res.sendStatus(202);
                                } else {
                                    res.status(412).json('Nome e data de nascimento são obrigatorios.')
                                }
                            }
                            const cnsExiste = await new pacientesDao(req.db).findPacienteByCns(cns);
                            if (!cnsExiste) {
                                if (nome && dataNasc) {
                                    await new pacientesDao(req.db).updatePaciente(id, req.body);
                                    res.sendStatus(202);
                                } else {
                                    res.status(412).json('Nome e data de nascimento são obrigatorios.')
                                }
                            } else {
                                res.status(409).json({ msg: "O CNS informado ja esta cadastrado" });
                            }
                        } else {
                            res.status(412).json({ msg: "CNS deve ter o tamanho de 15 caracteres e deve ser somente numeros" })
                        }
                    } else {
                        res.sendStatus(412);
                    }
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
                    await new pacientesDao(req.db).deletePaciente(id);
                    res.sendStatus(202);
                } else {
                    res.sendStatus(404);
                }
            }
        );
};
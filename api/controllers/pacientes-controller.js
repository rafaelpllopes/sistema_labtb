const db = require('../config/database');
const wrapAsync = require('../config/async-wrap');
const PacientesDao = require('../infra/pacientes-dao');
const LaudosDao = require('../infra/laudos-dao');
const { validationResult } = require('express-validator/check');

class PacientesController {

    static rotas() {
        return {
            pacientes: '/pacientes',
            pacientesId: '/pacientes/:id',
            filter: '/pacientes/filter',
            cns: '/pacientes/cns/:cns',
            nome: '/pacientes/nome/:nome'
        };
    }

    listar() {
        return wrapAsync(async (req, res) => {
            const page = req.query.page | 1;
            const pacientes = await new PacientesDao(db).getPacientes(page);
            res.status(200).json(pacientes);
        });
    }

    listarPorId() {
        return wrapAsync(async (req, res) => {
            const id = req.params.id;
            const paciente = await new PacientesDao(db).findPacienteById(id);
            res.status(200).json(paciente);
        });
    }

    adicionar() {
        return wrapAsync(async (req, res) => {

            const cns = req.body.paciente.paciente_cns;

            if (cns) {
                const cnsNumber = cns.length === 15 ? parseInt(cns) : undefined;
                if (typeof cnsNumber === 'number' && cnsNumber.toString().length === 15) {
                    const cnsExiste = await new PacientesDao(db).findPacienteByCns(cns);
                    if (cnsExiste) {
                        res.status(409).json({ msg: "O CNS informado ja esta cadastrado" });
                        return
                    }
                } else {
                    res.status(412).json({ msg: "CNS deve ter o tamanho de 15 caracteres e deve ser somente numeros" });
                    return
                }
            }

            const erros = validationResult(req);

            if (!erros.isEmpty()) {
                res.status(412).json({ Erros: erros.array() });
                return;
            }

            const paciente = req.body.paciente;

            await new PacientesDao(db).addPaciente(paciente);
            res.status(201).json({ msg: "Paciente cadastrado com sucesso" });
        });
    }

    atualizar() {
        return wrapAsync(async (req, res) => {

            const cns = req.body.paciente.paciente_cns;

            if (cns) {
                const cnsNumber = cns.length === 15 ? parseInt(cns) : undefined;
                if (typeof cnsNumber === 'number' && cnsNumber.toString().length === 15) {
                    const cnsExiste = await new PacientesDao(db).findPacienteByCns(cns);
                    if (cnsExiste) {
                        res.status(409).json({ msg: "O CNS informado ja esta cadastrado" });
                        return
                    }
                } else {
                    res.status(412).json({ msg: "CNS deve ter o tamanho de 15 caracteres e deve ser somente numeros" });
                    return
                }
            }

            const erros = validationResult(req);

            if (!erros.isEmpty()) {
                res.status(412).json({ Erros: erros.array() });
                return;
            }

            const id = req.params.id;
            const paciente = req.body.paciente;

            await new PacientesDao(db).updatePaciente(id, paciente);
            res.status(201).json({ msg: "Paciente atualizado com sucesso" });
        });
    }

    deletar() {
        return wrapAsync(async (req, res) => {
            const id = req.params.id;

            const laudos = await new LaudosDao(db).getLaudosByPacienteId(id);

            if (laudos.length === 0) {
                await new PacientesDao(db).deletePaciente(id);
                res.status(202).json({ msg: 'Paciente excluso com sucesso' });
            } else {
                res.status(403).send('Exclusão não permitida, pois o paciente possui lados cadastrados');
            }
        });
    }

    getByFilter() {
        return wrapAsync(async (req, res) => {
            const cns = req.query.cns;
            const nome = req.query.nome;
            const sexo = req.query.sexo;

            const pacientes = await new PacientesDao(db).getPacientesByFilter(cns, nome, sexo);
            res.status(200).json(pacientes);
        });
    }

    getPacienteByNome() {
        return wrapAsync(async (req, res) => {
            const nome = req.params.nome;
            const pacientes = await new PacientesDao(db).findPacienteByName(nome);
            res.status(200).json(pacientes);
        });
    }

    getPacienteByCNS() {
        return wrapAsync(async (req, res) => {
            const cns = req.params.cns;
            const pacientes = await new PacientesDao(db).findPacienteByCns(cns);
            res.status(200).json(pacientes);
        });
    }
}

module.exports = PacientesController;

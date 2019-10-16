const db = require('../config/database')
const LaudosDao = require('../infra/laudos-dao')
const ultimoDiaMes = require('../helpers/ultimo-dia-mes')
const wrapAsync = require('../config/async-wrap')
const { validationResult } = require('express-validator/check')

class LaudosController {

    constructor() {
        this.laudosDao = new LaudosDao(db)
    }

    static rotas() {
        return {
            laudos: '/laudos',
            filtrar: '/laudos/filter',
            laudosId: '/laudos/:id',
            resultado: '/laudos/resultado/:id',
            pacienteId: '/laudos/paciente/:id'
        }
    }

    listar() {
        return wrapAsync(async (req, res) => {
            const { page } = req.query

            const laudos = await this.laudosDao.getLaudos(page)
            res.json(laudos)
        })
    }

    listarPorId() {
        return wrapAsync(async (req, res) => {
            const erros = validationResult(req);

            if (!erros.isEmpty()) {
                res.status(412).json({ Erros: erros.array() })
                return
            }

            const { id } = req.params
            const laudo = await this.laudosDao.getLaudoById(id)
            res.json(laudo)
        })
    }

    listarPorIdPaciente() {
        return wrapAsync(async (req, res) => {
            const erros = validationResult(req);

            if (!erros.isEmpty()) {
                res.status(412).json({ Erros: erros.array() })
                return
            }

            const { id } = req.params
            const laudos = await this.laudosDao.getLaudosByPacienteId(id)
            res.json(laudos)
        })
    }

    listarPorFiltro() {
        return wrapAsync(async (req, res) => {
            const query = req.query
            
            if (!query) {
                res.status(412).json({ msg: 'Não há dados para pesquisar' })
                return
            }

            const { cns, nome, mes, ano } = query
            
            const dia = mes ? ultimoDiaMes(mes) : undefined
            const dataInicial = (ano && mes) ? `${ano}-${mes}-01`: undefined
            const dataFinal = (ano && mes) ? `${ano}-${mes}-${dia}`: undefined

            const laudos = await this.laudosDao.filterLaudos(cns, nome, dataInicial, dataFinal)
            res.json(laudos)
        })
    }

    atualizarResultado() {
        return wrapAsync(async (req, res) => {

            const erros = validationResult(req);

            if (!erros.isEmpty()) {
                res.status(404).json({ Erros: erros.array() })
                return
            }

            const { laudo } = req.body
            const { id } = req.params

            const existe = await this.laudosDao.getLaudoById(id);

            if (!existe) {
                res.status(404).json({ msg: "Laudo não encontrado" })
                return
            }

            await this.laudosDao.updateLaudoResultado(id, laudo)
            res.status(201).json({ msg: "Laudo atualizado com sucesso" })
        })
    }

    adicionar() {
        return wrapAsync(async (req, res) => {

            const erros = validationResult(req);

            if (!erros.isEmpty()) {
                res.status(412).json({ Erros: erros.array() })
                return
            }

            const { laudo } = req.body

            await this.laudosDao.addLaudo(laudo)
            res.json({ msg: 'Laudo cadastrado com sucesso' })
        })
    }

    atualizar() {
        return wrapAsync(async (req, res) => {

            const erros = validationResult(req);

            if (!erros.isEmpty()) {
                res.status(404).json({ Erros: erros.array() })
                return
            }

            const { laudo } = req.body
            const { id } = req.params

            const existe = await this.laudosDao.getLaudoById(id);

            if (!existe) {
                res.status(404).json({ msg: "Laudo não encontrado" })
                return
            }

            await this.laudosDao.updateLaudo(id, laudo)
            res.status(201).json({ msg: "Laudo atualizado com sucesso" })

        })
    }

    deletar() {
        return wrapAsync(async (req, res) => {
            const erros = validationResult(req);

            if (!erros.isEmpty()) {
                res.status(412).json({ Erros: erros.array() })
                return
            }

            const { id } = req.params
            const laudo = await this.laudosDao.getLaudoById(id)

            if (!laudo) {
                res.status(404).json({ msg: "Laudo não encontrado" })
                return
            }

            await this.laudosDao.deleteLaudo(id);
            res.json({ msg: "Laudo deletado com sucesso" })
        })
    }
}
/*

Laudos.obterPorPacienteId = async (db, id) => {
    const laudos = await new laudosDao(db).getLaudosByPacienteId(id);
    return laudos;
};
*/
module.exports = LaudosController
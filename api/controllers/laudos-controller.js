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
            laudosId: '/laudos/:id'
        }
    }

    listar() {
        return wrapAsync(async (req, res) => {
            const laudos = await this.laudosDao.getLaudos()
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

            if(!existe) {
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

            if(!laudo) {
                res.status(404).json({ msg: "Laudo não encontrado" })
                return
            }

            await this.laudosDao.deleteLaudo(id);
            res.json({ msg: "Laudo deletado com sucesso" })
        })
    }
}
/*

Laudos.filter = async (db, query) => {
    const cns = query.cns;
    const nome = query.nome;
    const mes = query.mes;
    const ano = query.ano;
    
    let dia = ultimoDiaMes(mes);
    let dataInicial = `${ano}-${mes}-01`
    let dataFinal = `${ano}-${mes}-${dia}`;
    
    const laudos = await new laudosDao(db).filterLaudos(cns, nome, dataInicial, dataFinal);

    return laudos;
};

Laudos.updateResultado = async (db, laudo) => {
    await new laudosDao(db).updateLaudoResultado(id, laudo);
};

Laudos.obterPorPacienteId = async (db, id) => {
    const laudos = await new laudosDao(db).getLaudosByPacienteId(id);
    return laudos;
};
*/
module.exports = LaudosController
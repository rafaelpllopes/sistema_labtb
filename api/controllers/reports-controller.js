const db = require('../config/database')
const ReportsDao = require('../infra/reports-dao')
const wrapAsync = require('../config/async-wrap')
const { validationResult } = require('express-validator/check')
const reportsUtils = require('../helpers/reports-utils')

class ReportsController {

    constructor() {
        this.reportsDao = new ReportsDao(db)
    }

    static rotas() {
        return {
            producao: '/reports/producao',
            total: '/reports/totalanomes',
            informeMensal: '/reports/informe-mensal',
            laudoPeriodo: '/reports/laudos-periodo'
        }
    }

    producao() {
        return wrapAsync(async (req, res) => {

            const erros = validationResult(req);

            if (!erros.isEmpty()) {
                res.status(412).json({ Erros: erros.array() })
                return
            }

            const { ano, mes } = req.body

            const producoes = await this.reportsDao.getProducaoAnoMes(ano, mes)
            res.json(producoes)
        })
    }

    totalProducao() {
        return wrapAsync(async (req, res) => {

            const erros = validationResult(req);

            if (!erros.isEmpty()) {
                res.status(412).json({ Erros: erros.array() })
                return
            }

            const { ano, mes } = req.body

            const [total] = await this.reportsDao.getProducaoTotalAnoMes(ano, mes)
            res.json(total)
        })
    }

    informeMensal() {
        return wrapAsync(async (req, res) => {

            const erros = validationResult(req);

            if (!erros.isEmpty()) {
                res.status(412).json({ Erros: erros.array() })
                return
            }

            const { ano, mes } = req.body

            const amostras1 = await this.reportsDao.getDiagnosticosAmostrasMesAno(ano, mes, 1);
            const amostras2 = await this.reportsDao.getDiagnosticosAmostrasMesAno(ano, mes, 2);
            const controles = await this.reportsDao.getControlesAmostrasMesAno(ano, mes);
            const positivos = await this.reportsDao.getPositivasMesAno(ano, mes);
            const resposta = reportsUtils.filtrar(amostras1, amostras2, controles, positivos);

            res.json(resposta);

        })
    }

    listaPorPeriodo() {
        return wrapAsync(async (req, res) => {

            const erros = validationResult(req);

            if (!erros.isEmpty()) {
                res.status(412).json({ Erros: erros.array() })
                return
            }

            const { dataInicial, dataFinal } = req.body

            const laudos = await this.reportsDao.getLaudosPorPeriodo(dataInicial, dataFinal);

            res.json(laudos);

        })
    }
}

module.exports = ReportsController
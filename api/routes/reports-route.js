const auth = require('../config/auth')
const ReportController = require('../controllers/reports-controller')
const reports = new ReportController()
const validacoes = require('../models/report')

module.exports = app => {
    app.route(ReportController.rotas().producao)
        .post(auth, validacoes.anoMes(), reports.producao())

    app.route(ReportController.rotas().total)
        .post(auth, validacoes.anoMes(), reports.totalProducao())

    app.route(ReportController.rotas().informeMensal)
        .post(auth, validacoes.anoMes(), reports.informeMensal())
    
    app.route(ReportController.rotas().laudoPeriodo)
        .post(auth, validacoes.periodo(), reports.listaPorPeriodo())
}
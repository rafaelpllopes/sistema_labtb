/*
const wrapAsync = require('../config/async-wrap');
const auth = require('../config/auth');
const reportsController = require('../controllers/reports-controller');

module.exports = app => {
    app.route('/reports/producao')
        .post(auth, wrapAsync(async (req, res) => {
            const ano = req.body.ano;
            const mes = req.body.mes;
            if (ano && mes) {
                const producao = await reportsController.producao(req.db, mes, ano);
                if (producao) {
                    res.json(producao);
                } else {
                    res.status(404).send();
                }
            } else {
                res.status(412).send();
            }

        }));

    app.route('/reports/totalanomes')
        .post(auth, wrapAsync(async (req, res) => {
            const ano = req.body.ano;
            const mes = req.body.mes;
            if (ano && mes) {
                const total = await reportsController.total(req.db, mes, ano);
                if (total) {
                    res.json(total);
                } else {
                    res.status(404).send();
                }
            } else {
                res.status(412).send();
            }

        }));

    app.route('/reports/informe-mensal')
        .post(auth, wrapAsync(async (req, res) => {
            const ano = req.body.ano;
            const mes = req.body.mes;
            if (ano && mes) {
                const resposta = await reportsController.informeMensal(req.db, mes, ano);
                res.json(resposta);
            } else {
                res.status(412).send();
            }
        }));
    
    app.post('/reports/laudos-periodo', auth, wrapAsync(async (req, res) => {
        const dataInicial = req.body.dataInicial;
        const dataFinal = req.body.dataFinal;
        if (dataInicial && dataFinal) {
            const resposta = await reportsController.listaPorPeriodo(req.db, dataInicial, dataFinal);
            res.json(resposta);
        } else {
            res.status(412).send();
        }
    }));
};
*/
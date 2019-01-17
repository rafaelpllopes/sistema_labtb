const reportsDao = require('../models/reports-dao');
const wrapAsync = require('../libs/async-wrap');
const auth = require('../libs/auth');

module.exports = app => {
    app.route('/reports/producao')
        .post(/*auth, wrapAsync(*/async (req, res) => {
            const ano = req.body.ano;
            const mes = req.body.mes;
            if (ano && mes) {
                const producao = await new reportsDao(req.db).getProducaoAnoMes(ano, mes);                
                if (producao) {
                    res.json(producao);
                } else {
                    res.status(404).send();
                }
            } else {
                res.status(412).send();
            }

        })/*)*/;

        app.route('/reports/totalanomes')
        .post(/*auth, wrapAsync(*/async (req, res) => {
            const ano = req.body.ano;
            const mes = req.body.mes;
            if (ano && mes) {
                const [total] = await new reportsDao(req.db).getProducaoTotalAnoMes(ano, mes);     
                if (total) {
                    res.json(total);
                } else {
                    res.status(404).send();
                }
            } else {
                res.status(412).send();
            }

        })/*)*/;
};
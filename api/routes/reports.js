const reportsDao = require('../models/reports-dao');
const wrapAsync = require('../libs/async-wrap');
const auth = require('../libs/auth');

function filtrar(amostras1, amostras2, tratamentos, positivos) {

    let resposta = [];
    let amostra = {};
    let controle = {};
    let positivo = {};
    let unidade = '';

    let itapeva = {
        unidade: "ITAPEVA",
        qtd_amostra1: 0,
        qtd_amostra2: 0,
        qtd_controle: 0,
        qtd_positivo: 0
    }

    for (let i = 0; i < amostras1.length; i++) {
        unidade = amostras1[i].unidade;
        amostra = amostras2.filter(a2 => a2.unidade == unidade);
        controle = tratamentos.filter(t => t.unidade == unidade);
        positivo = positivos.filter(p => p.unidade == unidade);

        if (verificarMunicipio(unidade)) {
            resposta.push({
                unidade,
                qtd_amostra1: amostras1[i].qtd | 0,
                qtd_amostra2: amostra.qtd | 0,
                qtd_controle: controle.qtd | 0,
                qtd_positivo: positivo.qtd | 0
            });
        } else {
            itapeva.qtd_amostra1 += amostras1[i].qtd | 0;
            itapeva.qtd_amostra2 += amostra.qtd | 0;
            itapeva.qtd_controle += controle.qtd | 0;
            itapeva.qtd_positivo += positivo.qtd | 0;
        }
    }

    resposta.push(itapeva);

    return resposta;
}

const verificarMunicipio = unidade => 
    unidade === 'BURI' ||
    unidade === "ITABERÁ" ||
    unidade === "BOM SUCESSO DE ITARARÉ" ||
    unidade === "ITARARÈ" ||
    unidade === "NOVA CAMPINA" ||
    unidade === "RIBEIRÃO BRANCO" ||
    unidade === "RIVERSUL" ||
    unidade === "TAQUARIVAÍ"

module.exports = app => {
    app.route('/reports/producao')
        .post(auth, wrapAsync(async (req, res) => {
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

        }));

    app.route('/reports/totalanomes')
        .post(auth, wrapAsync(async (req, res) => {
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

        }));

    app.route('/reports/informe-mensal')
        .post(/*auth, wrapAsync(*/async (req, res) => {
            const ano = req.body.ano;
            const mes = req.body.mes;
            console.log(ano, mes)
            if (ano && mes) {
                const amostras1 = await new reportsDao(req.db).getDiagnosticosAmostrasMesAno(ano, mes, 1);
                const amostras2 = await new reportsDao(req.db).getDiagnosticosAmostrasMesAno(ano, mes, 2);
                const controles = await new reportsDao(req.db).getControlesAmostrasMesAno(ano, mes);
                const positivos = await new reportsDao(req.db).getPositivasMesAno(ano, mes);

                const resposta = filtrar(amostras1, amostras2, controles, positivos);

                res.json(resposta);
            } else {
                res.status(412).send();
            }

        })/*)*/;
};
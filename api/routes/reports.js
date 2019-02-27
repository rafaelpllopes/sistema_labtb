const reportsDao = require('../models/reports-dao');
const wrapAsync = require('../libs/async-wrap');
const auth = require('../libs/auth');

function filtrar(amostras1, amostras2, tratamentos, positivos) {

    let amostra1 = {};
    let amostra2 = {};
    let controle = {};
    let positivo = {};
    let total_baar = 0;
    let total_amostra1 = 0;
    let total_amostra2 = 0;
    let total_controle = 0;
    let total_positivo = 0;
    let total_geral_baar = 0;
    let index;


    const unidades = [
        'BURI',
        "BOM SUCESSO DE ITARARÉ",
        "ITABERÁ",
        "ITAPEVA",
        "ITARARÈ",
        "NOVA CAMPINA",
        "RIBEIRÃO BRANCO",
        "RIVERSUL",
        "TAQUARIVAÍ"
    ];

    let obj_unidades = [];

    for (unidade of unidades) {
        obj_unidades.push({
            unidade,
            qtd_amostra1: 0,
            qtd_amostra2: 0,
            qtd_controle: 0,
            qtd_positivo: 0,
            total_baar: 0,
        });
    }

    amostras1 = unidadeNome(amostras1);
    amostras2 = unidadeNome(amostras2);
    tratamentos = unidadeNome(tratamentos);
    positivos = unidadeNome(positivos);

    for (unidade of unidades) {

        amostra1 = amostras1.filter(a1 => a1.unidade === unidade);
        amostra2 = amostras2.filter(a2 => a2.unidade === unidade);
        controle = tratamentos.filter(t => t.unidade === unidade);
        positivo = positivos.filter(p => p.unidade === unidade);

        for (let i = 0; i < unidades.length; i++) {
            amostra1 = quantidade(amostra1);
            amostra2 = quantidade(amostra2);
            controle = quantidade(controle);
            positivo = positivas(positivo);
            total_baar = amostra1 + amostra2 + controle;

            index = obj_unidades.findIndex(dado => dado.unidade === unidade);

            obj_unidades[index].qtd_amostra1 += amostra1;
            obj_unidades[index].qtd_amostra2 += amostra2;
            obj_unidades[index].qtd_controle += controle;
            obj_unidades[index].qtd_positivo += positivo;
            obj_unidades[index].total_baar += total_baar;

            total_amostra1 += amostra1;
            total_amostra2 += amostra2;
            total_controle += controle;
            total_positivo += positivo;
            total_geral_baar += total_baar;
        }
    }

    return {
        baars: obj_unidades,
        totais: [
            { total_amostra1 },
            { total_amostra2 },
            { total_controle },
            { total_positivo },
            { total_geral_baar }
        ]
    };
}

const quantidade = lista => {
    let qtd = 0;

    if(lista.length) {
        for(item of lista) {
            qtd += item.qtd;
        }
    }
    
    return qtd;
};

const positivas = lista => {
    let qtd = 0;

    if(lista.length) {
        for(item of lista) {
            qtd += 1;
        }
    }

    return qtd;
}

const unidadeNome = lista => {
    for (let i = 0; i < lista.length; i++) {
        if (!verificarMunicipio(lista[i].unidade)) {
            lista[i].unidade = "ITAPEVA";
        }
    }
    return lista;
};

const verificarMunicipio = unidade =>
    unidade === 'BURI' ||
    unidade === "ITABERÁ" ||
    unidade === "BOM SUCESSO DE ITARARÉ" ||
    unidade === "ITARARÈ" ||
    unidade === "NOVA CAMPINA" ||
    unidade === "RIBEIRÃO BRANCO" ||
    unidade === "RIVERSUL" ||
    unidade === "TAQUARIVAÍ";

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
        .post(auth, wrapAsync(async (req, res) => {
            const ano = req.body.ano;
            const mes = req.body.mes;

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
        }));
};
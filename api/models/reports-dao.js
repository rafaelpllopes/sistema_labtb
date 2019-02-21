const dia = require('../libs/ultimo-dia-mes');

const producaoConverter = row => ({
    quantidade: row.qtd,
    unidade: row.unidade.replace('\n', '').trim()
});

class ReportsDao {
    constructor(db) {
        this._db = db;
    }

    getProducaoAnoMes(ano, mes) {
        return new Promise((resolve, reject) => {
            this._db.all(`SELECT u.unidade, COUNT(l.laudo_id) as qtd
                FROM laudos l
                INNER JOIN unidades u ON u.unidade_id = l.unidade_id
                WHERE l.laudo_data_entrada BETWEEN '${ano}-${mes}-01 00:00:00' AND '${ano}-${mes}-${dia(mes)} 23:59:59' 
                GROUP BY u.unidade
                `, (err, rows) => {
                if (err) {
                    return reject('Não foi possivel carregar os resultados');
                }
                const resultados = rows.map(producaoConverter);
                return resolve(resultados);
            });
        });
    }

    getProducaoTotalAnoMes(ano, mes) {
        return new Promise((resolve, reject) => {
            this._db.all(`SELECT COUNT(laudo_id) as total
                FROM laudos
                WHERE laudo_data_entrada BETWEEN '${ano}-${mes}-01 00:00:00' AND '${ano}-${mes}-${dia(mes)} 23:59:59' 
                `, (err, rows) => {
                if (err) {
                    return reject('Não foi possivel carregar os resultados');
                }
                const resultados = rows;
                return resolve(resultados);
            });
        });
    }

    getDiagnosticosAmostrasMesAno(ano, mes, numeroAmostra) {
        return new Promise((resolve, reject) => {
            this._db.all(`SELECT u.unidade, COUNT(l.laudo_id) AS qtd, l.laudo_tipo AS tipo, l.laudo_amostras AS amostra
                FROM laudos l
                INNER JOIN unidades u ON u.unidade_id = l.unidade_id
                WHERE l.laudo_data_entrada BETWEEN '${ano}-${mes}-01 00:00:00' AND '${ano}-${mes}-${dia(mes)} 23:59:59'
                AND l.laudo_tipo = 'DIAGNÓSTICO'
                AND l.laudo_amostras = '${numeroAmostra}'
                GROUP BY u.unidade
                `, (err, rows) => {
                if (err) {
                    return reject('Não foi possivel carregar os resultados');
                }
                const resultados = rows;
                return resolve(resultados);
            });
        });
    }

    getControlesAmostrasMesAno(ano, mes) {
        return new Promise((resolve, reject) => {
            this._db.all(`SELECT u.unidade, COUNT(l.laudo_id) AS qtd, l.laudo_tipo AS tipo
                FROM laudos l
                INNER JOIN unidades u ON u.unidade_id = l.unidade_id
                WHERE l.laudo_data_entrada BETWEEN '${ano}-${mes}-01 00:00:00' AND '${ano}-${mes}-${dia(mes)} 23:59:59'
                AND l.laudo_tipo = 'CONTROLE DE TRATAMENTO'
                GROUP BY u.unidade
                ORDER BY u.unidade
                `, (err, rows) => {
                if (err) {
                    return reject('Não foi possivel carregar os resultados');
                }
                const resultados = rows;
                return resolve(resultados);
            });
        });
    }

    getPositivasMesAno(ano, mes) {
        return new Promise((resolve, reject) => {
            this._db.all(`SELECT u.unidade, COUNT(l.resultado_id) AS qtd
                FROM laudos l
                INNER JOIN unidades u ON u.unidade_id = l.unidade_id
                INNER JOIN resultados r ON l.resultado_id = r.resultado_id
                WHERE l.laudo_data_entrada BETWEEN '${ano}-${mes}-01 00:00:00' AND '${ano}-${mes}-${dia(mes)} 23:59:59'
                AND r.resultado <> 'NEGATIVA'
                GROUP BY u.unidade
                `, (err, rows) => {
                if (err) {
                    return reject('Não foi possivel carregar os resultados');
                }
                const resultados = rows;
                return resolve(resultados);
            });
        });
    }

    getTotalUnidades() {
        return new Promise((resolve, reject) => {
            this._db.get(`SELECT COUNT(unidade_id) AS total FROM unidades`, (err, rows) => {
                if (err) {
                    return reject('Não foi possivel pegar o total de unidades');
                }
                const resultados = rows;
                return resolve(resultados);
            });
        });
    }
}

module.exports = ReportsDao;
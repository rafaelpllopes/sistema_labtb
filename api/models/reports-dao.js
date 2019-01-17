const dia = require('../libs/ultimo-dia-mes');

const producaoConverter = row => ({
    quantidade: row.qtd,
    unidade: row.unidade.replace('\n', '').trim()
});

class AspectosDao {
    constructor(db) {
        this._db = db;
    }

    getProducaoAnoMes(ano, mes) {
        return new Promise((resolve, reject) => {
            this._db.all(`SELECT u.unidade, SUM(l.laudo_amostras) as qtd
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
            this._db.all(`SELECT SUM(laudo_amostras) as total
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
}

module.exports = AspectosDao;
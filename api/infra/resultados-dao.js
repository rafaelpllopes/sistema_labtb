const resultadoConverter = row => ({
    resultado_id: row.resultado_id,
    resultado: row.resultado
});

class AspectosDao {
    constructor(db) {
        this._db = db;
    }

    getResultados() {
        return new Promise((resolve, reject) => {
            this._db.all(`SELECT * FROM resultados`, (err, rows) => {
                if (err) {
                    return reject('Não foi possivel carregar os resultados');
                }
                const resultados = rows.map(resultadoConverter);
                return resolve(resultados);
            });
        });
    }
}

module.exports = AspectosDao;
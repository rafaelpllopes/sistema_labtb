const producaoConverter = row => ({
    quantidade: row.qtd,
    municipio: row.paciente_municipio
});

class AspectosDao {
    constructor(db) {
        this._db = db;
    }

    getProducao() {
        return new Promise((resolve, reject) => {
            this._db.all(`SELECT SUM(l.laudo_amostras) as qtd, p.paciente_municipio FROM laudos l INNER JOIN pacientes p ON p.paciente_id = l.paciente_id GROUP BY p.paciente_municipio`, (err, rows) => {
                if (err) {
                    return reject('Não foi possivel carregar os resultados');
                }
                const resultados = rows.map(producaoConverter);
                return resolve(resultados);
            });
        });
    }
}

module.exports = AspectosDao;
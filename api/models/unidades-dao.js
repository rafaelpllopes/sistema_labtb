class UnidadesDao {

    constructor(db) {
        this._db = db;
    }

    getUnidades() {
        return new Promise((resolve, reject) => {
            this._db.all(`SELECT * FROM unidades ORDER BY unidade`, (err, rows) => {
                if (err) {
                    return reject('Não foi possivel carregar as unidades');
                }
                return resolve(rows);
            });
        });
    }
}

module.exports = UnidadesDao;
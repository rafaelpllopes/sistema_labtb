class TipoAmostraDao {

    constructor(db) {
        this._db = db;
    }

    getTipoAmostra() {
        return new Promise((resolve, reject) => {
            this._db.all(`SELECT * FROM tipo_amostra`, (err, rows) => {
                if (err) {
                    return reject('Não foi possivel carregar as tipo da amostra');
                }
                return resolve(rows);
            });
        });
    }
}

module.exports = TipoAmostraDao;
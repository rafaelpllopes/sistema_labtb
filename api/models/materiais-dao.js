class MateriasDao {

    constructor(db) {
        this._db = db;
    }

    getMaterias() {
        return new Promise((resolve, reject) => {
            this._db.all(`SELECT * FROM materiais`, (err, rows) => {
                if (err) {
                    return reject('Não foi possivel carregar as materias');
                }
                return resolve(rows);
            });
        });
    }
}

module.exports = MateriasDao;
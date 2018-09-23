const aspectosConverter = row => ({
    aspectos_id: row.aspectos_id,
    aspecto: row.aspecto
});

class AspectosDao {

    constructor(db) {
        this._db = db;
    }

    getAspectos() {
        return new Promise((resolve, reject) => {
            this._db.all(`SELECT * FROM aspectos`, (err, rows) => {
                if (err) {
                    return reject('Não foi possivel carregar os aspectos');
                }
                const aspectos = rows.map(aspectosConverter);
                return resolve(aspectos);
            });
        });
    }
}

module.exports = AspectosDao;
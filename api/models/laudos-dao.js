class LaudosDao {
    constructor(db) {
        this._db = db;
    }

    addLaudo(laudo) {
        return new Promise((resolve, reject) => {
            this._db.get(`
                INSERT INTO 
                laudos (
                    laudo_material,
                    laudo_data_coleta,
                    laudo_amostras,
                    laudo_controle,
                    laudo_obs,
                    aspecto_id,
                    resultado_id,
                    paciente_id
                ) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            `,
                [
                    laudo.laudo_material,
                    laudo.laudo_data_coleta,
                    laudo.laudo_amostras,
                    laudo.laudo_controle,
                    laudo.laudo_obs,
                    laudo.aspecto_id,
                    laudo.resultado_id,
                    laudo.paciente_id
                ],
                (err, rows) => {
                    if (err) {
                        return reject('Não foi possivel cadastrar o laudo');
                    }
                    if (rows) resolve(rows);
                    resolve(null);
                });
        });
    }

    getLaudos(page) {
        const maxRows = 6;

        const from = (page - 1) * maxRows;

        let limitQuery = '';

        if (page) limitQuery = `LIMIT ${from}, ${maxRows}`;

        return new Promise((resolve, reject) => {
            this._db.all(`
            SELECT 
                l.laudo_id, 
                l.laudo_data_entrada, 
                p.paciente_nome, 
                p.paciente_sexo,
                l.laudo_material,
                l.laudo_amostras,
                l.laudo_controle 
            FROM laudos l 
                INNER JOIN pacientes p ON p.paciente_id = l.paciente_id 
                ${limitQuery}
                `,
                (err, rows) => {
                    if (err) {
                        return reject('Não foram encontrados laudos');
                    }
                    if (rows) resolve(rows);
                    resolve(null);
                });
        });
    }

    getLaudoById(id) {
        return new Promise((resolve, reject) => {
            this._db.get(`
            SELECT 
                l.*,
                p.* 
            FROM laudos l 
                INNER JOIN pacientes p ON p.paciente_id = l.paciente_id
            WHERE l.laudo_id = ?
            `,
                [id],
                (err, rows) => {
                    if (err) {
                        return reject('Não foi encontrado laudo');
                    }
                    if (rows) resolve(rows);
                    resolve(null);
                });
        });
    }

    updateLaudo(id, laudo) {
        return new Promise((resolve, reject) => {
            this._db.run(`
                UPDATE laudos SET 
                    laudo_material = ?,
                    laudo_data_coleta = ?,
                    laudo_amostras = ?,
                    laudo_controle = ?,
                    laudo_obs = ?,
                    aspecto_id = ?,
                    resultado_id = ?,
                    paciente_id = ?
                WHERE laudo_id = ?
            `,
                [
                    laudo.laudo_material,
                    laudo.laudo_data_coleta,
                    laudo.laudo_amostras,
                    laudo.laudo_controle,
                    laudo.laudo_obs,
                    laudo.aspecto_id,
                    laudo.resultado_id,
                    laudo.paciente_id,
                    id
                ],
                (err, rows) => {
                    if (err) {
                        return reject('Não foi possivel cadastrar o laudo');
                    }
                    if (rows) resolve(rows);
                    resolve(null);
                });
        });
    }

    deleteLaudo(id) {
        return new Promise((resolve, reject) => {
            this._db.run(`DELETE FROM laudos WHERE laudo_id = ?`,
                [id],
                (err, rows) => {
                    if (err) {
                        return reject('Não foi possivel deletar o laudo');
                    }
                    if (rows) resolve(rows);
                    resolve(null);
                });
        });
    }
}

module.exports = LaudosDao;
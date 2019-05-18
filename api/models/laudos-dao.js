class LaudosDao {
    constructor(db) {
        this._db = db;
    }

    addLaudo(laudo) {
        return new Promise(async (resolve, reject) => {
            let numeroGeral = await this._getUltimoNumeroGeral();
            
            this._db.run(`
                INSERT INTO 
                laudos (
                    laudo_numero_geral,
                    laudo_data_coleta,
                    laudo_tipo,
                    laudo_amostras,
                    laudo_obs,
                    material_id,
                    unidade_id,
                    aspecto_id,
                    resultado_id,
                    paciente_id
                ) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `,
                [
                    numeroGeral ? parseInt(numeroGeral) + 1 : 1,
                    laudo.laudo_data_coleta,
                    laudo.laudo_tipo,
                    laudo.laudo_amostras,
                    laudo.laudo_obs,
                    laudo.material_id,
                    laudo.unidade_id,
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
        const maxRows = 100;

        const from = (page - 1) * maxRows;

        let limitQuery = '';

        if (page) limitQuery = `LIMIT ${from}, ${maxRows}`;

        return new Promise((resolve, reject) => {
            this._db.all(`
            SELECT 
                l.laudo_id, 
                l.laudo_data_entrada,
                l.laudo_amostras,
                l.laudo_tipo,
                l.laudo_numero_geral,
                p.paciente_cns,
                p.paciente_nome, 
                p.paciente_sexo,
                p.paciente_municipio,
                m.material,
                u.unidade
            FROM laudos l 
                INNER JOIN pacientes p ON p.paciente_id = l.paciente_id
                INNER JOIN unidades u ON l.unidade_id = u.unidade_id
                INNER JOIN materiais m ON l.material_id = m.material_id
                ORDER BY l.laudo_id DESC
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
                (SELECT aspecto FROM aspectos WHERE aspectos_id = l.aspecto_id) AS aspecto,
                (SELECT resultado FROM resultados WHERE resultado_id = l.resultado_id) AS resultado,
                (SELECT material FROM materiais WHERE material_id = l.material_id) AS material,
                (SELECT unidade FROM unidades WHERE unidade_id = l.unidade_id) AS unidade,
                p.*
            FROM laudos l 
            INNER JOIN pacientes p ON p.paciente_id = l.paciente_id
            WHERE l.laudo_id = ?;
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

    getLaudosByPacienteId(id) {
        return new Promise((resolve, reject) => {
            this._db.all(`
            SELECT 
                l.laudo_id, 
                l.laudo_data_entrada,
                l.laudo_amostras,
                l.laudo_tipo,
                l.laudo_numero_geral, 
                p.paciente_cns,
                p.paciente_nome, 
                p.paciente_sexo,
                p.paciente_municipio,
                m.material,
                u.unidade
            FROM laudos l 
                INNER JOIN pacientes p ON p.paciente_id = l.paciente_id
                INNER JOIN unidades u ON l.unidade_id = u.unidade_id
                INNER JOIN materiais m ON l.material_id = m.material_id
            WHERE l.paciente_id = ?
            `,
                [id],
                (err, rows) => {
                    if (err) {
                        return reject('Não foi encontrado os laudos do paciente');
                    }
                    rows ? resolve(rows) : resolve(null);
                });
        });
    }

    updateLaudoResultado(id, laudo) {
        return new Promise((resolve, reject) => {
            this._db.run(`
                UPDATE laudos SET 
                    laudo_obs = ?,
                    aspecto_id = ?,
                    resultado_id = ?
                WHERE laudo_id = ?
            `,
                [
                    laudo.laudo_obs,
                    laudo.aspecto_id,
                    laudo.resultado_id,
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

    updateLaudo(id, laudo) {
        return new Promise((resolve, reject) => {
            this._db.run(`
                UPDATE laudos SET 
                    laudo_data_coleta = ?,
                    laudo_tipo = ?,
                    laudo_amostras = ?,
                    laudo_obs = ?,
                    material_id = ?,
                    unidade_id = ?,
                    aspecto_id = ?,
                    resultado_id = ?
                WHERE laudo_id = ?
            `,
                [
                    laudo.laudo_data_coleta,
                    laudo.laudo_tipo,
                    laudo.laudo_amostras,
                    laudo.laudo_obs,
                    laudo.material_id,
                    laudo.unidade_id,
                    laudo.aspecto_id,
                    laudo.resultado_id,
                    id
                ],
                (err, rows) => {
                    if (err) {
                        console.log(err);
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

    filterLaudos(cns, nome, dataInicial, dataFinal) {
        let query = `
        SELECT 
            l.laudo_id, 
            l.laudo_data_entrada,
            l.laudo_amostras,
            l.laudo_tipo,
            l.laudo_numero_geral,
            p.paciente_cns,
            p.paciente_nome, 
            p.paciente_sexo,
            p.paciente_municipio,
            m.material,
        u.unidade
        FROM laudos l 
            INNER JOIN pacientes p ON p.paciente_id = l.paciente_id
            INNER JOIN unidades u ON l.unidade_id = u.unidade_id
            INNER JOIN materiais m ON l.material_id = m.material_id`;

        if (cns || nome || dataInicial || dataFinal) {
            query += ' WHERE'
        }

        if (cns) {
            query += ` p.paciente_cns = '${cns}'`;
        }

        if (nome) {
            if (cns) {
                query += ` AND p.paciente_nome LIKE '${nome}%'`;
            } else {
                query += ` p.paciente_nome LIKE '${nome}%'`;
            }
        }

        if (dataInicial && dataFinal) {
            if (cns || nome) {
                query += ` AND l.laudo_data_entrada BETWEEN '${dataInicial}' AND '${dataFinal}'`;
            } else {
                query += ` l.laudo_data_entrada BETWEEN '${dataInicial}' AND '${dataFinal}'`;
            }
        }

        query += ' ORDER BY l.laudo_id DESC';

        return new Promise((resolve, reject) => {
            this._db.all(
                query,
                (err, rows) => {
                    if (err) {
                        return reject('Não foi possivel buscar os laudo');
                    }
                    if (rows) return resolve(rows);
                    resolve(null);
                }
            );
        });
    }

    _getUltimoNumeroGeral() {
        let ano = new Date().getFullYear();
        return new Promise((resolve, reject) => this._db.get(
            `SELECT MAX(laudo_numero_geral) AS numero FROM laudos WHERE laudo_data_entrada BETWEEN '${ano}-01-01 00:00:00' AND '${ano}-12-31 23:59:59'`, 
            (err, rows) => {
                if(err) {
                    reject(err);
                }
                let { numero } = rows;
                resolve(numero);
            }
        ));
    }
}

module.exports = LaudosDao;
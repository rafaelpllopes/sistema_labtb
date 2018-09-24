class PacientesDao {
    constructor(db) {
        this._db = db;
    }

    addPaciente(paciente) {
        return new Promise((resolve, reject) => {
            this._db.run('INSERT INTO pacientes VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
                [
                    paciente.paciente_cns | '',
                    paciente.paciente_nome,
                    paciente.paciente_data_nascimento,
                    paciente.paciente_cep | '',
                    paciente.paciente_logradouro | '',
                    paciente.paciente_numero | '',
                    paciente.paciente_bairro | '',
                    paciente.paciente_municipio | '',
                    paciente.paciente_estado | ''
                ],
                (err, rows) => {
                    if (err) {
                        return reject('Não foi possivel cadastrar o paciente');
                    }
                    return resolve(null);
                }
            );
        });
    }

    getPacientes(page) {
        const maxRows = 12;

        const from = (page - 1) * maxRows;

        let limitQuery = '';

        if (page) limitQuery = `LIMIT ${from}, ${maxRows}`;

        return new Promise((resolve, reject) => {
            this._db.all(`
                SELECT * FROM pacientes
                ${limitQuery} ;
                `,
                (err, rows) => {
                    if (err) {
                        return reject('Não foram encontrados pacientes');
                    }
                    resolve(rows);
                });
        });
    }

    updatePaciente(id, paciente) {
        return new Promise((resolve, reject) => {
            this.db.run(
                `UPDATE pacientes 
                    SET paciente_cns = ?,
                    paciente_nome = ?,
                    paciente_data_nascimento ?,
                    paciente_cep = ?,
                    paciente_logradouro = ?,
                    paciente_numero = ?,
                    paciente_bairro = ?,
                    paciente_municipio = ?,
                    paciente_estado = ?
                    WHERE paciente_id = ?
                ` , [
                    paciente.paciente_cns,
                    paciente.paciente_nome,
                    paciente.paciente_data_nascimento,
                    paciente.paciente_cep,
                    paciente.paciente_logradouro,
                    paciente.paciente_numero,
                    paciente.paciente_bairro,
                    paciente.paciente_municipio,
                    paciente.paciente_estado
                ], 
                (err, rows) => {
                    if(err) {
                        return reject('Não foi possivel atualizar o paciente');
                    }
                    if (rows) resolve(rows);
                    resolve(null);
                }
            );
        });
    }

    deletePaciente(id) {
        return new Promise((resolve, reject) => {
            this._db.run(`DELETE FROM pacientes WHERE paciente_id = ?`,
            [id],
            (err, rows) => {
                if(err) {
                    return reject('Não foi possivel deletar o paciente');
                }
                if (rows) resolve(rows);
                resolve(null);
            });
        });
    }

    findPacienteById(id) {
        return new Promise((resolve, reject) => {
            this._db.get(`SELECT * FROM pacientes WHERE paciente_id = ?`,
            [id],
            (err, rows) => {
                if(err) {
                    return reject('Não foi possivel encontrar o paciente');
                }
                if (rows) resolve(rows);
                resolve(null);
            });
        });
    }

    findPacienteByName(nome) {
        return new Promise((resolve, reject) => {
            this._db.all(`SELECT * FROM pacientes WHERE paciente_name LIKE '%?%' LIMIT 12 ORDER BY paciente_name`,
            [nome],
            (err, rows) => {
                if(err) {
                    return reject('Não foi possivel encontrar o paciente');
                }
                if (rows) resolve(rows);
                resolve(null);
            });
        });
    }

    findPacienteByCns(cns) {
        return new Promise((resolve, reject) => {
            this._db.get(`SELECT * FROM pacientes WHERE paciente_cns = ?`,
            [cns],
            (err, rows) => {
                if(err) {
                    return reject('Não foi possivel encontrar o paciente');
                }
                if (rows) resolve(rows);
                resolve(null);
            });
        });
    }
}
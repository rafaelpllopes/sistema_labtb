const zfill = require('../libs/zfill');

class PacientesDao {

    constructor(db) {
        this._db = db;
    }

    addPaciente(paciente) {
        return new Promise((resolve, reject) => {
            this._db.run(`INSERT INTO 
                pacientes (paciente_cns, 
                    paciente_nome, 
                    paciente_data_nascimento, 
                    paciente_cep,
                    paciente_logradouro,
                    paciente_numero,
                    paciente_bairro,
                    paciente_municipio,
                    paciente_estado) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [
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
                    if (err) {
                        return reject('Não foi possivel cadastrar o paciente');
                    }
                    return resolve(null);
                }
            );
        });
    }

    getPacientes(page) {
        const maxRows = 10;

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
                    if (rows) resolve(rows);
                    resolve(null);
                });
        });
    }

    updatePaciente(id, paciente) {
        let date = new Date();
        const dataAtual = `${date.getFullYear()}-${zfill(date.getMonth() + 1, 2)}-${zfill(date.getDate(), 2)} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
        return new Promise((resolve, reject) => {
            this._db.run(
                `UPDATE pacientes SET 
                paciente_cns = '${paciente.paciente_cns}', 
                paciente_nome = '${paciente.paciente_nome}', 
                paciente_data_nascimento = '${paciente.paciente_data_nascimento}', 
                paciente_cep = '${paciente.paciente_cep}', 
                paciente_logradouro = '${paciente.paciente_logradouro}', 
                paciente_numero = '${paciente.paciente_numero}', 
                paciente_bairro = '${paciente.paciente_bairro}', 
                paciente_municipio = '${paciente.paciente_municipio}', 
                paciente_estado = '${paciente.paciente_estado}', 
                paciente_atualizado = '${dataAtual}'
                WHERE paciente_id = ?`,
                [id],
                (err, rows) => {
                    if (err) {
                        return reject('Não foi possivel atualizar o paciente');
                    }
                    if (rows) resolve(rows);
                    resolve(null);
                }
            );
        });
    }

    async deletePaciente(id) {
        try {
            await this._db.run(`DELETE FROM pacientes WHERE paciente_id = ?`,
                [id],
                (err, rows) => {
                    if (err) {
                        return null;
                    }
                    if (rows) return rows;
                    return null;
                });
        } catch (err) {
            console.log(err);
            return null;
        }

    }

    findPacienteById(id) {
        return new Promise((resolve, reject) => {
            this._db.get(`SELECT * FROM pacientes WHERE paciente_id = ?`,
                [id],
                (err, rows) => {
                    if (err) {
                        return reject('Não foi possivel encontrar o paciente');
                    }
                    if (rows) resolve(rows);
                    resolve(null);
                });
        });
    }

    findPacienteByName(nome) {
        return new Promise((resolve, reject) => {
            this._db.all(`SELECT * FROM pacientes WHERE paciente_nome LIKE '${nome}%'`,
                (err, rows) => {
                    if (err) {
                        console.log(err);
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
                    if (err) {
                        return reject('Não foi possivel encontrar o paciente');
                    }
                    if (rows) resolve(rows);
                    resolve(null);
                });
        });
    }
}

module.exports = PacientesDao;
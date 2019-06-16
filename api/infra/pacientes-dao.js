const zfill = require('../config/zfill');

class PacientesDao {

    constructor(db) {
        this._db = db;
    }

    addPaciente(paciente) {
        return new Promise((resolve, reject) => {
            this._db.run(`INSERT INTO 
                pacientes (
                    paciente_cns, 
                    paciente_nome, 
                    paciente_data_nascimento, 
                    paciente_sexo,
                    paciente_email,
                    paciente_telefone,
                    paciente_cep,
                    paciente_logradouro,
                    paciente_numero,
                    paciente_bairro,
                    paciente_municipio,
                    paciente_estado
                ) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [
                    paciente.paciente_cns,
                    paciente.paciente_nome,
                    paciente.paciente_data_nascimento,
                    paciente.paciente_sexo,
                    paciente.paciente_email,
                    paciente.paciente_telefone,
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
                    if (rows) resolve(rows);
                    return resolve(null);
                }
            );
        });
    }

    getPacientes(page) {
        const maxRows = 100;

        const from = (page - 1) * maxRows;

        let limitQuery = '';

        if (page) limitQuery = `LIMIT ${from}, ${maxRows}`;

        return new Promise((resolve, reject) => {
            this._db.all(`
                SELECT * FROM pacientes ORDER BY paciente_nome
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
                paciente_cns = ?, 
                paciente_nome = ?, 
                paciente_data_nascimento = ?, 
                paciente_sexo = ?, 
                paciente_email = ?, 
                paciente_telefone = ?, 
                paciente_cep = ?, 
                paciente_logradouro = ?, 
                paciente_numero = ?, 
                paciente_bairro = ?, 
                paciente_municipio = ?, 
                paciente_estado = ?, 
                paciente_atualizado = ?
                WHERE paciente_id = ?`,
                [
                    paciente.paciente_cns,
                    paciente.paciente_nome,
                    paciente.paciente_data_nascimento,
                    paciente.paciente_sexo,
                    paciente.paciente_email,
                    paciente.paciente_telefone,
                    paciente.paciente_cep,
                    paciente.paciente_logradouro,
                    paciente.paciente_numero,
                    paciente.paciente_bairro,
                    paciente.paciente_municipio,
                    paciente.paciente_estado,
                    dataAtual,
                    id
                ],
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

    deletePaciente(id) {
        return new Promise((resolve, reject) => {
            this._db.run(`DELETE FROM pacientes WHERE paciente_id = ${id}`,
                (err, rows) => {
                    if (err) {
                        console.log(err);
                        return reject('Não foi possivel excluir o paciente');
                    }
                    resolve("Paciente deletado com sucesso");
                });
        });
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

    getPacientesByFilter(cns, nome, sexo) {

        let query = 'SELECT * FROM pacientes';

        if (cns || nome || sexo) {
            query += " WHERE";

            if (cns) {
                query += ` paciente_cns = '${cns}'`;
            }

            if (nome) {
                if (cns) {
                    query += ` AND paciente_nome LIKE '${nome}%'`;
                } else {
                    query += `  paciente_nome LIKE '${nome}%'`;
                }
            }

            if (sexo) {
                if (cns || nome) {
                    query += ` AND paciente_sexo = '${sexo}'`;
                } else {
                    query += ` paciente_sexo = '${sexo}'`;
                }
            }
        }

        query += ' ORDER BY paciente_nome';

        return new Promise((resolve, reject) => {
            this._db.all(
                query,
                (err, rows) => {
                    if (err) {
                        return reject('Não foram encontrados pacientes');
                    }
                    if (rows) resolve(rows);
                    resolve(null);
                });
        });
    }
}

module.exports = PacientesDao;
class PacientesDao {
    constructor(db) {
        this._db = db;
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

    addPaciente(paciente) {
        return Promise((resolve, reject) => {
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
                    if(err) {
                        return reject('Não foi possivel cadastrar o paciente');
                    }
                    return resolve(null);
                }
            );
        });
    }
}
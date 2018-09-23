const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('labtb.db');
const sha256 = require('sha256');

const USUARIOS_SCHEMA = `
CREATE TABLE IF NOT EXISTS usuarios (
    user_id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_name VARCHAR(250) NOT NULL UNIQUE,
    user_password VARCHAR(250) NOT NULL
)
`;

const INSERT_DEFAULT_USUARIO = 
`
INSERT INTO usuarios (user_name, user_password)
    SELECT 'admin', ? WHERE NOT EXISTS (SELECT * FROM usuarios WHERE user_name = 'admin')
`;

const PACIENTES_SCHEMA = `
CREATE TABLE IF NOT EXISTS pacientes (
    paciente_id INTEGER PRIMARY KEY AUTOINCREMENT,
    paciente_cns VARCHAR(15),
    paciente_nome VARCHAR(250) NOT NULL,
    paciente_data_nascimento DATE NOT NULL,
    paciente_cep VARCHAR(8),
    paciente_logradouro VARCHAR(250),
    paciente_numero VARCHAR(5),
    paciente_bairro VARCHAR(100),
    paciente_municipio VARCHAR(100),
    paciente_estado VARCHAR(100)
)
`;

const LAUDOS_SCHEMA = `
CREATE TABLE IF NOT EXISTS laudos (
    laudo_id INTEGER PRIMARY KEY AUTOINCREMENT,
    laudo_data_entrada TIMESTAMP NOT NULL, 
    laudo_materia VARCHAR(100),
    laudo_data_coleta DATE NOT NULL,
    laudo_controle INTEGER NOT NULL,
    laudo_obs TEXT DEFAULT ('') NOT NULL,
    aspecto_id INTEGER,
    resultado_id INTEGER,
    paciente_id INTEGER NOT NULL,
    UNIQUE(paciente_id, aspecto_id, resultado_id),
    FOREIGN KEY(paciente_id) REFERENCES pacientes(paciente_id) ON DELETE CASCADE,
    FOREIGN KEY(resultado_id) REFERENCES pacientes(resultado_id) ON DELETE CASCADE,
    FOREIGN KEY(aspecto_id) REFERENCES pacientes(aspecto_id) ON DELETE CASCADE  
)
`;

const ASPECTOS_SCHEMA = `
CREATE TABLE IF NOT EXISTS aspectos (
    aspectos_id INTEGER PRIMARY KEY AUTOINCREMENT, 
    aspecto VARCHAR(100) NOT NULL,
    unique(aspecto)
)
`;

const INSERT_DEFAULT_ASPECTOS_1 = 
`
INSERT INTO aspectos (aspecto) 
    SELECT 'MUCOPURULENTO' WHERE NOT EXISTS (SELECT * FROM aspectos WHERE aspecto = 'MUCOPURULENTO')
`;

const INSERT_DEFAULT_ASPECTOS_2 = 
`
INSERT INTO aspectos (aspecto)
    SELECT 'PURULENTO' WHERE NOT EXISTS (SELECT * FROM aspectos WHERE aspecto = 'PURULENTO')
`;

const INSERT_DEFAULT_ASPECTOS_3 = 
`
INSERT INTO aspectos (aspecto)
    SELECT 'SANGUINOLENTO' WHERE NOT EXISTS (SELECT * FROM aspectos WHERE aspecto = 'SANGUINOLENTO')
`;

const INSERT_DEFAULT_ASPECTOS_4 = 
`
INSERT INTO aspectos (aspecto)
    SELECT 'SALIVA' WHERE NOT EXISTS (SELECT * FROM aspectos WHERE aspecto = 'SALIVA')
`;

const INSERT_DEFAULT_ASPECTOS_5 = 
`
INSERT INTO aspectos (aspecto)
    SELECT 'LIQUEFEITO' WHERE NOT EXISTS (SELECT * FROM aspectos WHERE aspecto = 'LIQUEFEITO')
`;

const RESULTADOS_SCHEMA = `
CREATE TABLE IF NOT EXISTS resultados (
    resultado_id INTEGER PRIMARY KEY AUTOINCREMENT, 
    resultado VARCHAR(100) NOT NULL
)
`;

const INSERT_DEFAULT_RESULTADOS_1 = 
`
INSERT INTO resultados (resultado) 
    SELECT 'NEGATIVA' WHERE NOT EXISTS (SELECT * FROM resultados WHERE resultado = 'NEGATIVA')
`;

const INSERT_DEFAULT_RESULTADOS_2 = 
`
INSERT INTO resultados (resultado)
    SELECT 'POSITIVA DE 1 A 9 BAAR' WHERE NOT EXISTS (SELECT * FROM resultados WHERE resultado = 'POSITIVA DE 1 A 9 BAAR')
`;

const INSERT_DEFAULT_RESULTADOS_3 = 
`
INSERT INTO resultados (resultado) 
    SELECT 'POSITIVA(+)' WHERE NOT EXISTS (SELECT * FROM resultados WHERE resultado = 'POSITIVA(+)')
`;

const INSERT_DEFAULT_RESULTADOS_4 = 
`
INSERT INTO resultados (resultado) 
    SELECT 'POSITIVA(++)' WHERE NOT EXISTS (SELECT * FROM resultados WHERE resultado = 'POSITIVA(++)')
`;

const INSERT_DEFAULT_RESULTADOS_5 = 
`
INSERT INTO resultados (resultado)
    SELECT 'POSITIVA(+++)' WHERE NOT EXISTS (SELECT * FROM resultados WHERE resultado = 'POSITIVA(+++)')
`;

db.serialize(() => {
    db.run("PRAGMA foreign_keys=ON");
    db.run(USUARIOS_SCHEMA);
    db.run(PACIENTES_SCHEMA);
    db.run(LAUDOS_SCHEMA);
    db.run(ASPECTOS_SCHEMA);
    db.run(RESULTADOS_SCHEMA);               
    db.run(INSERT_DEFAULT_ASPECTOS_1); 
    db.run(INSERT_DEFAULT_ASPECTOS_2);
    db.run(INSERT_DEFAULT_ASPECTOS_3);
    db.run(INSERT_DEFAULT_ASPECTOS_4);
    db.run(INSERT_DEFAULT_ASPECTOS_5);
    db.run(INSERT_DEFAULT_RESULTADOS_1);
    db.run(INSERT_DEFAULT_RESULTADOS_2);
    db.run(INSERT_DEFAULT_RESULTADOS_3);
    db.run(INSERT_DEFAULT_RESULTADOS_4);
    db.run(INSERT_DEFAULT_RESULTADOS_5);
    db.run(INSERT_DEFAULT_USUARIO, [sha256.x2('admin')]);

    /*db.each("SELECT * FROM aspectos", (err, aspectos) => {
        console.log(aspectos);
    });


    db.each("SELECT * FROM resultados", (err, resultado) => {
        console.log(resultado);
    });*/

    db.each("SELECT * FROM usuarios", (err, resultado) => {
        console.log(resultado);
    });
});

process.on('SIGINT', () =>
    db.close(() => {
        console.log('Database closed');
        process.exit(0);
    })
);

module.exports = db;
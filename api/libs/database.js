const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('labtb.db');
const sha256 = require('sha256');
const zfill = require('./zfill');

const USUARIOS_SCHEMA = `
CREATE TABLE IF NOT EXISTS usuarios (
    user_id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_name VARCHAR(100) NOT NULL UNIQUE,
    user_full_name VARCHAR(250) NOT NULL,
    user_password VARCHAR(250) NOT NULL,
    user_data_cadastro TIMESTAMP DEFAULT (datetime('now','localtime')) NOT NULL
)
`;

const INSERT_DEFAULT_USUARIO =
    `
INSERT INTO usuarios (user_name, user_full_name, user_password)
    SELECT 'admin', 'Administrador', ? WHERE NOT EXISTS (SELECT * FROM usuarios WHERE user_name = 'admin')
`;

const PACIENTES_SCHEMA = `
CREATE TABLE IF NOT EXISTS pacientes (
    paciente_id INTEGER PRIMARY KEY AUTOINCREMENT,
    paciente_cns VARCHAR(15) UNIQUE,
    paciente_nome VARCHAR(250) NOT NULL,
    paciente_data_nascimento DATE NOT NULL,
    paciente_cep VARCHAR(8),
    paciente_logradouro VARCHAR(250),
    paciente_numero VARCHAR(5),
    paciente_bairro VARCHAR(100),
    paciente_municipio VARCHAR(100),
    paciente_estado VARCHAR(100),
    paciente_cadastro TIMESTAMP DEFAULT (datetime('now','localtime')) NOT NULL,
    paciente_atualizado TIMESTAMP
)
`;

const data = new Date();

const INSERT_TESTE_PACIENTES = [
    `INSERT INTO pacientes (paciente_cns, paciente_nome, paciente_data_nascimento) SELECT '111111111111111', 'Seila quem', '${data.getFullYear()}-${zfill(data.getMonth() + 1, 2)}-${zfill(data.getDate(), 2)}' WHERE NOT EXISTS (SELECT * FROM pacientes WHERE paciente_cns = '111111111111111')`,
    `INSERT INTO pacientes (paciente_cns, paciente_nome, paciente_data_nascimento) SELECT '222222222222222', 'João alguem', '${data.getFullYear()}-${zfill(data.getMonth() + 1, 2)}-${zfill(data.getDate(), 2)}' WHERE NOT EXISTS (SELECT * FROM pacientes WHERE paciente_cns = '222222222222222')`,
    `INSERT INTO pacientes (paciente_cns, paciente_nome, paciente_data_nascimento) SELECT '333333333333333', 'Super teste', '${data.getFullYear()}-${zfill(data.getMonth() + 1, 2)}-${zfill(data.getDate(), 2)}' WHERE NOT EXISTS (SELECT * FROM pacientes WHERE paciente_cns = '333333333333333')`,
    `INSERT INTO pacientes (paciente_cns, paciente_nome, paciente_data_nascimento) SELECT '444444444444444', 'Maria sem nome', '${data.getFullYear()}-${zfill(data.getMonth() + 1, 2)}-${zfill(data.getDate(), 2)}' WHERE NOT EXISTS (SELECT * FROM pacientes WHERE paciente_cns = '444444444444444')`,
    `INSERT INTO pacientes (paciente_cns, paciente_nome, paciente_data_nascimento) SELECT '555555555555555', 'Goku', '${data.getFullYear()}-${zfill(data.getMonth() + 1, 2)}-${zfill(data.getDate(), 2)}' WHERE NOT EXISTS (SELECT * FROM pacientes WHERE paciente_cns = '555555555555555')`,
    `INSERT INTO pacientes (paciente_cns, paciente_nome, paciente_data_nascimento) SELECT '666666666666666', 'Vegeta', '${data.getFullYear()}-${zfill(data.getMonth() + 1, 2)}-${zfill(data.getDate(), 2)}' WHERE NOT EXISTS (SELECT * FROM pacientes WHERE paciente_cns = '666666666666666')`
];


const LAUDOS_SCHEMA = `
CREATE TABLE IF NOT EXISTS laudos (
    laudo_id INTEGER PRIMARY KEY AUTOINCREMENT,
    laudo_data_entrada TIMESTAMP DEFAULT (datetime('now','localtime')) NOT NULL, 
    laudo_material VARCHAR(100),
    laudo_data_coleta DATE,
    laudo_amostras INTEGER,
    laudo_controle INTEGER,
    laudo_obs TEXT DEFAULT (''),
    aspecto_id INTEGER,
    resultado_id INTEGER,
    paciente_id INTEGER NOT NULL,
    FOREIGN KEY(paciente_id) REFERENCES pacientes(paciente_id)
)
`;

const INSERT_TESTE_LAUDOS = [
    `INSERT INTO laudos (laudo_data_coleta, laudo_controle, paciente_id)
        SELECT '${data.getFullYear()}-${zfill(data.getMonth() + 1, 2)}-${zfill(data.getDate(), 2)} ${data.getHours()}:${data.getMinutes()}:${data.getSeconds()}', '1', '1' WHERE NOT EXISTS (SELECT * FROM laudos WHERE laudo_id = '1')`,

    `INSERT INTO laudos (laudo_data_coleta, laudo_controle, paciente_id) 
        SELECT '${data.getFullYear()}-${zfill(data.getMonth() + 1, 2)}-${zfill(data.getDate(), 2)} ${data.getHours()}:${data.getMinutes()}:${data.getSeconds()}', '1', '1' WHERE NOT EXISTS (SELECT * FROM laudos WHERE laudo_id = '2')`,

    `INSERT INTO laudos (laudo_data_coleta, laudo_controle, paciente_id) 
        SELECT '${data.getFullYear()}-${zfill(data.getMonth() + 1, 2)}-${zfill(data.getDate(), 2)} ${data.getHours()}:${data.getMinutes()}:${data.getSeconds()}', '1', '1' WHERE NOT EXISTS (SELECT * FROM laudos WHERE laudo_id = '3')`,

    `INSERT INTO laudos (laudo_data_coleta, laudo_controle, paciente_id) 
        SELECT '${data.getFullYear()}-${zfill(data.getMonth() + 1, 2)}-${zfill(data.getDate(), 2)} ${data.getHours()}:${data.getMinutes()}:${data.getSeconds()}', '1', '3' WHERE NOT EXISTS (SELECT * FROM laudos WHERE laudo_id = '4')`,

    `INSERT INTO laudos (laudo_data_coleta, laudo_controle, paciente_id) 
        SELECT '${data.getFullYear()}-${zfill(data.getMonth() + 1, 2)}-${zfill(data.getDate(), 2)} ${data.getHours()}:${data.getMinutes()}:${data.getSeconds()}', '1', '2' WHERE NOT EXISTS (SELECT * FROM laudos WHERE laudo_id = '5')`
];

const ASPECTOS_SCHEMA = `
CREATE TABLE IF NOT EXISTS aspectos (
    aspectos_id INTEGER PRIMARY KEY AUTOINCREMENT, 
    aspecto VARCHAR(100) NOT NULL,
    unique(aspecto)
)
`;

const INSERT_DEFAULT_ASPECTOS = [
    `
INSERT INTO aspectos (aspecto) 
    SELECT 'MUCOPURULENTO' WHERE NOT EXISTS (SELECT * FROM aspectos WHERE aspecto = 'MUCOPURULENTO')
`,
    `
INSERT INTO aspectos (aspecto)
    SELECT 'PURULENTO' WHERE NOT EXISTS (SELECT * FROM aspectos WHERE aspecto = 'PURULENTO')
`,
    `
INSERT INTO aspectos (aspecto)
    SELECT 'SANGUINOLENTO' WHERE NOT EXISTS (SELECT * FROM aspectos WHERE aspecto = 'SANGUINOLENTO')
`,
    `
INSERT INTO aspectos (aspecto)
    SELECT 'SALIVA' WHERE NOT EXISTS (SELECT * FROM aspectos WHERE aspecto = 'SALIVA')
`,
    `
INSERT INTO aspectos (aspecto)
    SELECT 'LIQUEFEITO' WHERE NOT EXISTS (SELECT * FROM aspectos WHERE aspecto = 'LIQUEFEITO')
`,

];

const RESULTADOS_SCHEMA = `
CREATE TABLE IF NOT EXISTS resultados (
    resultado_id INTEGER PRIMARY KEY AUTOINCREMENT, 
    resultado VARCHAR(100) NOT NULL
)
`;

const INSERT_DEFAULT_RESULTADOS = [
    `
INSERT INTO resultados (resultado) 
    SELECT 'NEGATIVA' WHERE NOT EXISTS (SELECT * FROM resultados WHERE resultado = 'NEGATIVA')
`,
    `
INSERT INTO resultados (resultado)
    SELECT 'POSITIVA DE 1 A 9 BAAR' WHERE NOT EXISTS (SELECT * FROM resultados WHERE resultado = 'POSITIVA DE 1 A 9 BAAR')
`,
    `
INSERT INTO resultados (resultado) 
    SELECT 'POSITIVA(+)' WHERE NOT EXISTS (SELECT * FROM resultados WHERE resultado = 'POSITIVA(+)')
`,
    `
INSERT INTO resultados (resultado) 
    SELECT 'POSITIVA(++)' WHERE NOT EXISTS (SELECT * FROM resultados WHERE resultado = 'POSITIVA(++)')
`,
    `
INSERT INTO resultados (resultado)
    SELECT 'POSITIVA(+++)' WHERE NOT EXISTS (SELECT * FROM resultados WHERE resultado = 'POSITIVA(+++)')
`
];

db.serialize(() => {
    db.run("PRAGMA foreign_keys=ON");
    db.run(USUARIOS_SCHEMA);
    db.run(PACIENTES_SCHEMA);
    db.run(LAUDOS_SCHEMA);
    db.run(ASPECTOS_SCHEMA);
    db.run(RESULTADOS_SCHEMA);
    INSERT_DEFAULT_ASPECTOS
        .forEach(inserir => db.run(inserir));
    INSERT_DEFAULT_RESULTADOS
        .forEach(inserir => db.run(inserir));
    db.run(INSERT_DEFAULT_USUARIO, [sha256.x2('admin')]);

    INSERT_TESTE_PACIENTES.forEach(inserir => db.run(inserir));
    INSERT_TESTE_LAUDOS.forEach(inserir => db.run(inserir));
    //db.each("SELECT * FROM aspectos", (err, aspectos) => console.log(aspectos));


    //db.each("SELECT * FROM resultados", (err, resultado) => console.log(resultado));

    //db.each("SELECT * FROM usuarios", (err, resultado) => console.log(resultado));

    //db.each("SELECT paciente_nome FROM pacientes", (err, resultado) => console.log(resultado));
    //db.each("SELECT paciente_id FROM laudos", (err, resultado) => console.log(resultado));

    //db.each("SELECT l.laudo_id, l.laudo_data_entrada, p.paciente_nome, l.laudo_material, l.laudo_controle FROM laudos l INNER JOIN pacientes p ON p.paciente_id = l.paciente_id", (err, resultado) => console.log(resultado));
});

process.on('SIGINT', () =>
    db.close(() => {
        console.log('Database closed');
        process.exit(0);
    })
);

module.exports = db;
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
    paciente_cns VARCHAR(15),
    paciente_nome VARCHAR(250) NOT NULL,
    paciente_data_nascimento DATE NOT NULL,
    paciente_sexo CHAR DEFAULT ('F') NOT NULL,
    paciente_email VARCHAR(100),
    paciente_telefone VARCHAR(11),
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

/*
const data = new Date();

const INSERT_TESTE_PACIENTES = [
    `INSERT INTO pacientes (paciente_cns, paciente_nome, paciente_data_nascimento) SELECT '111111111111111', 'Seila quem', '${data.getFullYear()}-${zfill(data.getMonth() + 1, 2)}-${zfill(data.getDate(), 2)}' WHERE NOT EXISTS (SELECT * FROM pacientes WHERE paciente_cns = '111111111111111')`,
    `INSERT INTO pacientes (paciente_cns, paciente_nome, paciente_data_nascimento, paciente_sexo) SELECT '222222222222222', 'João alguem', '${data.getFullYear()}-${zfill(data.getMonth() + 1, 2)}-${zfill(data.getDate(), 2)}', 'M' WHERE NOT EXISTS (SELECT * FROM pacientes WHERE paciente_cns = '222222222222222')`,
    `INSERT INTO pacientes (paciente_cns, paciente_nome, paciente_data_nascimento, paciente_sexo) SELECT '333333333333333', 'Super teste', '${data.getFullYear()}-${zfill(data.getMonth() + 1, 2)}-${zfill(data.getDate(), 2)}', 'M' WHERE NOT EXISTS (SELECT * FROM pacientes WHERE paciente_cns = '333333333333333')`,
    `INSERT INTO pacientes (paciente_cns, paciente_nome, paciente_data_nascimento) SELECT '444444444444444', 'Maria sem nome', '${data.getFullYear()}-${zfill(data.getMonth() + 1, 2)}-${zfill(data.getDate(), 2)}' WHERE NOT EXISTS (SELECT * FROM pacientes WHERE paciente_cns = '444444444444444')`,
    `INSERT INTO pacientes (paciente_cns, paciente_nome, paciente_data_nascimento, paciente_sexo) SELECT '555555555555555', 'Goku', '${data.getFullYear()}-${zfill(data.getMonth() + 1, 2)}-${zfill(data.getDate(), 2)}', 'M' WHERE NOT EXISTS (SELECT * FROM pacientes WHERE paciente_cns = '555555555555555')`,
    `INSERT INTO pacientes (paciente_cns, paciente_nome, paciente_data_nascimento, paciente_sexo) SELECT '666666666666666', 'Vegeta', '${data.getFullYear()}-${zfill(data.getMonth() + 1, 2)}-${zfill(data.getDate(), 2)}', 'M' WHERE NOT EXISTS (SELECT * FROM pacientes WHERE paciente_cns = '666666666666666')`
];
*/

const LAUDOS_SCHEMA = `
CREATE TABLE IF NOT EXISTS laudos (
    laudo_id INTEGER PRIMARY KEY AUTOINCREMENT,
    laudo_data_entrada TIMESTAMP DEFAULT (datetime('now','localtime')) NOT NULL,
    laudo_numero_geral INTEGER,
    laudo_data_coleta DATE,
    laudo_tipo VARCHAR(50) NOT NULL,
    laudo_amostras INTEGER NOT NULL,
    laudo_obs TEXT DEFAULT (''),
    material_id INTEGER,
    unidade_id INTEGER,
    aspecto_id INTEGER,
    resultado_id INTEGER,
    paciente_id INTEGER NOT NULL,
    FOREIGN KEY(paciente_id) REFERENCES pacientes(paciente_id)
)
`;

const TIPO_AMOSTRA_SCHEMA = `
CREATE TABLE IF NOT EXISTS tipo_amostra (
    tipo_amostra_id INTEGER PRIMARY KEY AUTOINCREMENT, 
    amostra VARCHAR(100) NOT NULL,
    unique(amostra)
)
`;

const INSERT_DEFAULT_TIPO_AMOSTRA = [
    `
INSERT INTO tipo_amostra (amostra) 
    SELECT "DIAGNÓSTICO" WHERE NOT EXISTS (SELECT * FROM tipo_amostra WHERE amostra = "DIAGNÓSTICO")
`,
    `
INSERT INTO tipo_amostra (amostra) 
    SELECT "CONTROLE DE TRATAMENTO" WHERE NOT EXISTS (SELECT * FROM tipo_amostra WHERE amostra = "CONTROLE DE TRATAMENTO")
`,
];

const MATERIAIS_SCHEMA = `
CREATE TABLE IF NOT EXISTS materiais (
    material_id INTEGER PRIMARY KEY AUTOINCREMENT, 
    material VARCHAR(100) NOT NULL,
    unique(material)
)
`;

const INSERT_DEFAULT_MATERIAIS = [
    `
INSERT INTO materiais (material) 
    SELECT 'ESCARRO' WHERE NOT EXISTS (SELECT * FROM materiais WHERE material = 'ESCARRO')
`
];

const UNIDADES_SCHEMA = `
CREATE TABLE IF NOT EXISTS unidades (
    unidade_id INTEGER PRIMARY KEY AUTOINCREMENT, 
    unidade VARCHAR(100) NOT NULL,
    cnes VARCHAR(30),
    unique(unidade)
)
`;

const INSERT_DEFAULT_UNIDADES = [
    `INSERT INTO unidades (unidade, cnes) SELECT 'SAE SERVICO DE ASSISTENCIA ESPECIALIZADA M I ITAPEVA	
    ', '6644813' WHERE NOT EXISTS (SELECT * FROM unidades WHERE unidade = 'SAE SERVICO DE ASSISTENCIA ESPECIALIZADA M I ITAPEVA	
    ' AND cnes = '6644813')`,
    `INSERT INTO unidades (unidade, cnes) SELECT 'CENTRO DE REFERENCIA EM SAUDE DO TRABALHADOR DE ITAPEVA
    ', '6197353' WHERE NOT EXISTS (SELECT * FROM unidades WHERE unidade = 'CENTRO DE REFERENCIA EM SAUDE DO TRABALHADOR DE ITAPEVA
    ' AND cnes = '6197353')`,
    `INSERT INTO unidades (unidade, cnes) SELECT 'CENTRO DE DIAGNOSTICO DE ITAPEVA CDI	
    ', '2048876' WHERE NOT EXISTS (SELECT * FROM unidades WHERE unidade = 'CENTRO DE DIAGNOSTICO DE ITAPEVA CDI	
    ' AND cnes = '2048876')`,
    `INSERT INTO unidades (unidade, cnes) SELECT 'CASA DO ADOLESCENTE
    ', '6824625' WHERE NOT EXISTS (SELECT * FROM unidades WHERE unidade = 'CASA DO ADOLESCENTE
    ' AND cnes = '6824625')`,
    `INSERT INTO unidades (unidade, cnes) SELECT 'HOSPITAL DIA SANTA RITA	
    ', '6971199' WHERE NOT EXISTS (SELECT * FROM unidades WHERE unidade = 'HOSPITAL DIA SANTA RITA	
    ' AND cnes = '6971199')`,
    `INSERT INTO unidades (unidade, cnes) SELECT 'UNIDADE DE SAUDE PACOVA	
    ', '2048833' WHERE NOT EXISTS (SELECT * FROM unidades WHERE unidade = 'UNIDADE DE SAUDE PACOVA	
    ' AND cnes = '2048833')`,
    `INSERT INTO unidades (unidade, cnes) SELECT 'UNIDADE PSF VILA SAO BENEDITO ITAPEVA	
    ', '2096390' WHERE NOT EXISTS (SELECT * FROM unidades WHERE unidade = 'UNIDADE PSF VILA SAO BENEDITO ITAPEVA	
    ' AND cnes = '2096390')`,
    `INSERT INTO unidades (unidade, cnes) SELECT 'UNIDADE PSF VILA SAO MIGUEL ITAPEVA	
    ', '2053071' WHERE NOT EXISTS (SELECT * FROM unidades WHERE unidade = 'UNIDADE PSF VILA SAO MIGUEL ITAPEVA	
    ' AND cnes = '2053071')`,
    `INSERT INTO unidades (unidade, cnes) SELECT 'UNIDADE PSF ALTO DA BRANCAL ITAPEVA	
    ', '2058219' WHERE NOT EXISTS (SELECT * FROM unidades WHERE unidade = 'UNIDADE PSF ALTO DA BRANCAL ITAPEVA	
    ' AND cnes = '2058219')`,
    `INSERT INTO unidades (unidade, cnes) SELECT 'UNIDADE PSF GUARIZINHO JAO	
    ', '2047446' WHERE NOT EXISTS (SELECT * FROM unidades WHERE unidade = 'UNIDADE PSF GUARIZINHO JAO	
    ' AND cnes = '2047446')`,
    `INSERT INTO unidades (unidade, cnes) SELECT 'UNIDADE PSF JARDIM IMPERADOR ITAPEVA	
    ', '2059134' WHERE NOT EXISTS (SELECT * FROM unidades WHERE unidade = 'UNIDADE PSF JARDIM IMPERADOR ITAPEVA	
    ' AND cnes = '2059134')`,
    `INSERT INTO unidades (unidade, cnes) SELECT 'UBS JARDIM MARINGA ITAPEVA
    ', '2034301' WHERE NOT EXISTS (SELECT * FROM unidades WHERE unidade = 'UBS JARDIM MARINGA ITAPEVA
    ' AND cnes = '2034301')`,
    `INSERT INTO unidades (unidade, cnes) SELECT 'EACS AGROVILAS ITAPEVA	
    ', '2051273' WHERE NOT EXISTS (SELECT * FROM unidades WHERE unidade = 'EACS AGROVILAS ITAPEVA	
    ' AND cnes = '2051273')`,
    `INSERT INTO unidades (unidade, cnes) SELECT 'UNIDADE PSF JARDIM GRAJAU ITAPEVA	
    ', '2027216' WHERE NOT EXISTS (SELECT * FROM unidades WHERE unidade = 'UNIDADE PSF JARDIM GRAJAU ITAPEVA	
    ' AND cnes = '2027216')`,
    `INSERT INTO unidades (unidade, cnes) SELECT 'AMBULATORIO MUNICIPAL MATERNO INFANTIL ITAPEVA	
    ', '2027151' WHERE NOT EXISTS (SELECT * FROM unidades WHERE unidade = 'AMBULATORIO MUNICIPAL MATERNO INFANTIL ITAPEVA	
    ' AND cnes = '2027151')`,
    `INSERT INTO unidades (unidade, cnes) SELECT 'UBS CSI ITAPEVA	
    ', '2059142' WHERE NOT EXISTS (SELECT * FROM unidades WHERE unidade = 'UBS CSI ITAPEVA	
    ' AND cnes = '2059142')`,
    `INSERT INTO unidades (unidade, cnes) SELECT 'UBS VILA SANTA MARIA ITAPEVA
    ', '2048884' WHERE NOT EXISTS (SELECT * FROM unidades WHERE unidade = 'UBS VILA SANTA MARIA ITAPEVA
    ' AND cnes = '2048884')`,
    `INSERT INTO unidades (unidade, cnes) SELECT 'UNIDADE DE SAUDE CAPUTERA AMARELA VELHA
    ', '6985890' WHERE NOT EXISTS (SELECT * FROM unidades WHERE unidade = 'UNIDADE DE SAUDE CAPUTERA AMARELA VELHA
    ' AND cnes = '6985890')`,
    `INSERT INTO unidades (unidade, cnes) SELECT 'UNIDADE PSF VILA DOM BOSCO CIMENTOLANDIA ITAPEVA	
    ', '2056259' WHERE NOT EXISTS (SELECT * FROM unidades WHERE unidade = 'UNIDADE PSF VILA DOM BOSCO CIMENTOLANDIA ITAPEVA	
    ' AND cnes = '2056259')`,
    `INSERT INTO unidades (unidade, cnes) SELECT 'UNIDADE PSF VILA SAO CAMILO ITAPEVA	
    ', '2048493' WHERE NOT EXISTS (SELECT * FROM unidades WHERE unidade = 'UNIDADE PSF VILA SAO CAMILO ITAPEVA	
    ' AND cnes = '2048493')`,
    `INSERT INTO unidades (unidade, cnes) SELECT 'UNIDADE PSF VILA TAQUARI ITAPEVA	
    ', '2065436' WHERE NOT EXISTS (SELECT * FROM unidades WHERE unidade = 'UNIDADE PSF VILA TAQUARI ITAPEVA	
    ' AND cnes = '2065436')`,
    `INSERT INTO unidades (unidade, cnes) SELECT 'UBS VILA APARECIDA ITAPEVA	
    ', '2070995' WHERE NOT EXISTS (SELECT * FROM unidades WHERE unidade = 'UBS VILA APARECIDA ITAPEVA	
    ' AND cnes = '2070995')`,
    `INSERT INTO unidades (unidade, cnes) SELECT 'UBS PARQUE SAO JORGE ITAPEVA	
    ', '2051559' WHERE NOT EXISTS (SELECT * FROM unidades WHERE unidade = 'UBS PARQUE SAO JORGE ITAPEVA	
    ' AND cnes = '2051559')`,
    `INSERT INTO unidades (unidade, cnes) SELECT 'UNIDADE PSF JARDIM BELA VISTA ITAPEVA	
    ', '2070979' WHERE NOT EXISTS (SELECT * FROM unidades WHERE unidade = 'UNIDADE PSF JARDIM BELA VISTA ITAPEVA	
    ' AND cnes = '2070979')`,
    `INSERT INTO unidades (unidade, cnes) SELECT 'UNIDADE PSF VILA BOM JESUS ITAPEVA	
    ', '2027143' WHERE NOT EXISTS (SELECT * FROM unidades WHERE unidade = 'UNIDADE PSF VILA BOM JESUS ITAPEVA	
    ' AND cnes = '2027143')`,
    `INSERT INTO unidades (unidade, cnes) SELECT 'UNIDADE DE SAUDE SAO ROQUE AREIA BRANCA
    ', '7323859' WHERE NOT EXISTS (SELECT * FROM unidades WHERE unidade = 'UNIDADE DE SAUDE SAO ROQUE AREIA BRANCA
    ' AND cnes = '7323859')`,
    `INSERT INTO unidades (unidade, cnes) SELECT 'CAPS II ITAPEVA SAO PAULO
    ', '5859433' WHERE NOT EXISTS (SELECT * FROM unidades WHERE unidade = 'CAPS II ITAPEVA SAO PAULO
    ' AND cnes = '5859433')`,
    `INSERT INTO unidades (unidade, cnes) SELECT 'UNIDADE DE PRONTO ATENDIMENTO UPA PORTE 1
    ', '7278438' WHERE NOT EXISTS (SELECT * FROM unidades WHERE unidade = 'UNIDADE DE PRONTO ATENDIMENTO UPA PORTE 1
    ' AND cnes = '7278438')`,
    `INSERT INTO unidades (unidade, cnes) SELECT 'UNIDADE PSF JARDIM VIRGINIA ITAPEVA	
    ', '2027208' WHERE NOT EXISTS (SELECT * FROM unidades WHERE unidade = 'UNIDADE PSF JARDIM VIRGINIA ITAPEVA	
    ' AND cnes = '2027208')`,
    `INSERT INTO unidades (unidade, cnes) SELECT 'UNIDADE PSF VILA MARIANA ITAPEVA	
    ', '2045443' WHERE NOT EXISTS (SELECT * FROM unidades WHERE unidade = 'UNIDADE PSF VILA MARIANA ITAPEVA	
    ' AND cnes = '2045443')`,
    `INSERT INTO unidades (unidade, cnes) SELECT 'UNIDADE PSF VILA CAMARGO ITAPEVA	
    ', '2027178' WHERE NOT EXISTS (SELECT * FROM unidades WHERE unidade = 'UNIDADE PSF VILA CAMARGO ITAPEVA	
    ' AND cnes = '2027178')`,
    `INSERT INTO unidades (unidade, cnes) SELECT 'CENTRO DE REFERENCIA DO IDOSO
    ', '7832753' WHERE NOT EXISTS (SELECT * FROM unidades WHERE unidade = 'CENTRO DE REFERENCIA DO IDOSO
    ' AND cnes = '7832753')`,
    `INSERT INTO unidades (unidade, cnes) SELECT 'UBS RESIDENCIAL MORADA DO BOSQUE
    ', '9634827' WHERE NOT EXISTS (SELECT * FROM unidades WHERE unidade = 'UBS RESIDENCIAL MORADA DO BOSQUE
    ' AND cnes = '9634827')`,
    `INSERT INTO unidades (unidade, cnes) SELECT 'BOM SUCESSO DE ITARARÉ
    ', '' WHERE NOT EXISTS (SELECT * FROM unidades WHERE unidade = 'BOM SUCESSO DE ITARARÉ
    ' AND cnes = '')`,
    `INSERT INTO unidades (unidade, cnes) SELECT 'BURI
    ', '' WHERE NOT EXISTS (SELECT * FROM unidades WHERE unidade = 'BURI
    ' AND cnes = '')`,
    `INSERT INTO unidades (unidade, cnes) SELECT 'ITABERÁ
    ', '' WHERE NOT EXISTS (SELECT * FROM unidades WHERE unidade = 'ITABERÁ
    ' AND cnes = '')`,
    `INSERT INTO unidades (unidade, cnes) SELECT 'ITARARÈ
    ', '' WHERE NOT EXISTS (SELECT * FROM unidades WHERE unidade = 'ITARARÈ
    ' AND cnes = '')`,
    `INSERT INTO unidades (unidade, cnes) SELECT 'NOVA CAMPINA
    ', '' WHERE NOT EXISTS (SELECT * FROM unidades WHERE unidade = 'NOVA CAMPINA
    ' AND cnes = '')`,
    `INSERT INTO unidades (unidade, cnes) SELECT 'RIBEIRÃO BRANCO
    ', '' WHERE NOT EXISTS (SELECT * FROM unidades WHERE unidade = 'RIBEIRÃO BRANCO
    ' AND cnes = '')`,
    `INSERT INTO unidades (unidade, cnes) SELECT 'RIVERSUL
    ', '' WHERE NOT EXISTS (SELECT * FROM unidades WHERE unidade = 'RIVERSUL
    ' AND cnes = '')`,
    `INSERT INTO unidades (unidade, cnes) SELECT 'TAQUARIVAÍ', '' WHERE NOT EXISTS (SELECT * FROM unidades WHERE unidade = 'TAQUARIVAÍ' AND cnes = '')`
];

/*
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
        SELECT '${data.getFullYear()}-${zfill(data.getMonth() + 1, 2)}-${zfill(data.getDate(), 2)} ${data.getHours()}:${data.getMinutes()}:${data.getSeconds()}', '1', '2' WHERE NOT EXISTS (SELECT * FROM laudos WHERE laudo_id = '6')`,

    `INSERT INTO laudos (laudo_data_coleta, laudo_controle, paciente_id) 
        SELECT '${data.getFullYear()}-${zfill(data.getMonth() + 1, 2)}-${zfill(data.getDate(), 2)} ${data.getHours()}:${data.getMinutes()}:${data.getSeconds()}', '1', '2' WHERE NOT EXISTS (SELECT * FROM laudos WHERE laudo_id = '7')`,

    `INSERT INTO laudos (laudo_data_coleta, laudo_controle, paciente_id) 
        SELECT '${data.getFullYear()}-${zfill(data.getMonth() + 1, 2)}-${zfill(data.getDate(), 2)} ${data.getHours()}:${data.getMinutes()}:${data.getSeconds()}', '1', '2' WHERE NOT EXISTS (SELECT * FROM laudos WHERE laudo_id = '8')`,

    `INSERT INTO laudos (laudo_data_coleta, laudo_controle, paciente_id) 
        SELECT '${data.getFullYear()}-${zfill(data.getMonth() + 1, 2)}-${zfill(data.getDate(), 2)} ${data.getHours()}:${data.getMinutes()}:${data.getSeconds()}', '1', '2' WHERE NOT EXISTS (SELECT * FROM laudos WHERE laudo_id = '9')`,

    `INSERT INTO laudos (laudo_data_coleta, laudo_controle, paciente_id) 
        SELECT '${data.getFullYear()}-${zfill(data.getMonth() + 1, 2)}-${zfill(data.getDate(), 2)} ${data.getHours()}:${data.getMinutes()}:${data.getSeconds()}', '1', '2' WHERE NOT EXISTS (SELECT * FROM laudos WHERE laudo_id = '10')`,

    `INSERT INTO laudos (laudo_data_coleta, laudo_controle, paciente_id) 
        SELECT '${data.getFullYear()}-${zfill(data.getMonth() + 1, 2)}-${zfill(data.getDate(), 2)} ${data.getHours()}:${data.getMinutes()}:${data.getSeconds()}', '1', '2' WHERE NOT EXISTS (SELECT * FROM laudos WHERE laudo_id = '11')`,

    `INSERT INTO laudos (laudo_data_coleta, laudo_controle, paciente_id) 
        SELECT '${data.getFullYear()}-${zfill(data.getMonth() + 1, 2)}-${zfill(data.getDate(), 2)} ${data.getHours()}:${data.getMinutes()}:${data.getSeconds()}', '1', '2' WHERE NOT EXISTS (SELECT * FROM laudos WHERE laudo_id = '12')`,

    `INSERT INTO laudos (laudo_data_coleta, laudo_controle, paciente_id) 
        SELECT '${data.getFullYear()}-${zfill(data.getMonth() + 1, 2)}-${zfill(data.getDate(), 2)} ${data.getHours()}:${data.getMinutes()}:${data.getSeconds()}', '1', '2' WHERE NOT EXISTS (SELECT * FROM laudos WHERE laudo_id = '13')`,

    `INSERT INTO laudos (laudo_data_coleta, laudo_controle, paciente_id) 
        SELECT '${data.getFullYear()}-${zfill(data.getMonth() + 1, 2)}-${zfill(data.getDate(), 2)} ${data.getHours()}:${data.getMinutes()}:${data.getSeconds()}', '1', '2' WHERE NOT EXISTS (SELECT * FROM laudos WHERE laudo_id = '14')`,
        
    `INSERT INTO laudos (laudo_data_coleta, laudo_controle, paciente_id) 
        SELECT '${data.getFullYear()}-${zfill(data.getMonth() + 1, 2)}-${zfill(data.getDate(), 2)} ${data.getHours()}:${data.getMinutes()}:${data.getSeconds()}', '1', '2' WHERE NOT EXISTS (SELECT * FROM laudos WHERE laudo_id = '15')`,

    `INSERT INTO laudos (laudo_data_coleta, laudo_controle, paciente_id) 
        SELECT '${data.getFullYear()}-${zfill(data.getMonth() + 1, 2)}-${zfill(data.getDate(), 2)} ${data.getHours()}:${data.getMinutes()}:${data.getSeconds()}', '1', '2' WHERE NOT EXISTS (SELECT * FROM laudos WHERE laudo_id = '16')`,

    `INSERT INTO laudos (laudo_data_coleta, laudo_controle, paciente_id) 
        SELECT '${data.getFullYear()}-${zfill(data.getMonth() + 1, 2)}-${zfill(data.getDate(), 2)} ${data.getHours()}:${data.getMinutes()}:${data.getSeconds()}', '1', '2' WHERE NOT EXISTS (SELECT * FROM laudos WHERE laudo_id = '17')`,

    `INSERT INTO laudos (laudo_data_coleta, laudo_controle, paciente_id) 
        SELECT '${data.getFullYear()}-${zfill(data.getMonth() + 1, 2)}-${zfill(data.getDate(), 2)} ${data.getHours()}:${data.getMinutes()}:${data.getSeconds()}', '1', '2' WHERE NOT EXISTS (SELECT * FROM laudos WHERE laudo_id = '18')`
];
*/

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

async function run() {
    db.run("PRAGMA foreign_keys=ON");
    db.run(USUARIOS_SCHEMA);
    db.run(PACIENTES_SCHEMA);
    db.run(LAUDOS_SCHEMA);
    db.run(ASPECTOS_SCHEMA);
    db.run(RESULTADOS_SCHEMA);
    db.run(MATERIAIS_SCHEMA);
    db.run(UNIDADES_SCHEMA);

    INSERT_DEFAULT_ASPECTOS
        .forEach(inserir => db.run(inserir));
    INSERT_DEFAULT_MATERIAIS
        .forEach(inserir => db.run(inserir));
    INSERT_DEFAULT_RESULTADOS
        .forEach(inserir => db.run(inserir));
    /*INSERT_DEFAULT_UNIDADES
        .forEach(inserir => db.run(inserir));*/

    db.run(INSERT_DEFAULT_USUARIO, [sha256.x2('admin')]);

    const UPDATES = await updateUnidades();

    UPDATES
        .forEach(update => db.run(update));

    /*INSERT_TESTE_PACIENTES.forEach(inserir => db.run(inserir));
    INSERT_TESTE_LAUDOS.forEach(inserir => db.run(inserir));*/
    //db.each("SELECT * FROM aspectos", (err, aspectos) => console.log(aspectos));


    //db.each("SELECT * FROM resultados", (err, resultado) => console.log(resultado));

    //db.each("SELECT * FROM usuarios", (err, resultado) => console.log(resultado));

    //db.each("SELECT paciente_nome FROM pacientes", (err, resultado) => console.log(resultado));
    //db.each("SELECT paciente_id FROM laudos", (err, resultado) => console.log(resultado));

    //db.each("SELECT l.laudo_id, l.laudo_data_entrada, p.paciente_nome, l.laudo_material, l.laudo_controle FROM laudos l INNER JOIN pacientes p ON p.paciente_id = l.paciente_id", (err, resultado) => console.log(resultado));
}

db.serialize(() => {
    run();
});

process.on('SIGINT', () =>
    db.close(() => {
        console.log('Database closed');
        process.exit(0);
    })
);

async function updateUnidades() {
    unidades = await new Promise((resolve, reject) => db.all('SELECT * FROM unidades', (err, rows) => resolve(rows)));
    let novo = '';
    let resposta = [];

    for (unidade of unidades) {
        novo = unidade.unidade.trimRight().replace('\t', '').replace('\n', '').replace('\n\t', '');
        resposta.push(`UPDATE unidades SET unidade='${novo}' WHERE unidade_id='${unidade.unidade_id}'`);
    }

    return resposta;
}

module.exports = db;
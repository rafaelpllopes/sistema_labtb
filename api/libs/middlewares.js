const bodyParser = require("body-parser");
const cors = require("cors");
const compression = require("compression");
const helmet = require("helmet");
const db = require('./database');
const usuarios = require('../routes/usuarios');
const laudos = require('../routes/laudos');
const pacientes = require('../routes/pacientes');
const resultados = require('../routes/resultados');
const reports = require('../routes/reports');
const aspectos = require('../routes/aspectos');
const materiais = require('../routes/materiais');
const unidades = require('../routes/unidades');
const index = require('../routes/index');
const fs = require('fs');
const sha256 = require('sha256');

module.exports = app => {
    const secret = fs.readFileSync("secret.txt", "utf8");
    app.set('secret', sha256(secret));
    
    const corsOptions = {
        origin: '*',
        methods: ["GET", "POST", "PUT", "DELETE"],
        exposedHeaders: ['x-access-token']
    };

    app.set('port', 3000);
    app.set('json spaces', 4);
    app.use(cors(corsOptions));

    app.use((req, res, next) => {
        req.db = db;
        next();
    });

    app.use(compression());
    app.use(helmet());
    app.use(bodyParser.json());

    app.use((req, res, next) => {
        const token = req.headers['x-access-token'];
        /*console.log('####################################');
        if (token) {
            console.log('A token is send by the application');
            console.log('Token value is ' + token);
        } else {
            console.log('No token is send by the the application');
        }
        console.log('####################################');*/
        next();
    });

    index(app);
    usuarios(app);
    laudos(app);
    pacientes(app);
    resultados(app);
    aspectos(app);
    materiais(app);
    unidades(app);
    reports(app);

    app.use('*', (req, res) => {
        res.status(404).json({ msg: `rota ${req.originalUrl} não existe!` });
    });

    app.use((err, req, res, next) => {
        console.error(err.stack);
        res.status(500).json({ msg: 'Internal server error' });
    });
};
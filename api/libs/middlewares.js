const bodyParser = require("body-parser");
const cors = require("cors");
const compression = require("compression");
const helmet = require("helmet");
const db = require('./database');

module.exports = app => {
    app.set('port', 3000);
    app.set('json spaces', 4);
    app.use(cors({
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"]
    }));
    app.use((req, res, next) => {
        req.db = db;
        next();
    });
    app.use(compression());
    app.use(helmet());
    app.use(bodyParser.json());
};
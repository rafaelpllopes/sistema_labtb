const bodyParser = require("body-parser");
const cors = require("cors");
const compression = require("compression");
const helmet = require("helmet");
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
};
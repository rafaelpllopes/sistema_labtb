const express = require('express');
const consign = require('consign');
const fs = require('fs');
const https = require('https');

const app = express();

consign({verbose: false})
    .include('libs/middlewares.js')
    .then('routes')
    .into(app);

/*const credenciais = {
    key: fs.readFileSync("labtb.key", "utf8"),
    cert: fs.readFileSync("labtb.cert", "utf8")
};*/

/*https.createServer(credenciais, app)
    .listen(app.get('port'), () =>
        console.log(`API rodando na porta ${app.get('port')}`));*/

app.listen(app.get('port'), () =>
    console.log(`API rodando na porta ${app.get('port')}`));

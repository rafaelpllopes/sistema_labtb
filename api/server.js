const express = require('express');
const consign = require('consign');
const fs = require('fs');
const https = require('https');
const app = express();
process.title = 'labtab';

app.use(express.static(__dirname + '/public'));

consign({ verbose: false })
    .then('config/middlewares.js')
    .include('routes')
    .into(app);

app.use('*', (req, res) => {
    res.status(404).json({ msg: `rota ${req.originalUrl} não existe!` });
})

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ msg: 'Internal server error' });
})

if (process.env.NODE_ENV !== 'test') {
    const credenciais = {
        key: fs.readFileSync("labtb.key", "utf8"),
        cert: fs.readFileSync("labtb.cert", "utf8")
    }

    https.createServer(credenciais, app)
        .listen(app.get('port'), () =>
            console.log(`API rodando na porta ${app.get('port')}`))
} else {
    app.listen(app.get('port'), () =>
        console.log(`API rodando na porta ${app.get('port')}`))
}

module.exports = app
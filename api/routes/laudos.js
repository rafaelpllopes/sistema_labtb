module.exports = app => {
    app.route('/laudos')
        .get((req, res) => res.json({
            data: new Date(),
            nome_paciente: 'teste'
        }));
};
module.exports = app => {
    app.get('/',(req, res) => res.json({staus: "API Funcionando"}));
};
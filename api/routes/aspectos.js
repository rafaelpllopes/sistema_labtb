const aspectosDao = require('../models/aspectos-dao');

module.exports = app => {
    app.route('/aspectos')
        .get(async (req, res) => {
            const aspectos = await new aspectosDao(req.db).getAspectos();
            res.json(aspectos);
        });
};
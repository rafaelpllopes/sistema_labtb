const aspectosDao = require('../models/aspectos-dao');
const wrapAsync = require('../libs/async-wrap');
const auth = require('../libs/auth');

module.exports = app => {
    app.route('/aspectos')
        .get(auth, wrapAsync(async (req, res) => {
            const aspectos = await new aspectosDao(req.db).getAspectos();
            res.json(aspectos);
        }));
};
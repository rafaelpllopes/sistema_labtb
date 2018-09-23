const usuariosDao = require('../models/usuarios-dao');

module.exports = app => {
    app.post('/usuarios',
        (async (req, res) => {
            let user = req.body.user_name;
            let password = req.body.user_password;
            if (user && password) {
                const usuarios = await new usuariosDao(req.db).findUsuarioAndPassword(user, password);
                res.status(200).json(usuarios);
            } else {
                res.status(412).json({ msg: "Usuario e senha não podem ser vazio" });
            }
        })
    );

    app.post('/usuarios/existe',
        (async (req, res) => {
            let user = req.body.user_name;
            if (user) {
                const usuarios = await new usuariosDao(req.db).existe(user);
                res.status(200).json(usuarios);
            } else {
                res.status(412).json({msg: "Nome do usuario não pode ser vazio"});
            }
        })
    );


    app.post('/usuarios/add',
        (async (req, res) => {
            let user = req.body.user_name;
            let password = req.body.user_password;
            if (user && password) {
                let existe = await new usuariosDao(req.db).existe(user);
                if (!existe) {
                    await new usuariosDao(req.db).add(user, password);
                    res.sendStatus(201);
                } else {
                    res.status(412).json({ msg: "Usuario não pode ser cadastrado" });
                }
            } else {
                res.status(412).json({ msg: "Usuario e senha são obrigatorios" });
            }

        })
    );

    app.route('/usuarios/:id')
        .put(async (req, res) => {
            let id = req.params.id;
            let password = req.body.user_password;
            if (id && password) {
                await new usuariosDao(req.db).updatePassword(id, password);
                res.sendStatus(202);
            } else {
                res.status(412).json({ msg: "Senha não pode ser vazia" });
            }
        })
        .get(async (req, res) => {
            let usuario = await new usuariosDao(req.db).findUserById(req.params.id);
            res.status(200).json(usuario);
        })
};
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
                res.status(412).json({ msg: "Nome do usuario não pode ser vazio" });
            }
        })
    );


    app.post('/usuario/add',
        (async (req, res) => {
            let user = req.body.user_name;
            let nome = req.body.user_full_name;
            let password = req.body.user_password;
            if (user && password) {
                let existe = await new usuariosDao(req.db).existe(user);
                if (!existe) {
                    await new usuariosDao(req.db).add(user, nome, password);
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
            let nome = req.body.user_full_name;

            if (id && password && nome) {
                await new usuariosDao(req.db).updateUser(id, password, nome);
                res.sendStatus(202);
            } else {
                res.status(412).json({ msg: "Senha não pode ser vazia" });
            }
        })
        .get(async (req, res) => {
            let id = req.params.id;
            if (id) {
                let usuario = await new usuariosDao(req.db).findUserById(req.params.id);
                res.status(200).json(usuario);
            } else {
                res.sendStatus(404);
            }
        })
        .delete(async (req, res) => {
            let id = req.params.id;
            if (id) {
                let usuario = await new usuariosDao(req.db).findUserById(id);
                if (usuario) {
                    if (usuario.user_name !== 'admin') {
                        await new usuariosDao(req.db).deleteUserById(id);
                        res.status(202).json({ msg: "Usuario deletado com sucesso" });
                    } else {
                        res.status(400).json({ msg: "Administrador não pode ser removido" });
                    }
                } else {
                    res.sendStatus(404);

                }
            } else {
                res.sendStatus(404);
            }
        });
};
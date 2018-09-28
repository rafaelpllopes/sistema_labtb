const jwt = require('jsonwebtoken');
const wrapAsync = require('../libs/async-wrap');
const usuariosDao = require('../models/usuarios-dao');

module.exports = app => {
    app.route('/usuario/login')
        .post(wrapAsync(async (req, res) => {
            const user = req.body.user_name;
            const password = req.body.user_password;

            if (user && password) {
                const usuario = await new usuariosDao(req.db).findUsuarioAndPassword(user, password);
                if (usuario) {
                    const token = jwt.sign(usuario, req.app.get('secret'), {
                        expiresIn: 86400
                    });
                    res.set('x-access-token', token);
                    res.status(200).json(usuario);
                } else {
                    res.status(401).json({ msg: `Falha na autenticação para o usuario ${user}` })
                }

            } else {
                res.status(412).json({ msg: "Usuario e senha não podem ser vazio" });
            }
        })
        );

    app.route('/usuarios/:id')
        .put(wrapAsync(async (req, res) => {
            const id = req.params.id;
            const password = req.body.user_password;
            const nome = req.body.user_full_name;

            if (id && password && nome) {
                await new usuariosDao(req.db).updateUser(id, password, nome);
                res.sendStatus(202);
            } else {
                res.status(412).json({ msg: "Senha não pode ser vazia" });
            }
        }))
        .get(wrapAsync(async (req, res) => {
            const id = req.params.id;
            if (id) {
                const usuario = await new usuariosDao(req.db).findUserById(req.params.id);
                res.status(200).json(usuario);
            } else {
                res.sendStatus(404);
            }
        }))
        .delete(wrapAsync(async (req, res) => {
            const id = req.params.id;
            if (id) {
                const usuario = await new usuariosDao(req.db).findUserById(id);
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
        }));
        
    app.route('/usuario/existe')
        .post(wrapAsync((async (req, res) => {
            const user = req.body.user_name;
            if (user) {
                const usuarios = await new usuariosDao(req.db).existe(user);
                res.status(200).json(usuarios);
            } else {
                res.status(412).json({ msg: "Nome do usuario não pode ser vazio" });
            }
        })
        ));

    app.route('/usuarios/add')
        .post(wrapAsync((async (req, res) => {
            const user = req.body.user_name;
            const nome = req.body.user_full_name;
            const password = req.body.user_password;
            if (user && password) {
                const existe = await new usuariosDao(req.db).existe(user);
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
        ));
};
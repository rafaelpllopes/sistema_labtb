const jwt = require('jsonwebtoken');
const usuariosDao = require('../models/usuarios-dao');
const wrapAsync = require('../libs/async-wrap');
const auth = require('../libs/auth');

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
        .put(auth, wrapAsync(async (req, res) => {
            const usuario = req.body.usuario;
            const id = req.params.id;
            const password = usuario.user_password;
            const nome = usuario.user_full_name;

            if (id && password && nome) {
                await new usuariosDao(req.db).updateUser(id, password, nome);
                res.status(202).json({ msg: "Usuario editado com sucesso" });
            } else {
                res.status(412).json({ msg: "Senha não pode ser vazia" });
            }
        }))
        .get(auth, wrapAsync(async (req, res) => {
            const id = req.params.id;
            if (id) {
                const usuario = await new usuariosDao(req.db).findUserById(req.params.id);
                res.status(200).json(usuario);
            } else {
                res.sendStatus(404);
            }
        }))
        .delete(auth, wrapAsync(async (req, res) => {
            const id = req.params.id;
            if (id) {
                const usuario = await new usuariosDao(req.db).findUserById(id);
                if (usuario) {
                    if (usuario.user_name !== 'admin') {
                        await new usuariosDao(req.db).deleteUserById(id);
                        res.status(202).json({ msg: "Usuario deletado com sucesso" });
                    } else {
                        res.status(409).json({ msg: "Administrador não pode ser removido" });
                    }
                } else {
                    res.sendStatus(412);

                }
            } else {
                res.sendStatus(404);
            }
        }));

    app.route('/usuario/existe')
        .post(auth, wrapAsync((async (req, res) => {
            const user = req.body.user_name;
            if (user) {
                const usuarios = await new usuariosDao(req.db).existe(user);
                res.status(200).json(usuarios);
            } else {
                res.status(412).json({ msg: "Nome do usuario não pode ser vazio" });
            }
        })
        ));

    app.route('/usuario/filter')
        .get(auth, wrapAsync((async (req, res) => {
            const usuario = req.query.usuario;
            const nome = req.query.nome;
            if (usuario || nome) {
                const usuarios = await new usuariosDao(req.db).findUserByFilter(nome, usuario);
                res.status(200).json(usuarios);
            } else {
                res.status(412).json({ msg: "Não foi possivel buscar os usuarios" });
            }
        })
        ));

    app.route('/usuarios')
        .get(auth, wrapAsync(async (req, res) => {
            const page = req.query.page;
            const users = await new usuariosDao(req.db).getUser(page);
            res.status(200).json(users);
        }))
        .post(auth, wrapAsync((async (req, res) => {
            const usuario = req.body.usuario;
            const user = usuario.user_name;
            const nome = usuario.user_full_name;
            const password = usuario.user_password;
            if (user && password && nome) {
                const existe = await new usuariosDao(req.db).existe(user);
                if (!existe) {
                    await new usuariosDao(req.db).addUsuario(user, nome, password);
                    res.status(201).json({ msg: "Usuario cadastrado com sucesso" });
                } else {
                    res.status(409).json({ msg: "Usuario já cadastrado" });
                }
            } else {
                res.status(412).json({ msg: "Usuario e senha são obrigatorios" });
            }
        })));
};
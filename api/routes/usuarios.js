const jwt = require('jsonwebtoken');
const wrapAsync = require('../libs/async-wrap');
const auth = require('../libs/auth');
const usuarioController = require('../controllers/usuarios-controller');

module.exports = app => {
    app.route('/usuario/login')
        .post(wrapAsync(async (req, res) => {
            const user = req.body.user_name;
            const password = req.body.user_password;

            if (user && password) {
                const usuario = await usuarioController.login(req.db, user, password);
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
                await usuarioController.atualizar(req.db, id, password, nome);
                res.status(202).json({ msg: "Usuario editado com sucesso" });
            } else {
                res.status(412).json({ msg: "Senha não pode ser vazia" });
            }
        }))
        .get(auth, wrapAsync(async (req, res) => {
            const id = req.params.id;
            if (id) {
                const usuario = await usuarioController.obterPorId(req.db, req.params.id);
                res.status(200).json(usuario);
            } else {
                res.sendStatus(404);
            }
        }))
        .delete(auth, wrapAsync(async (req, res) => {
            const id = req.params.id;
            if (id) {
                const usuario = await usuarioController.obterPorId(req.db, id);
                if (usuario) {
                    if (usuario.user_name !== 'admin') {
                        await usuarioController.delete(req.db, id);
                        res.status(202).json({ msg: "Usuario deletado com sucesso" });
                    } else {
                        res.status(403).json({ msg: "Administrador não pode ser removido" });
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
                const usuario = await usuarioController.existe(req.db, user);
                res.status(200).json(usuario);
            } else {
                res.status(412).json({ msg: "Nome do usuario não pode ser vazio" });
            }
        })
        ));

    app.route('/usuario/filter')
        .get(auth, wrapAsync((async (req, res) => {
            if (usuario || nome) {
                const usuarios = await usuarioController.filter(req.query);
                res.status(200).json(usuarios);
            } else {
                res.status(412).json({ msg: "Não foi possivel buscar os usuarios" });
            }
        })
        ));

    app.route('/usuarios')
        .get(auth, wrapAsync(async (req, res) => {
            const page = req.query.page;
            const users = await usuarioController.obterUsuarios(req.db, page);
            res.status(200).json(users);
        }))
        .post(auth, wrapAsync((async (req, res) => {
            const usuario = req.body.usuario;
            const user = usuario.user_name;
            const nome = usuario.user_full_name;
            const password = usuario.user_password;

            if (user && password && nome) {
                const existe = await usuarioController.existe(req.db, user);
                if (!existe) {
                    await usuarioController.adicionar(req.db, user, nome, password);
                    res.status(201).json({ msg: "Usuario cadastrado com sucesso" });
                } else {
                    res.status(409).json({ msg: "Usuario já cadastrado" });
                }
            } else {
                res.status(412).json({ msg: "Usuario e senha são obrigatorios" });
            }
        })));
};
const auth = require('../config/auth');
const usuarioController = require('../controllers/usuarios-controller');
const usuario = new usuarioController();
const validacao = require('../models/usuario');

module.exports = app => {
    app.route(usuarioController.rotas().login)
        .post(validacao.login(), usuario.login());

    app.route(usuarioController.rotas().usuarioId)
        .put(/*auth,*/ validacao.atualizar(), usuario.atualizar())
        .get(/*auth, */ validacao.id(), usuario.listarPorId())
        .delete(/*auth, */validacao.id(), usuario.deletar());
    /*
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
        */
};

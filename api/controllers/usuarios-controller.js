const db = require('../config/database');
const jwt = require('jsonwebtoken');
const usuariosDao = require('../infra/usuarios-dao');
const wrapAsync = require('../config/async-wrap');
const { validationResult } = require('express-validator/check');
/*
Usuarios.atualizar = async (db, id, password, nome) => {
    await new usuariosDao(db).updateUser(id, password, nome);
};

Usuarios.obterPorId = async (db, id) => {
    const usuario = await new usuariosDao(db).findUserById(id);
    return usuario;
};

Usuarios.delete = async (db, id) => {
    await new usuariosDao(db).deleteUserById(id);
};

Usuarios.existe = async (db, user) => {
    const usuario = await new usuariosDao(db).existe(user);
    return usuario;
};

Usuarios.filter = async (db, query) => {
    const usuario = query.usuario;
    const nome = query.nome;
    const usuarios = await new usuariosDao(db).findUserByFilter(nome, usuario);
    return usuarios;
};

Usuarios.obterUsuarios = async (db, page) => {
    const users = await new usuariosDao(db).getUser(page);
    return users;
};

Usuarios.adicionar = async (db, user, nome, password) => {
    await new usuariosDao(db).addUsuario(user, nome, password);
};*/
class UsuarioController {
    static rotas() {
        return {
            login: '/usuario/login',
            usuarioId: '/usuarios/:id'
        };
    }

    login() {
        return wrapAsync(async (req, res) => {

            const erros = validationResult(req);

            if (!erros.isEmpty()) {
                res.status(412).json({ Erros: erros.array() });
                return;
            }

            const user = req.body.user_name;
            const password = req.body.user_password;

            const usuario = await new usuariosDao(db).findUsuarioAndPassword(user, password);

            if (usuario) {
                const token = jwt.sign(usuario, req.app.get('secret'), {
                    expiresIn: 86400
                });
                res.set('x-access-token', token);
                res.status(200).json(usuario);
            } else {
                res.status(401).json({ msg: `Falha na autenticação para o usuario ${user}` })
            }
        });
    }

    adicionar() {

    }

    listarPorId() {
        return wrapAsync(async (req, res) => {
            const erros = validationResult(req);

            if (!erros.isEmpty()) {
                res.status(412).json({ Erros: erros.array() });
                return;
            }

            const id = req.params.id;

            console.log(id)

            const resultado = await new usuariosDao(db).findUserById(id);
            res.status(200).json(resultado);
        });
    }

    atualizar() {
        return wrapAsync(async (req, res) => {
            const erros = validationResult(req);

            if (!erros.isEmpty()) {
                res.status(412).json({ Erros: erros.array() });
                return;
            }

            const id = req.params.id;
            const password = req.body.user_password;
            const nome = req.body.user_full_name;

            await new usuariosDao(db).updateUser(id, password, nome);
            res.status(202).json({ msg: "Usuario editado com sucesso" });
        });
    }

    deletar() {
        return wrapAsync(async (req, res) => {
            const erros = validationResult(req);

            if (!erros.isEmpty()) {
                res.status(412).json({ Erros: erros.array() });
                return;
            }

            const id = req.params.id;

            const usuario = await new usuariosDao(db).findUserById(id);

            if (usuario) {
                if (usuario.user_name !== 'admin') {
                    await new usuariosDao(db).deletar(id)
                    res.status(202).json({ msg: "Usuário deletado com sucesso" });
                } else {
                    res.status(403).json({ msg: "Administrador não pode ser removido" });
                }
            } else {
                res.sendStatus(412);
            }

        });
}

}

module.exports = UsuarioController;
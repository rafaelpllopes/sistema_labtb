const db = require('../config/database')
const jwt = require('jsonwebtoken')
const usuariosDao = require('../infra/usuarios-dao')
const wrapAsync = require('../config/async-wrap')
const { validationResult } = require('express-validator/check')

class UsuarioController {
    static rotas() {
        return {
            login: '/usuario/login',
            usuarioId: '/usuarios/:id',
            usuarios: '/usuarios',
            filter: '/usuario/filter',
            existe: '/usuario/existe'
        };
    }

    login() {
        return wrapAsync(async (req, res) => {

            const erros = validationResult(req);

            if (!erros.isEmpty()) {
                console.log(`Erros: ${erros.array()}`);
                res.status(412).json({ msg: 'Usuário ou senha invalido' });
                return;
            }

            const user = req.body.user_name;
            const password = req.body.user_password;

            const usuario = await new UsuariosDao(db).findUsuarioAndPassword(user, password);

            if (usuario) {
                const token = jsonwebtoken.sign(usuario, req.app.get('secret'), {
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
        return wrapAsync(async (req, res) => {
            const erros = validationResult(req);

            if (!erros.isEmpty()) {
                res.status(412).json({ Erros: erros.array() });
                return;
            }

            const user = req.body.usuario.user_name;
            const nome = req.body.usuario.user_full_name;
            const password = req.body.usuario.user_password;

            const existe = await new UsuariosDao(db).existe(user);

            if (!existe) {
                await new UsuariosDao(db).addUsuario(user, nome, password);
                res.status(201).json({ msg: "Usuario cadastrado com sucesso" });
            } else {
                res.status(409).json({ msg: "Usuario já cadastrado" });
            }

        });
    }

    listar() {
        return wrapAsync(async (req, res) => {
            const page = req.query.page | 1;
            const users = await new UsuariosDao(db).getUser(page);
            res.status(200).json(users)
        });
    }

    listarPorId() {
        return wrapAsync(async (req, res) => {
            const erros = validationResult(req);

            if (!erros.isEmpty()) {
                res.status(412).json({ Erros: erros.array() });
                return;
            }

            const id = req.params.id;
            const resultado = await new UsuariosDao(db).findUserById(id);
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
            const password = req.body.usuario.user_password;
            const nome = req.body.usuario.user_full_name;

            await new UsuariosDao(db).updateUser(id, password, nome);
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

            const usuario = await new UsuariosDao(db).findUserById(id);

            if (usuario) {
                if (usuario.user_name !== 'admin') {
                    await new UsuariosDao(db).deleteUserById(id)
                    res.status(202).json({ msg: "Usuário deletado com sucesso" });
                } else {
                    res.status(403).json({ msg: "Administrador não pode ser removido" });
                }
            } else {
                res.sendStatus(412);
            }

        });
    }

    getByFilter() {
        return wrapAsync(async (req, res) => {
            const user = req.query.usuario;
            const nome = req.query.nome;

            if (user || nome) {
                const usuarios = await new UsuariosDao(db).findUserByFilter(nome, user);
                res.status(200).json(usuarios);
            } else {
                res.status(412).json({ msg: "Não foi possivel buscar os usuarios" });
            }
        });

    }

    getUserExiste() {
        return wrapAsync(async (req, res) => {
            const user = req.body.user_name;
            if (user) {
                const usuario = await new usuariosDao(db).existe(user);
                res.status(200).json(usuario);
            } else {
                res.status(412).json({ msg: "Nome do usuario não pode ser vazio" });
            }
        });
    }
}

module.exports = UsuarioController;
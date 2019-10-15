const db = require('../config/database')
const jwt = require('jsonwebtoken')
const UsuariosDao = require('../infra/usuarios-dao')
const wrapAsync = require('../config/async-wrap')
const { validationResult } = require('express-validator/check')

class UsuarioController {

    constructor() {
        this.usuarioDao = new UsuariosDao(db)
    }

    static rotas() {
        return {
            login: '/usuario/login',
            usuarioId: '/usuarios/:id',
            usuarios: '/usuarios',
            filter: '/usuario/filter',
            existe: '/usuario/existe'
        }
    }

    login() {
        return wrapAsync(async (req, res) => {

            const erros = validationResult(req)

            if (!erros.isEmpty()) {
                console.log(`Erros: ${erros.array()}`)
                res.status(412).json({ msg: 'Usuário ou senha invalido' })
                return
            }
            const { user_name, user_password } = req.body

            const usuario = await this.usuarioDao.findUsuarioAndPassword(user_name, user_password);

            if (usuario) {
                const token = jwt.sign(usuario, req.app.get('secret'), {
                    expiresIn: 86400
                })
                res.set('x-access-token', token)
                res.status(200).json(usuario)
            } else {
                res.status(401).json({ msg: 'Usuário ou senha invalido' })
            }

        })
    }

    adicionar() {
        return wrapAsync(async (req, res) => {
            const erros = validationResult(req)

            if (!erros.isEmpty()) {
                res.status(412).json({ Erros: erros.array() })
                return
            }

            const { user_name, user_full_name, user_password } = req.body.usuario

            const existe = await this.usuarioDao.existe(user_name)

            if (!existe) {
                await this.usuarioDao.addUsuario(user_name, user_full_name, user_password)
                res.status(201).json({ msg: "Usuário cadastrado com sucesso" })
            } else {
                res.status(409).json({ msg: "Usuário já cadastrado" })
            }

        })
    }

    listar() {
        return wrapAsync(async (req, res) => {
            const page = req.query.page | 1
            const users = await this.usuarioDao.getUser(page)
            res.status(200).json(users)
        })
    }

    listarPorId() {
        return wrapAsync(async (req, res) => {
            const erros = validationResult(req)

            if (!erros.isEmpty()) {
                res.status(412).json({ Erros: erros.array() })
                return
            }

            const { id } = req.params;
            const resultado = await this.usuarioDao.findUserById(id)
            res.status(200).json(resultado)
        });
    }

    atualizar() {
        return wrapAsync(async (req, res) => {
            const erros = validationResult(req)

            if (!erros.isEmpty()) {
                res.status(412).json({ Erros: erros.array() })
                return
            }

            const { id } = req.params;
            const { user_password, user_full_name } = req.body.usuario

            await this.usuarioDao.updateUser(id, user_password, user_full_name)
            res.status(202).json({ msg: "Usuário editado com sucesso" })
        })
    }

    deletar() {
        return wrapAsync(async (req, res) => {
            const erros = validationResult(req)

            if (!erros.isEmpty()) {
                res.status(412).json({ Erros: erros.array() })
                return
            }

            const { id } = req.params

            const usuario = await this.usuarioDao.findUserById(id)

            if (usuario) {
                if (usuario.user_name !== 'admin') {
                    await this.usuarioDao.deleteUserById(id)
                    res.status(202).json({ msg: "Usuário deletado com sucesso" })
                } else {
                    res.status(403).json({ msg: "Administrador não pode ser removido" })
                }
            } else {
                res.sendStatus(412)
            }
        })
    }

    getByFilter() {
        return wrapAsync(async (req, res) => {
            const { usuario, nome } = req.query

            if (usuario || nome) {
                const usuarios = await this.usuarioDao.findUserByFilter(nome, usuario)
                res.status(200).json(usuarios)
            } else {
                res.status(412).json({ msg: "Não foi possivel buscar os usuários" })
            }
        })
    }

    getUserExiste() {
        return wrapAsync(async (req, res) => {
            const { user_name } = req.body
            if (user_name) {
                const usuario = await this.usuarioDao.existe(user_name)
                res.status(200).json(usuario)
            } else {
                res.status(412).json({ msg: "Nome do usuário não pode ser vazio" })
            }
        })
    }
}

module.exports = UsuarioController
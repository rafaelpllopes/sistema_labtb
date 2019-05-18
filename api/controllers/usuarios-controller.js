const usuariosDao = require('../models/usuarios-dao');

const Usuarios = {};

Usuarios.login = async (db, user, password) => {
    const usuario = await new usuariosDao(db).findUsuarioAndPassword(user, password);
    return usuario;
};

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
};

module.exports = Usuarios;
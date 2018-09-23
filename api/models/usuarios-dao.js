const sha256 = require('sha256');

/*
const usuarioConverter = row => ({
    user_id: row.user_id,
    user_name: row.user_name,
});
*/

class UserDao {

    constructor(db) {
        this._db = db;
    }

    findUsuarioAndPassword(user_name, password) {
        return new Promise((resolve, reject) => {
            let cryp = sha256.x2(password);
            this._db.get(`SELECT user_id, user_name FROM usuarios WHERE user_name = ? AND user_password = ?`,
                [user_name, cryp],
                (err, rows) => {
                    if (err) {
                        return reject('Não foi possivel carregar o usuario');
                    }
                    if (rows) resolve(rows);
                    resolve(null);
                });
        });
    }

    updateUser(id, password, nome) {
        return new Promise((resolve, reject) => {
            let cryp = sha256.x2(password);
            this._db.run(`UPDATE usuarios SET user_password = ?, user_full_name = ? WHERE user_id = ?`,
                [cryp, nome, id],
                (err, rows) => {
                    if (err) {
                        return reject('Não foi possivel atualizar o usuario');
                    }
                    if (rows) resolve(rows);
                    resolve(null);
                });
        });
    }

    add(user, nome, password) {
        return new Promise((resolve, reject) => {
            let cryp = sha256.x2(password);
            this._db.run(`INSERT INTO usuarios (user_name, user_full_name, user_password) VALUES (?, ?, ?)`,
                [user, nome, cryp],
                (err, rows) => {
                    if (err) {
                        return reject('Não foi possivel cadastrar o usuario');
                    }
                    return resolve();
                });
        });
    }

    existe(user) {
        return new Promise((resolve, reject) => {
            this._db.get(`SELECT user_name FROM usuarios WHERE user_name = ?`,
                [user],
                (err, rows) => {
                    if (err) {
                        return reject('Usuario não encontrado');
                    }
                    if (rows) resolve(rows);
                    resolve(null);
                });
        });
    }

    findUserById(id) {
        return new Promise((resolve, reject) => {
            this._db.get(`SELECT user_id, user_full_name, user_name, user_data_cadastro FROM usuarios WHERE user_id = ?`,
                [id],
                (err, rows) => {
                    if (err) {
                        return reject('Usuario não encontrado');
                    }
                    if (rows) resolve(rows);
                    resolve(null);
                });
        });
    }

    deleteUserById(id) {
        return new Promise((resolve, reject) => {
            this._db.get(`DELETE FROM usuarios WHERE user_id = ?`,
                [id],
                (err, rows) => {
                    if (err) {
                        return reject('Não foi possivel remover o usuario');
                    }
                    if (rows) resolve(rows);
                    resolve();
                });
        });
    }
}

module.exports = UserDao;
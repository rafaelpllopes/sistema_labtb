const { check } = require('express-validator/check');

const UsuarioValidacoes = {};

UsuarioValidacoes.login = () => [
    check('user_name').exists().withMessage('Usuário é obrigatorio'),
    check('user_name').isLength({ min: 3 }).withMessage('O usuario precisa ter no mínimo 3 caracteres!'),
    check('user_password').exists().withMessage('Senha é obrigatoria'),
    check('user_password').matches('[A-Za-z0-9!@#$%&*()-+?]*').withMessage('A senha deve estar no padrão'),
    check('user_password').isLength({ min: 8 }).withMessage('Senha deve possuir o mínimo de 8 caracteres!')
];

UsuarioValidacoes.atualizar = () => [
    check('id').exists().withMessage('Id é obrigatoria'),
    check('id').isInt().withMessage('Deve ser numerico'),
    check('usuario.user_full_name').exists().withMessage('Nome é obrigatorio'),
    check('usuario.user_full_name').isLength({ min: 3 }).withMessage('O nome precisa ter no mínimo 3 caracteres!'),
    check('usuario.user_password').matches('[A-Za-z0-9!@#$%&*()-+?]*').withMessage('A senha deve estar no padrão'),
    check('usuario.user_password').isLength({ min: 8 }).withMessage('Senha deve possuir o mínimo de 8 caracteres!')
];

UsuarioValidacoes.adicionar = () => [
    check('usuario.user_name').exists().withMessage('Usuário é obrigatorio'),
    check('usuario.user_name').isLength({ min: 3 }).withMessage('O usuario precisa ter no mínimo 3 caracteres!'),
    check('usuario.user_full_name').exists().withMessage('Nome é obrigatorio'),
    check('usuario.user_full_name').isLength({ min: 3 }).withMessage('O nome precisa ter no mínimo 3 caracteres!'),
    check('usuario.user_password').matches('[A-Za-z0-9!@#$%&*()-+?]*').withMessage('A senha deve estar no padrão'),
    check('usuario.user_password').isLength({ min: 8 }).withMessage('Senha deve possuir o mínimo de 8 caracteres!')
];

UsuarioValidacoes.id = () => [
    check('id').exists().withMessage('Id é obrigatoria'),
    check('id').isInt().withMessage('Deve ser numerico')
];

UsuarioValidacoes.nome = () => [
    check('id').exists().withMessage('Nome deve ser digitado')
];

module.exports = UsuarioValidacoes;
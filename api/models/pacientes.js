const { check } = require('express-validator/check');

const PacientesValidacoes = {};

PacientesValidacoes.adicionar = () => [
    check('paciente.paciente_nome').exists().withMessage('Nome é obrigatorio'),
    check('paciente.paciente_data_nascimento').exists().withMessage('Data é obrigatoria'),
    check('paciente.paciente_sexo').exists().withMessage('Sexo é obrigatoria')
];

PacientesValidacoes.atualizar = () => [
    check('id').exists().withMessage('Id é obrigatoria'),
    check('id').isInt().withMessage('Deve ser numerico'),
    check('paciente.paciente_nome').exists().withMessage('Nome é obrigatorio'),
    check('paciente.paciente_data_nascimento').exists().withMessage('Data é obrigatoria'),
    check('paciente.paciente_sexo').exists().withMessage('Sexo é obrigatoria')
];

PacientesValidacoes.id = () => [
    check('id').exists().withMessage('Id é obrigatoria'),
    check('id').isInt().withMessage('Deve ser numerico')
];

PacientesValidacoes.nome = () => [
    check('paciente.paciente_nome').exists().withMessage('Nome é obrigatorio')
];

PacientesValidacoes.cns = () => [
    check('paciente.paciente_cns').exists().withMessage('CNS é obrigatorio')
];

module.exports = PacientesValidacoes;
const { check } = require('express-validator/check')

const reportValidacoes = {};

reportValidacoes.anoMes = () => [
    check('ano').exists().withMessage('Ano deve ser selecionado'),
    check('ano').isNumeric().withMessage('Ano Deve ser número'),
    check('mes').exists().withMessage('Deve ser selecionado'),
    check('mes').isNumeric().withMessage('Mes deve ser número')
]

reportValidacoes.periodo = () => [
    check('dataInicial').exists().withMessage('Data inicial é obrigatória'),
    check('dataFinal').exists().withMessage('Data final é obrigatória'),
]

module.exports = reportValidacoes
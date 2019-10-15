const { check } = require('express-validator/check')

const LaudoValidacoes = {};

LaudoValidacoes.adicionar = () => [
    check('laudo.paciente_id').exists().withMessage('Paciente deve ser selecionado'),
    check('laudo.unidade_id').exists().withMessage('Unidade deve ser selecionado'),
    check('laudo.material_id').exists().withMessage('Material deve ser selecionado'),
    check('laudo.laudo_tipo').exists().withMessage('Tipo deve ser selecionado'),
    check('laudo.laudo_amostras').exists().withMessage('Número da amostra é obrigatoria'),
    check('laudo.laudo_amostras').isNumeric().withMessage('Amostra deve ser número'),
]

LaudoValidacoes.atualizar = () => [
    check('id').exists().withMessage('ID é obrigátoria'),
    check('id').isInt().withMessage('Deve ser numérico'),
    check('laudo.paciente_id').exists().withMessage('Paciente deve ser selecionado'),
    check('laudo.unidade_id').exists().withMessage('Unidade deve ser selecionado'),
    check('laudo.material_id').exists().withMessage('Material deve ser selecionado'),
    check('laudo.laudo_tipo').exists().withMessage('Tipo deve ser selecionado'),
    check('laudo.laudo_amostras').exists().withMessage('Número da amostra é obrigatoria'),
    check('laudo.laudo_amostras').isNumeric().withMessage('Amostra deve ser número'),
]

LaudoValidacoes.id = () => [
    check('id').exists().withMessage('ID é obrigátoria'),
    check('id').isInt().withMessage('Deve ser numérico')
]

module.exports = LaudoValidacoes
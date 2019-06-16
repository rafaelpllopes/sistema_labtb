const laudosDao = require('../infra/laudos-dao');
const ultimoDiaMes = require('../config/ultimo-dia-mes');

const Laudos = {};

Laudos.obter = async (db, page) => {
    const laudos = await new laudosDao(db).getLaudos(page);
    return laudos;
};

Laudos.adicionar = async (db, laudo) => {
    await new laudosDao(db).addLaudo(laudo);
};

Laudos.filter = async (db, query) => {
    const cns = query.cns;
    const nome = query.nome;
    const mes = query.mes;
    const ano = query.ano;
    
    let dia = ultimoDiaMes(mes);
    let dataInicial = `${ano}-${mes}-01`
    let dataFinal = `${ano}-${mes}-${dia}`;
    
    const laudos = await new laudosDao(db).filterLaudos(cns, nome, dataInicial, dataFinal);

    return laudos;
};

Laudos.obterPorId = async (db, id) => {
    const laudo = await new laudosDao(db).getLaudoById(id);
    return laudo;
};

Laudos.updateResultado = async (db, laudo) => {
    await new laudosDao(db).updateLaudoResultado(id, laudo);
};

Laudos.updateLaudo = async (db, id, laudo) => {
    await new laudosDao(db).updateLaudo(id, laudo);
};

Laudos.delete = async (db, id) => {
    await new laudosDao(db).deleteLaudo(id);
};

Laudos.obterPorPacienteId = async (db, id) => {
    const laudos = await new laudosDao(db).getLaudosByPacienteId(id);
    return laudos;
};

module.exports = Laudos;
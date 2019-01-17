module.exports = (mes) => {
    let dia = null;
    switch (mes) {
        case '01': 
        case '03':
        case '05':
        case '07':
        case '08':
        case '10':
        case '12': {
            dia = '31'
        } break;
        case '02': {
            dia = parseInt(mes)%4 == 0 ? 29 : 28;
        } break;
        default: {
            dia = '30';
        }
    }
    return dia;
}
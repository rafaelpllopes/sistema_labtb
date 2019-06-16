module.exports = (number, size) => {
    number = number.toString();
    while (number.length < size) number = "0" + number;
    return number;
}
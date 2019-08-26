const exec = require('child_process').exec
const cmd = 'npm stop';

module.exports = function stop() {
    exec(cmd, { cwd: __dirname }, (error, stout, stderr) => console.log(error, stout, stderr))
}
const fs = require('fs')
const {spawn} = require('child_process')

module.exports = {
  compile: (req, res) => {
    const emptyJS = 'CompiledCode.js'
    const {code} = req.body;
    const compCode = fs.createWriteStream(emptyJS);
    compCode.write(code);
    compCode.end();
    let consoleOutput = ""
    const compiler = spawn('node', [emptyJS]);
    compiler.stdout.setEncoding('ascii')
    compiler.stderr.setEncoding('ascii')
    compiler.stdout.on('data', (data) => {
        consoleOutput += `${data}\n`
    })
    compiler.stderr.on('data', (data) => {
      consoleOutput = data;
    })
    compiler.on('exit', () =>
    {
      res.status(200).send(consoleOutput);
      // console.log('exit');
      consoleOutput = "";
    })
  }
}
const fs = require('fs')
const {spawn} = require('child_process')

module.exports = {
  compile: (req, res) => {
    const path = 'CompCode/SOMETHINGCRAZYthnyuimuyhtbtynym.js'
    const {code} = req.body;
    const compCode = fs.createWriteStream(path);
    compCode.write(code);
    compCode.end();
    const compiler = spawn('node', [path]);
    compiler.stdout.setEncoding('ascii')
    compiler.stderr.setEncoding('ascii')
    compiler.stdout.on('data', (data) => {
      res.status(200).send(data)
    })
    compiler.stderr.on('data', (data) => {
      res.status(200).send(data)
    })
  }
}
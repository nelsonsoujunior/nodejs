var express = require('express')
var app = express()
 
app.get('/', function (req, res) {
  res.send('Olá mundo\n')
})
 
app.listen(3000)
console.log('Servidor iniciado em localhost:3000. Ctrl+C para encerrar...');
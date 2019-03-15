const express = require('express')
var io = require('socket.io')();

const app = express()


io.on('connection', (client) => {
  client.on('subscribeToTimer', (interval) => {
    console.log('client is subscribing to timer with interval ', interval);
    setInterval(() => {
      client.emit('timer', new Date());
    }, interval);
  });
});

const io_port = 8000;
io.listen(io_port);
console.log('io_port ', io_port);

const PORT = 4000
app.listen(PORT, () => console.log(`listening on ${PORT}`));
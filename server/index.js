require('dotenv').config();
const {SESSION_SECRET, CONNECTION_STRING, SERVER_PORT} = process.env;
const express = require('express');
const {json} = require('express');
const massive = require('massive');
const session = require('express-session');
var io = require('socket.io')();

const app = express();
app.use(json());
app.use(express.static(`${__dirname}/../build`))

app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))

massive(CONNECTION_STRING)
.then(db => {
  app.set('db', db)
  const PORT = SERVER_PORT || 3005
  app.listen(PORT, console.log(`Server is running on ${PORT}`))
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'))
})
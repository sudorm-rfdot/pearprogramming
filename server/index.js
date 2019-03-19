require('dotenv').config();
const {SESSION_SECRET, CONNECTION_STRING, SERVER_PORT} = process.env;
const express = require('express');
const {json} = require('express');
const massive = require('massive');
const session = require('express-session');
var io = require('socket.io')();
const mc = require('./controller/MainController');
const cc = require('./controller/CompilerController');
const ac = require('./controller/AuthController');

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

app.get('/api/projects/:id', mc.getUserProjects); //takes the users id
app.get('/api/files/:id', mc.getProjectFiles); //takes the project id
app.get('/api/file/:id', mc.getOneFile); //takes the file id
app.get('/api/profile/:id', mc.getUserProfile); //takes the user id

app.post('/auth/register', ac.register);
app.post('/auth/login', ac.login);
app.post('/auth/logout', ac.logout);
app.post('/auth/verifypassword');

app.put('/auth/updatepassword');
app.put('/auth/updateprofilepicture');
app.put('/auth/updateemail');
app.put('/auth/updateusername');

app.delete('/api/delete-project/:id', mc.deleteProject); //takes the project id

app.post('/api/compiler', cc.compile);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'))
})

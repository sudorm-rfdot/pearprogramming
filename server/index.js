require('dotenv').config();
const {SESSION_SECRET, CONNECTION_STRING, SERVER_PORT, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, S3_BUCKET} = process.env;
const express = require('express');
const {json} = require('express');
const massive = require('massive');
const session = require('express-session');
const sockets = require('socket.io');
const aws = require('aws-sdk');
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


app.get('/api/signs3', (req, res) => {
    aws.config = {
          region: 'us-west-1',
          accessKeyId: AWS_ACCESS_KEY_ID,
          secretAccessKey: AWS_SECRET_ACCESS_KEY
      };
    
      const s3 = new aws.S3();
      const fileName = req.query['file-name'];
      const fileType = req.query['file-type'];
      const s3Params = {
            Bucket: S3_BUCKET,
            Key: fileName,
            ContentType: fileType,
            ACL: 'public-read'
        };
      
        s3.getSignedUrl('putObject', s3Params, (err, data) => {
              if (err) {
                    console.log(err);
                    return res.end();
                }
                const returnData = {
                      signedRequest: data,
                      profile_picture: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`,
                  };
            
                  return res.send(returnData);
              })
            })
            
            // Matt
            app.get('/api/projects/:id', mc.getUserProjects); //takes the users id
            // Spence
            app.get('/api/pendingprojects/:id', mc.getPendingUserProjects); //takes the users id
            app.get('/api/files/:id', mc.getProjectFiles); //takes the project id
            app.get('/api/file/:id', mc.getOneFile); //takes the file id
            app.get('/api/profile/:id', mc.getUserProfile); //takes the user id
             // Nick
            app.post('/auth/register', ac.register);
            // Nick
            app.post('/auth/login', ac.login);
            // Nick
            app.post('/auth/logout', ac.logout);
            app.post('/auth/verifypassword', ac.verifyPassword);
            app.get('/auth/getsessionuser', ac.getSessionUser)
            app.post('/api/project', mc.createProject); //takes the project_name in req.body
            app.post('/api/userproject', mc.userProjectJoin); //takes user_id, password_id, and accepted in req.body
            // Spence
            app.post('/api/files', mc.createProjectFiles); //takes file_name, file_link, and project_id in req.body
            app.post('/api/projectrequest', mc.sendProjectRequest); //takes the user_id of the user getting sent the request, as well as the project_id in req.body
            
            app.put('/auth/updatepassword', ac.updatePassword);
            app.put('/auth/updateprofilepicture');
            app.put('/auth/updateemail', mc.updateUserProfile);
            app.put('/auth/updateusername', mc.updateUsername);
            app.put('/api/user/:id', mc.updateUserProfile); //takes the user id, also needs a req.body containing email, username, and password
            app.put('/api/pendingrequest/:id', mc.acceptProjectRequest); //takes the user id
            app.put('/api/profilepicture', mc.uploadProfilePicture) //takes the picture link and the user id in req.body
            app.put('/api/updatefile', mc.updateFileText); //takes the file_link and file id in a req.body
            
            // Spence
            app.delete('/api/delete-project/:id', mc.deleteProject); //takes the project id
            
            app.delete('/api/files/:id', mc.deleteProjectFiles) //takes the file id
            // Nick
            app.delete('/api/user/:id', mc.deleteUserProfile) //takes the user id
            
            app.post('/api/compiler', cc.compile);
            
            
            massive(CONNECTION_STRING)
            .then(db => {
              app.set('db', db)
              const PORT = SERVER_PORT || 3005
              const server = app.listen(PORT, console.log(`Server is running on ${PORT}`))
              const io = sockets(server);
              let text = {};
              io.on('connection', (socket) =>
              {
                socket.on('join room', (room) =>
                {
                  // console.log(room);
                  socket.join(room);
                  socket.emit('on connection', text[room] || '//code')
                  socket.on('update text', (data) =>
                  {
                    text[data.room] = data.text;
                    socket.to(data.room).broadcast.emit('new text', text[data.room]);
                  })
                })
              })
            })
            
            app.get('*', (req, res) => {
              res.sendFile(path.join(__dirname, '../build/index.html'))
            })
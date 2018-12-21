var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const cors = require('cors');
//var path = require('path');

var addUser = require('./routes/addUser');
var getUser = require('./routes/getUser');
//var updateUserLocation = require('./routes/updateUserLocation');
var addCircuit = require('./routes/addCircuit');
//var assignUserBox = require('./routes/assignUserBox');
var submitChallenge = require('./routes/submitChallenge');
var getCircuits = require('./routes/getCircuits');
var assignUserToCircuit = require('./routes/assignUserToCircuit');
var update = require('./routes/update');
var updateCircuit = require('./routes/updateCircuit');

var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(cors());
//app.use(express.static(path.join(__dirname, 'public')));

app.use('/addUser', addUser);
app.use('/getUser', getUser);
//app.use('/updateUserLocation', updateUserLocation);
app.use('/addCircuit', addCircuit);
//app.use('/assignUserBox', assignUserBox);
app.use('/submitChallenge', submitChallenge);
app.use('/getCircuits', getCircuits);
app.use('/assignUserToCircuit', assignUserToCircuit);
app.use('/update', update);
app.use('/updateCircuit', updateCircuit);

var clientRoom = 'not set';
var userName = 'username not set'
console.log('client room not set: ' + clientRoom);
io.on('connection', function(client){
  console.log('a user connected');

  //all socket actions should be taken care of here:
  client.on('joinRoom', function(room, user) {
    clientRoom = room;
    userName = user;
    console.log('client room set for io access: ', clientRoom);
    client.join(room);
    console.log("User " + user + " has joined room #", room);
  });
  client.on('SEND', function(data) {
    console.log("sending message ", data);
    io.to(data.room).emit('RECEIVE', data);
  });
  //custom events
  client.on('CHALLENGE_COMPLETE', function(data) {
    console.log("challenge complete by ", data);
    io.to(data.room).emit('RECEIVE_WIN', {
      username: 'System',
      message: 'Challenge completed by ' + data.username
    });
  });







  client.on('disconnect', function() {
      console.log('User disconnected!');
    });
});//closes io

http.listen(3001, function(){
  console.log('listening on *:3001');
});

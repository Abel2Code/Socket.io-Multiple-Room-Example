const express = require('express');
const router = express.Router();

const Conversation = require('../models/conversation');
var io = global.io;
router.get('/conversations', function(req,res){
  Conversation.find(function(err, students) {
    if (err)
      res.send(err)
    else
      res.json(students);
  });
})

router.post('/startConversation', function(req, res) {
  Conversation.create({
		initiator: req.body.initiator,
    reciever: req.body.reciever
	}, function(err, conversation){
		if(err){
      console.log(err);
			res.send(err);
		} else {
      createSocket(conversation);
			res.send("Conversation Created")
		}
	});

});

function createSocket(conversation){
  var nsp = io.of('/' + conversation._id);
  console.log("nsp of /" + conversation._id);
  nsp.on('connection', function(socket){
    var addedUser = 1;

    socket.on('new message', function (data) {
       // we tell the client to execute 'new message'
       socket.broadcast.emit('new message', data);
     });

     socket.on('add user', function (username) {
       console.log("adding user");
        if (addedUser) return;

        // we store the username in the socket session for this client
        socket.username = username;
        ++numUsers;
        addedUser = true;
        socket.emit('login', {
          numUsers: numUsers
        });
        // echo globally (all clients) that a person has connected
        socket.broadcast.emit('user joined', {
          username: socket.username,
          numUsers: numUsers
        });
      });

      socket.on('disconnect', function () {
        if (addedUser) {
          --numUsers;

          // echo globally that this client has left
          socket.broadcast.emit('user left', {
            username: socket.username,
            numUsers: numUsers
          });
        }
      });

    console.log('someone connected');
  });
}

module.exports = router;

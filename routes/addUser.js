var express = require('express');
var router = express.Router();
var User = require('../models/user');
/*
on Client side:

addUser takes a POST request specifying a new user's req.body to add a new user
to the database - will likely have to change this to support passport
req.body{ first_name,last_name,user_name,
          avatar_link,current_user_location,
          circuits_participated }


*/
/* This adds user object to database when sent over route 'addUser'*/
router.post('/', function (req, res) {
    console.log('add user accessed');
    var data = req.body;
    console.log("added: " + data.username);
    console.log([data.longitude, data.latitude]);
    new User({
      username:data.username,
      //avatar:data.avatar_link, //string to image location in server / public
      current_user_location: {
        type: "Point",
        coordinates: [parseFloat(data.longitude), parseFloat(data.latitude)] //[-113.98274, 46.87278]
      }
    }).save(function (err, user) {
        if (err) {
              console.log(err);
              res.sendStatus(400);
            }
        console.log("Sending user id back to client");
        res.send(user._id);
    });
    //res.sendStatus(200);
});

module.exports = router;

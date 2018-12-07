var express = require('express');
var router = express.Router();
var User = require('../models/user');

/* This adds user object to database when sent over route 'addUser'*/
router.post('/', function (req, res) {
    console.log('add user accessed');
    process_request(req);
    res.sendStatus(200);
});

function process_request(req) {
    var data = req.body;
    console.log("added: " + data.first_name);
    console.log([data.longitude, data.latitude]);
    new User({
      first_name:data.first_name,
      last_name:data.last_name,
      username:data.user_name,
      avatar:data.avatar_link, //string to image location in server / public
      current_user_location: {
        type: "Point",
        coordinates: [parseFloat(data.longitude), parseFloat(data.latitude)] //[-113.98274, 46.87278]
      },
      circuits_participated:[] //id's of circuits a user was in
    }).save(function (err) {
        if (err) {
            if (err.code === 11000) {
                // 11000 : Error code for duplicate entry with same primary key. Even though we will update the table to fill different events users attended.
                console.log("Duplicate entry for user collection. Skipping entry.")
            }
            else {
              console.log(err);
            }
        } else {
            console.log("done");
        }
    });
}

module.exports = router;

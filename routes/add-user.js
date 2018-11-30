var express = require('express');
var router = express.Router();
var User = require('../models/user');

/* This adds user to the database as soon as they sign up */
router.post('/', function (req, res) {
    process_request(req);
    res.sendStatus(200);
});

function process_request(req) { //gathers events data we scraped from users' Facebook info into our database.
    var data = req.body;
    console.log("added: " + data.name);
    new User({
      first_name:data.first_name,
      last_name:data.last_name,
      username:data.user_name,
      avatar:data.avatar_link, //string to image location in server / public
      circuits_participated:[] //id's of circuits a user was in
    }).save(function (err) {
        if (err) {
            if (err.code === 11000) {
                // 11000 : Error code for duplicate entry with same primary key. Even though we will update the table to fill different events users attended.
                console.log("Duplicate entry for user collection. Skipping entry.")
            }
        } else {
            console.log("done");
        }
    });
}

module.exports = router;

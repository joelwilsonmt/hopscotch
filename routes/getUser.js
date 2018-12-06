var express = require('express');
const mongoose = require('mongoose');
var router = express.Router();
var User = require('../models/user');


/*when accessing getUser, take username and password then return _id:
* The /getUser route is defined in server.js
*/
router.get('/', function (req, res) {
    console.log('add user accessed');
    process_request(req);
    process_response(res);
    res.sendStatus(200);
});
function process_request(req) {
  console.log("getting user");
  var data = req.body;
  //setting it to first name last name for now
  //passport should take care of this later for us
  User.findOne(
    {first_name:data.first_name,
      last_name:data.last_name},
      function (err, user) {
        res.send(user._id);
    });
}
function process_response(res) {
  //return _id

}

module.exports = router;

var express = require('express');
var router = express.Router();
var User = require('../models/user');

//hoping to code this so that when the getUser route is called from the
//user Provider in React that it takes the userId, returns the user's
//current user object as well as a current circuit object for the user
//if it exists

//so the data will be set in state on the client site by
//this.state.user: res.user,
//this.state.currentCircuit: res.circuit


/*when accessing getUser, take username then return _id:
* The /getUser route is defined in server.js
*/
router.get('/', function (req, res) {
  console.log("getting user");
  var data = req.body;
  //setting it to first name last name for now
  //passport should take care of this later for us
  User.findOne(
    {

      username:data.username
    })//closes findOne
    .exec(
      function (err, user) {
        if(err) {
          console.log("cannot find user");
          res.status(404);
          console.log(err);
        }

        console.log(JSON.stringify(user.username) + "'s ID = " + JSON.stringify(user._id));
        res.status(200).send(JSON.stringify(user._id));
    }); //closes exec
}); //closes router.get

module.exports = router;

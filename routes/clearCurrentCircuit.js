var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Circuit = require('../models/circuit');

//hoping to code this so that when the clearCurrentCircuit route is called from the
//GameProvider in React that it takes the userId, and removes any current_circuit_id
//in the user in the database, then you can run /update in the GameProvider to reflect that
//upon them leaving the review screen, to adjust the React state

//so the data will be set in state on the client site by
//this.state.user: res.user,
//this.state.currentCircuit: res.circuit

//this is a put route because it takes a request value to search by
router.put('/', function (req, res) {
  console.log("clearing current circuit id @ " + new Date() + "------------------------------");
  var data = req.body.userId;
  //console.log("req body " + req.body + " @ " + new Date());
  console.log("searching by " + JSON.stringify(req.body));
  User.findByIdAndUpdate(data, {current_circuit_id: null})
    .then(function (user, err) {
          if(err) {
            console.log(err);
            return;
          }
          console.log("User " + user.username + "'s current_circuit_id cleared");
          res.status(200).send(user._id);
    }); //closes then
}); //closes router.put

module.exports = router;

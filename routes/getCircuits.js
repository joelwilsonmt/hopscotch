var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Circuit = require('../models/circuit');
const haversine = require('haversine');
var synonyms = require("synonyms");
/*
getCircuits takes a GET request that specifies a request body with the following:
req{ user._id }

it searches current circuits by cicuit_boundaries to find a
user_session_boundary object that matches the req._id and returns a circuit object with the following:

circuit {
  circuit_boundaries: [Here bbounds],
  challenges: sets_challenges,
  date_created: new Date()
}

later on, socket.on('disconnect') {
 //move challenges_completed to past_challenges_completed
}
*/
router.get('/', function (req, res) {
  console.log("-------------------------new getting circuits @ "+new Date()+"---------------------------");
  var data = req.body;
  var userId = data._id;
  var hereBoundary; //= getUserHereBoundary(userId);
  User.findById(userId, function (err, user) {
    console.log(user.user_session_boundary.here_api_format);
    hereBoundary = user.user_session_boundary.here_api_format;
  })
  .then(function(){
    console.log(hereBoundary);
    //then search circuits by here boundary
    Circuit.find({circuit_boundaries: hereBoundary}, function(err, circuit) {
      console.log(circuit);
      res.status(200).send(circuit);
    });
  });
});

module.exports = router;

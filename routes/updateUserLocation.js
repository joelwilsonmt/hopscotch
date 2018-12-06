var express = require('express');
var router = express.Router();
var User = require('../models/user');

router.put('/', function(req, res){
  console.log(req.body);
  var data = req.body;
  User.findOneAndUpdate({
      current_user_location: {
        coordinates: [data.position.coords.longitude, data.position.coords.latitude]
      }
    },
    request.body,
    {new: true},
    function(err, documents){//reach into our database and if error log error else send info
    if(err){
      console.log("I messed up");
    } else{
     response.send(request.body);
     console.log(request.body);
    }
  });
});

module.exports = router;

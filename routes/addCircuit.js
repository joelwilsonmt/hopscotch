var express = require('express');
var router = express.Router();
var Circuit = require('../models/circuit');
var User = require('../models/user'); //included to be able to search users
/*
on Client side:
check to see if there are available circuits in the area,
if not, us this route to create a circuit
axios(getCircuits).then(if headerResponse == 401){
  axios(addCircuit)
}

this takes a request specifying a user's body._id to create a circuit to join
in that area defined by the user's assigned user box (assignUserBox)

In the server call we go to the Here API and also user a synonym library to
generate a list of challenges bound within the user polygon

*/
//This adds circuit object to database when sent over route 'addCircuit'

router.post('/', function (req, res) {
    console.log('add circuit accessed');
    process_request(req);
    res.sendStatus(200);
});

function process_request(req) {
    var data = req.body;
    //access user's user_session_boundary and create an API call to Here
    //so use findbyId() for data._id
    //here requires a north, south, east, west boundary
    var north, south, east, west;
    User.findById(data._id, function (err, user) {
      //code goes here
      var polyCoords = user.user_session_boundary.coordinates;
      console.log("searching user for polygon data");
      console.log(polyCoords[0]);
      south = polyCoords[0][0][1];
      north = polyCoords[0][2][1];
      west = polyCoords[0][1][0];
      east = polyCoords[0][0][0];
      //Here api: west longitude, south latitude, east longitude, north latitude
      console.log(west+','+south+','+east+','+north);
    } );

    //

    /*new Circuit({
      users:[data.users],
      challenges:{
        object_gate: [String],
        location_gate: [String],
        id_users_completed: [Number]
      },
      time_started: Date,
      time_completed: Date,
      date_created: Date,
      date_deleted: Date,
      archived: Boolean,
      delete_in_ten_days: {
        delete: Boolean,
        start_delete: Date
        }
    }
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
    });*/
}

module.exports = router;

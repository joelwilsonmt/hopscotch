var express = require('express');
var router = express.Router();
const axios = require('axios');
var Circuit = require('../models/circuit');
var User = require('../models/user'); //included to be able to search users
/*
on Client side:
check to see if there are available circuits in the area,
if not, use this route to create a circuit
axios(getCircuits).then(if (headerResponse == 401)){
  axios(addCircuit)...
});

addCircuit takes a request specifying a user's body._id to create a circuit to join
in that area defined by the user's assigned user box (assignUserBox)

In the server call we go to the Here API and also use a synonym library to
generate a list of challenges bound within the user polygon

*/
router.post('/', function (req, res) {
    console.log('==========================new add circuit accessed '+new Date()+' ==============================================');
    process_request(req);
    res.sendStatus(200);
});

function process_request(req) {
    var data = req.body;
    //access user's user_session_boundary and create an API call to Here
    //so use findbyId() for data._id
    //here requires a west, south, east, north boundary
    var north, south, east, west;
    User.findById(data._id, function (err, user) {
      var polyCoords = user.user_session_boundary.coordinates;
      console.log("searching user for polygon data in the following: ");
      console.log(polyCoords[0]);
      west = polyCoords[0][1][0];
      south = polyCoords[0][0][1];
      east = polyCoords[0][0][0];
      north = polyCoords[0][2][1];
    }).then(function(){
      console.log("findbyId finished, Here API call starting...");
      //Here api: west longitude, south latitude, east longitude, north latitude
      var api = 'API'+ west+','+south+','+east+','+north+'&cat=wine-and-liquor';
      //leisure-outdoor
      //landmark-attraction
      //going-out, wine-and-liquor; maybe do a 'pub crawl' version of this? Photo yourself in the bar with your drink (can Rekognition see full/empty glasses?), drink it and move on to the next bar
      //eat-drink
      //natural-geographical
      //sights-museums
      axios.get(api)
        .then(response => {
          var places = response.data.results.items;
          sets_location_gate = {};
          console.log("Places found: " + places.length);
          for(var i = 0; i < places.length; i++) {
            sets_location_gate[i] = {
              position: places[i].position,
              name: places[i].title,
              address: places[i].vicinity
            };
          }
          console.log(sets_location_gate);
        })
        .catch(error => {
          console.log(error);
        });
      });//closes axios call

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

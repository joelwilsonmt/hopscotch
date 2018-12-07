var express = require('express');
var router = express.Router();
var Circuit = require('../models/circuit');

/* This adds circuit object to database when sent over route 'addCircuit'
router.post('/', function (req, res) {
    console.log('add circuit accessed');
    process_request(req);
    res.sendStatus(200);
});

function process_request(req) {
    var data = req.body;
    console.log("added: " + data.first_name);
    console.log([data.longitude, data.latitude]);
    new Circuit({
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
    });
}
*/
module.exports = router;

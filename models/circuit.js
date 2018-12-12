var mongoose = require('./../config/db-config');

CircuitSchema  = mongoose.Schema(
    {
      users:[Array],
      circuit_boundaries: [Number],
      challenges:[{
        //order challenges by distance in getChallengeList?
        object_gate: String, //word of object we want to confirm
        location_gate: {
          position: [Number], //array of lat/long coords
          name: String, //name of location
          address: String, //address in plain text
          category: String //whatever category the location belongs to
        },
        id_users_completed: [String] //ids of users that have completed this challenge
      }]
    },
    { collection: 'circuits' });
var Circuit = mongoose.model('Circuit', CircuitSchema);

module.exports = Circuit;

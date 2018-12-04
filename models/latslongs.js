var mongoose = require('./../config/db-config');

LatsLongs  = mongoose.Schema(
    {
      latitudes: [Number],
      longitudes: [Number]
    },
    { collection: 'latlong' });
var LatsLongs = mongoose.model('LatsLongs', LatsLongs);

module.exports = Circuit;

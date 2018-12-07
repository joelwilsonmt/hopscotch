var mongoose = require('./../config/db-config');
var GeoJSON = require('mongoose-geojson-schema');

UserSchema = mongoose.Schema(
    {
        first_name:String,
        last_name:String,
        username:String,
        avatar:String, //string to image location in server / public
        current_user_location: mongoose.Schema.Types.Point,
        user_session_boundary: mongoose.Schema.Types.Polygon,
        circuits_participated:[String] //id's of circuits a user was in
    },
    { collection: 'users' });
//UserSchema.index({current_user_location: '2dsphere'});
var User = mongoose.model('User', UserSchema);

module.exports = User;

/*
{
  type: {
    type: String, // Don't do `{ location: { type: String } }`
    enum: ['Point']//, // 'location.type' must be 'Point'
    //required: true
  },
  coordinates: {
    type: [Number]//,
    //required: true
  }
},//can update as user moves around and front end makes more POST calls
*/

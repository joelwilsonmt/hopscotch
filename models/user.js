var mongoose = require('./../config/db-config');

UserSchema = mongoose.Schema(
    {
        first_name:String,
        last_name:String,
        username:String,
        avatar:String, //string to image location in server / public
        current_user_location: {
          type: "Point",
          coordinates: [Number, Number]
        },//can update as user moves around and front end makes more POST calls
        circuits_participated:[Number] //id's of circuits a user was in
    },
    { collection: 'users' });
var User = mongoose.model('User', UserSchema);

module.exports = User;

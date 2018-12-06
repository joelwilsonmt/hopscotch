var mongoose = require('./../config/db-config');

UserSchema = mongoose.Schema(
    {
        _id: String,
        first_name:String,
        last_name:String,
        username:String,
        avatar:String, //string to image location in server / public
        current_user_location: {
          type: {type: String}, //note: Type is a reserved Object keyword
          coordinates: [Number, Number]
        }//,//can update as user moves around and front end makes more POST calls
        //circuits_participated:[String] //id's of circuits a user was in
    },
    { collection: 'users' });
var User = mongoose.model('User', UserSchema);

module.exports = User;

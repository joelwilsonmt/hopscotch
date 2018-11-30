var mongoose = require('./../config/db-config');

UserSchema = mongoose.Schema(
    {
        first_name:String,
        last_name:String,
        username:String,
        avatar:String, //string to image location in server / public
        circuits_participated:[Number] //id's of circuits a user was in
    },
    { collection: 'users' });
User = mongoose.model('User', UserSchema);

module.exports = User;

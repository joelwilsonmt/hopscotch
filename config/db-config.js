var mongoose = require('mongoose');
mongoose.connect("mongodb://circuitbreaker:Thisisagoodpassword!1@ds137530.mlab.com:37530/heroku_76gt05rt");

module.exports = mongoose;

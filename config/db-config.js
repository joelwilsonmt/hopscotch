var mongoose = require('mongoose');

mongoose.connect("mongodb://circuitbreaker:Thisisagoodpassword!1@ds119164.mlab.com:19164/circuitbreaker");


module.exports = mongoose;

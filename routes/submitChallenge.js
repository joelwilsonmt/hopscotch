var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Circuit = require('../models/circuit');
const haversine = require('haversine');
var synonyms = require("synonyms");
var AWS = require('aws-sdk');
var dotenv = require('dotenv').config();
var fs = require('fs');
var atob = require('atob');

/*
submitChallenge takes a PUT request that specifies a request body with the following:
req{ user._id, user.location, challenge{name, address, location_gate, object_gate, challenge_text} picture }

if a challenge is found to be complete, the PUT request moves the challenge._id into
the user's challenges_completed array.

later on, socket.on('disconnect') {
 //move challenges_completed to past_challenges_completed
}
*/
function isWithinWinDistance(locationGateCoords,userCoords, unit, winDistance){
  var start = {};
  start.latitude = userCoords[1];
  start.longitude = userCoords[0];
  var end = {};
  end.latitude = locationGateCoords[0];
  end.longitude = locationGateCoords[1];
  var distance = haversine(start, end, {unit: unit});
  if(distance < winDistance) {
    return true; //user is verified at the location!
  }
  else {
    return false; //user is not within winDistance miles of poi
  }
  //this distance is returned as the crow flies:
  //return distance + " " + unit +"s";
}
// function getBinary(encodedFile) {
//         var base64Image = encodedFile.split("data:image/jpeg;base64,")[1];
//         var binaryImg = atob(base64Image);
//         var length = binaryImg.length;
//         var ab = new ArrayBuffer(length);
//         var ua = new Uint8Array(ab);
//         for (var i = 0; i < length; i++) {
//           ua[i] = binaryImg.charCodeAt(i);
//         }
//
//         var blob = new Blob([ab], {
//           type: "image/jpeg"
//         });
//
//         return ab;
//       }
function pictureIsValid(pictureFile, objectGateWord) {

  AWS.config.update({
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.ACCESS_SECRET,
    region: 'us-west-2'
  });

  let rekognition = new AWS.Rekognition();
  // JSON.stringify(pictureFile);
  // var newObj = JSON.stringify(pictureFile);
  console.log(pictureFile);

  //pictureFile[0].toString('binary');
  //const buffer = Buffer.from(newObj, 'base64');
  rekognition.detectLabels({
    Image: {
      Bytes: pictureFile
    }
  }).promise().then(function(res){
    console.log("result: ", res);
  }).catch(function(err){
    console.error(err);
  });


    // rekognition.detectLabels({
    //     Image: {
    //       Bytes: buffer
    //     }
    //   }).promise().then(function(res){
    //     console.log(res);
    //     var results = res.Labels;
    //     //add all names with confidence over 90
    //     var rekognitionObjects = [];
    //     for (var i = 0; i < results.length; i++){
    //       if (rekognitionObjects.length >= 10){break;} //more than 10 is generous
    //       else if (results[i].Confidence > 90){
    //         rekognitionObjects.push(results[i].Name);
    //       }
    //   }).catch(function(err){
    //     console.error(err);
    //   });

    //let's get synonyms for our objectGateWord
  //closes .then() promise
}

//---------------this function should be put in its own file,
//available to all routes - make it a method to User? ------------------------------------
//returns current_user_location for a given userId (._id)
// function getUserLocation(userId) {
//   User.findOne(
//     {
//       _id: userId
//     })//closes findOne
//     .exec(
//       function (err, user) {
//         if(err) {
//           console.log(err);
//         }
//         console.log(user.current_user_location.coordinates);
//         return user.current_user_location.coordinates;
//     });
// }

router.post('/', function (req, res) {
  console.log("submitting challenge at " +new Date());
  var data = req.body;
  console.log("data passed type:", typeof data);
  console.log(data);
  var test = pictureIsValid(data);
  //strip necessary vars from request body:
  // var userId = data._id;
  // var picture = data.picture_url; //not sure here
  // var userLocation = getUserLocation(userId);
  // console.log("user location: " + userLocation);
  // var challenge = data.challenge;
  //rewrite this after testing to accept challenge object, and not individual
  //challenge lat/long / objectGate data
  //var objectGate = data.challenge.object_gate;
  // var words = ['keys', 'flower', 'clock', 'newspaper', 'wallet', 'soda can', 'carrot', 'banana', 'milk', 'watch', 'magnet', 'CD', 'shoe','flag'];
  //get random object gate for synonym testing:
  // var objectGate = words[Math.floor(Math.random()*words.length)];
  // console.log(data);
  // pictureIsValid(null, objectGate);
  res.sendStatus(200).send(/*picture is valid && location is valid*/);
}); //closes router.put

module.exports = router;

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

function pictureIsValid(pictureFile, objectGateWord) {

  /*
  AWS documentation says: "You pass image bytes to an Amazon Rekognition API operation by using the Bytes property. For example, you would use the Bytes property to pass an image loaded from a local file system. Image bytes passed by using the Bytes property must be base64-encoded. Your code may not need to encode image bytes if you are using an AWS SDK to call Amazon Rekognition API operations." https://docs.aws.amazon.com/es_es/rekognition/latest/dg/API_Image.html

  Similar problem: https://stackoverflow.com/questions/37326065/convert-binary-form-to-base64-string-in-javascript
  https://stackoverflow.com/questions/23223718/failed-to-execute-btoa-on-window-the-string-to-be-encoded-contains-characte

  Latest error log:
  { InvalidImageFormatException: Request has invalid image format
    at Request.extractError (/Users/jamie/code/node_modules/aws-sdk/lib/protocol/json.js:51:27)
    at Request.callListeners (/Users/jamie/code/node_modules/aws-sdk/lib/sequential_executor.js:106:20)
    at Request.emit (/Users/jamie/code/node_modules/aws-sdk/lib/sequential_executor.js:78:10)
    at Request.emit (/Users/jamie/code/node_modules/aws-sdk/lib/request.js:683:14)
    at Request.transition (/Users/jamie/code/node_modules/aws-sdk/lib/request.js:22:10)
    at AcceptorStateMachine.runTo (/Users/jamie/code/node_modules/aws-sdk/lib/state_machine.js:14:12)
    at /Users/jamie/code/node_modules/aws-sdk/lib/state_machine.js:26:10
    at Request.<anonymous> (/Users/jamie/code/node_modules/aws-sdk/lib/request.js:38:9)
    at Request.<anonymous> (/Users/jamie/code/node_modules/aws-sdk/lib/request.js:685:12)
    at Request.callListeners (/Users/jamie/code/node_modules/aws-sdk/lib/sequential_executor.js:116:18)
    at Request.emit (/Users/jamie/code/node_modules/aws-sdk/lib/sequential_executor.js:78:10)
    at Request.emit (/Users/jamie/code/node_modules/aws-sdk/lib/request.js:683:14)
    at Request.transition (/Users/jamie/code/node_modules/aws-sdk/lib/request.js:22:10)
    at AcceptorStateMachine.runTo (/Users/jamie/code/node_modules/aws-sdk/lib/state_machine.js:14:12)
    at /Users/jamie/code/node_modules/aws-sdk/lib/state_machine.js:26:10
    at Request.<anonymous> (/Users/jamie/code/node_modules/aws-sdk/lib/request.js:38:9)
  message: 'Request has invalid image format',
  code: 'InvalidImageFormatException',
  time: 2018-12-10T20:10:56.095Z,
  requestId: 'b342e3a6-fcb7-11e8-828a-696569ca59a9',
  statusCode: 400,
  retryable: false,
  retryDelay: 95.18204571511495 }

  */

  AWS.config.update({
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.ACCESS_SECRET,
    region: 'us-west-2'
  });

  let rekognition = new AWS.Rekognition();

  JSON.stringify(pictureFile);
  var newObj = JSON.stringify(pictureFile);

  console.log(newObj);

  /*----------------------------------------------
  Here is where we need to convert newObj to base64










  ----------------------------------------------*/

  // Try creating a new buffer, in case AWS likes it like that
  const buffer = Buffer.from(newObj, 'binary');
  console.log(buffer);

  // DetectLabels operation using Bytes
  rekognition.detectLabels({
    Image: {
      Bytes: buffer
    }
  })

  .promise().then(function(res){
    console.log("result: ", res);
  })

  .catch(function(err){
    console.error(err);
  });

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

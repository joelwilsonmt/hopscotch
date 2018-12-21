var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Circuit = require('../models/circuit');
const haversine = require('haversine');
var synonyms = require("synonyms");
var AWS = require('aws-sdk');
var dotenv = require('dotenv').config();
// var fs = require('fs');
var atob = require('atob');
// const vision = require('@google-cloud/vision');
// const client = new vision.ImageAnnotatorClient();
var Blob = require('blob');

function isWithinWinDistance(locationGateCoords, userCoords, unit, winDistance){
  var start = {};
  start.latitude = userCoords[0];
  start.longitude = userCoords[1];
  var end = {};
  end.latitude = locationGateCoords[0];
  end.longitude = locationGateCoords[1];
  var distance = haversine(start, end, {unit: unit});
  if(distance < winDistance) {
    console.log("User is in the right place!");
    // return true; //user is verified at the location!
  }
  else {
    ("User is not within the required distance of the challenge location!");
    // return false; //user is not within winDistance miles of poi
  }
  //this distance is returned as the crow flies:
  //return distance + " " + unit +"s";
}

function pictureIsValid(pictureFile, wordToCheck) {

  function getBinary(base64Image) {

     var binaryImg = atob(base64Image);
     var length = binaryImg.length;
     var ab = new ArrayBuffer(length);
     var ua = new Uint8Array(ab);
     for (var i = 0; i < length; i++) {
       ua[i] = binaryImg.charCodeAt(i);
      }
      return ab;
  }

  var base64Image = pictureFile.split("data:image/jpeg;base64,")[1];
  var imageBytes = getBinary(base64Image);

  AWS.config.update({
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.ACCESS_SECRET,
    region: 'us-west-2'
  });

  let rekognition = new AWS.Rekognition();

  rekognition.detectLabels({
    Image: {
      Bytes: imageBytes
    },
    MinConfidence: 50
  })
  .promise().then(function(res){
    var responseData = res;
    console.log("AWS response (this is a JSON array) :", responseData);

    // Converting AWS response (JSON array) to an array of the label objects
    // (This is all very hacky...)
    var labelObjectArray = [];
    Object.keys(responseData.Labels).forEach(function(key){
      var item = responseData.Labels[key];
      labelObjectArray.push(item);
    })
    // console.log("An array of the Label objects: ", labelObjectArray);


    // Converting array of label objects to array of just the names of the labels
    // (Still very hacky. I'm sure there's a way more elegant way to do this...)
    var justTheLabels = [];
    Object.keys(labelObjectArray).forEach(function(key) {
      var val = labelObjectArray[key]["Name"];
      justTheLabels.push(val);
    });
    // console.log("Array of just the AWS labels only: ", justTheLabels);


    // convert all words toLowerCase()
    var lowRidingLabels = [];
    for (var i = 0; i < justTheLabels.length; i++) {
      lowRidingLabels.push(justTheLabels[i].toLowerCase());
    }
    lowRidingLabels.sort();


    // Loop through this array of names to find match with object_to_check
    var checkWord = wordToCheck;
    var found = false;

    if (lowRidingLabels.includes("face") && lowRidingLabels.includes(checkWord)) {
      found = true;
    }
    console.log("List of detected objects in user's photo: ", lowRidingLabels);

    // for (var i = 0; i < justTheLabels.length; i++) {
    //   if (checkWord === justTheLabels[i].toLowerCase()) {
    //     found = true;
    //     break;
    //   }
    // }

    if (found) {
      console.log("Congrats! User took an acceptable selfie with a", checkWord, "!");
    } else {
      console.log("Sorry, there is no match with", checkWord, "in the following list of detected objects, OR this isn't a selfie: ", lowRidingLabels);
    }
  })
  .catch(function(err){
    console.error(err);
  });

};

router.put('/', function (req, res) {

  console.log("Submitting challenge at " + new Date());

  var data = req.body;
  // console.log("data passed type:", data.screenshot);

  var testWord = pictureIsValid(data.screenshot, data.check_word);

  var testPlace = isWithinWinDistance(data.location_to_check, data.user_position, "meter", 200);

  res.sendStatus(200).send(/*picture is valid && location is valid*/);


}); //closes router.put

module.exports = router;

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
    console.log("CONGRATS! User is in the right place!");
    return true;
    // return true; //user is verified at the location!
  }
  else {
    console.log("SORRY! User is not within the required distance of the challenge location!");
    return false;
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

  // AWS credentials for Detect labels API
  AWS.config.update({
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.ACCESS_SECRET,
    region: 'us-west-2'
  });

  // Detecting Labels
  let rekognition = new AWS.Rekognition();
  rekognition.detectLabels({
    Image: {
      Bytes: imageBytes
    },
    MinConfidence: 50
  })
  .promise().then(function(res){
    var responseData = res;
    // console.log("AWS response (this is a JSON array) :", responseData);

    // Converting AWS response (JSON array) to an array of the label objects
    var labelObjectArray = [];
    Object.keys(responseData.Labels).forEach(function(key){
      var item = responseData.Labels[key];
      labelObjectArray.push(item);
    })
    // console.log("An array of the Label objects: ", labelObjectArray);

    // Converting array of label objects to array of just the names of the labels
    var justTheLabels = [];
    Object.keys(labelObjectArray).forEach(function(key) {
      var val = labelObjectArray[key]["Name"];
      justTheLabels.push(val);
    });
    // console.log("Array of just the AWS labels only: ", justTheLabels);

    // convert all returned labels to lowercase to facilitate match searching
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
    if (found) {
      console.log("CONGRATS! User took an acceptable selfie with a", checkWord, "!");
      return true; // This is the "true" I want to refer to the whole entire pictureIsValid function
    } else {
      console.log("SORRY, there is no match with", checkWord, "in the following detected items, OR photo is not a selfie: ", lowRidingLabels);
      return false;
    }
  })
  .catch(function(err){
    console.error(err);
  });

};

router.put('/', function (req, res) {

  console.log("Submitting challenge at " + new Date());

  var data = req.body;
  var query = data.challengeId;
  var update = {
    id_users_completed: [data.userId]
  };
  var options = {new: true};

  var testWord = pictureIsValid(data.screenshot, data.check_word);
  var testPlace = isWithinWinDistance(data.location_to_check, data.user_position, "meter", 4000);

  // Add user id to the list of users who have completed that particular challenge
  // if (testWord && testPlace) {
  //   console.log("Both things are true!");
  //   Circuit.findByIdAndUpdate(data.challengeId, {id_users_completed : data.userId}, {upsert: true, new: true}, function(err, user){
  //     if (err) {console.log(err);}
  //     console.log("Added user to list of users who have completed this challenge!");
  //     res.status(200).send(user);
  //   });
  // }

  if (testPlace && testWord) {
    console.log("Both location and picture requirements met!");
    // Circuit.findByIdAndUpdate(
    //   query, //_id
    //   update, // new long and lat
    //   options, //add if doesn't exist
    //   function(err, documents){
    //   if(err){
    //     console.log(err);
    //   } else{
    //    res.send(data);
    //    console.log(data);
    //   }
      res.sendStatus(200).send(/*picture is valid && location is valid*/);
    // });
  }

  // Check to see if the user's ID appears in all other challenges of that same circuit. If so, tell the front end that the user broke the circuit, and game is over.



}); //closes router.put

module.exports = router;

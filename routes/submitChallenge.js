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
const vision = require('@google-cloud/vision');
const client = new vision.ImageAnnotatorClient();

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

function pictureIsValid(pictureFile) {

  // Stringify raw blob data
  // var newObj = JSON.stringify(pictureFile);

  // Buffer first, and then convert to base64
  // var encoded = Buffer.from(newObj).toString('base64');

  // Convert blob to base64
  // let newFile = pictureFile.toString('base64');

  // JSON request for Google Cloud Vision API
  const request = {

      "requests":[
        {
          "image":{
            "content": pictureFile
          },
          "features":[
            {
              "type":"LABEL_DETECTION",
              "maxResults":1
            }
          ]
        }
      ]
    };

  // Making the request
  client.annotateImage(request)
  .then(function(res){
    console.log("result: ", res);
  })
  .catch(function(err){
    console.log(err);
  });
};

router.post('/', function (req, res) {
  console.log("submitting challenge at " +new Date());
  var data = req.body;
  console.log("data passed type:", typeof data);
  // console.log(data);
  var test = pictureIsValid(data);
  res.sendStatus(200).send(/*picture is valid && location is valid*/);
}); //closes router.put

module.exports = router;

$( document ).ready(function() {
  var longitudeArray = [];
  var latitudeArray = [];
  var longStart = -180.0000;
  longitudeArray.push(longStart);
  var latStart = -90.0000;
  latitudeArray.push(latStart);
  while (longStart < 180) {
    longStart = (longStart + .15);
    longitudeArray.push(longStart.toFixed(4));
  }
  while (latStart < 90) {
    latStart = (latStart + .15);
    latitudeArray.push(latStart.toFixed(4));
  }

  var long = longitudeArray.reduce(function(acc, cur, i) {
  acc[i] = cur;
  return acc;
}, {});
var lat = latitudeArray.reduce(function(acc, cur, i) {
acc[i] = cur;
return acc;
}, {});
  $('#longitude-output').text(JSON.stringify(long));
  $('#latitude-output').text(JSON.stringify(lat));
    console.log(long, lat);
});

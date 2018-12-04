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
  console.log(longitudeArray, latitudeArray);
  $('#longitude-output').text(longitudeArray);
  $('#latitude-output').text(latitudeArray);
});

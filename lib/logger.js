module.exports = function(sensor_name, rawReading) {
  var calibratedResults = "",
       i,
       fermata = require('fermata');

  for (i = 2; i < arguments.length; i++) {
    calibratedResults += arguments[i] + ' ';
  }

  /*require('fermata').json('http://localhost:8080').demeter.growbed.get(function(err, result){
    console.log(err)
  })*/

  console.log( sensor_name + ": " + calibratedResults + " | " + rawReading );
};

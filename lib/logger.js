module.exports = function(ops) {
  var calibratedResults = "",
      i,
      instrumentName = ops.instrumentName,
      rawReading = ops.rawReading,
      calibratedReadings = ops.calibratedReadings,
      attachment = ops.attachment;

  if(calibratedReadings) {
    calibratedReadings.forEach(function(value) {
      calibratedResults += value + ' ';
    });
  }

  /*require('fermata').json('http://localhost:8080').demeter.growbed.get(function(err, result){
    console.log(err)
  })*/

  if(attachment) console.log('Attachment Sent');

  console.log( instrumentName + ": " + calibratedResults + " | " + rawReading );
};

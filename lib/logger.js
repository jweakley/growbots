module.exports = function(ops) {
  var calibratedResults = "",
      i,
      instrumentName = ops.instrumentName,
      rawReading = ops.rawReading,
      calibratedReadings = ops.calibratedReadings,
      attachment = ops.attachment,
      io = ops.socket_io;

  if(calibratedReadings) {
    calibratedReadings.forEach(function(value) {
      calibratedResults += value + ' ';
    });
  }

/*
  var doc = {
    type: instrumentName,
    uploaded: new Date().toISOString(),
    calibratedResults: calibratedResults,
    rawReading: rawReading
  };
  if (attachment) doc._attachments = {
    original: {
      content_type: 'image/jpeg',
      data: attachment.toString('base64')
    }
  }
  require('fermata').json('http://localhost:5984')('demeter').post(
    doc,
    function(err, response) {
      if(err) console.error(err)
      else console.log('Created doc', response.id)
    }
  );

  if(attachment) console.log('Attachment Sent');
*/

  io.sockets.emit(instrumentName, { calibratedResults: calibratedResults, rawReading: rawReading });
};

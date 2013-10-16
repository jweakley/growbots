module.exports = function(environmentName, socket_io) {
  return function() {
    var percentLight = ((this.value + 1) * (-25/256)) + 100,
        logAnalogData = require('../logger.js');

    logAnalogData({
      instrumentName: environmentName + ' Light',
      rawReading: this.value,
      calibratedReadings: [ percentLight.toFixed(2) + '%' ],
      socket_io: socket_io
    });
  };
};

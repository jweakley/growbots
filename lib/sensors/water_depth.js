module.exports = function(environmentName, socket_io) {
  return function() {
    var rawReading = this.value,
        logAnalogData = require('../logger.js');

    logAnalogData({
      instrumentName: environmentName + ' Water Depth',
      rawReading: rawReading,
      socket_io: socket_io
    });
  };
};

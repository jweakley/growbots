module.exports = function(environmentName) {
  return function() {
    var rawReading = this.value,
        logAnalogData = require('../logger.js');

    logAnalogData({
      instrumentName: environmentName + ' Water Depth',
      rawReading: rawReading
    });
  };
};

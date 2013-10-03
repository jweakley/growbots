module.exports = function(environmentName) {
  return function() {
    var rawReading = this.value,
        logAnalogData = require('../logger.js');

    logAnalogData(environmentName + ' Water Depth', rawReading );
  };
};

module.exports = function(environmentName) {
  return function() {
    var percentLight = ((this.value + 1) * (-25/256)) + 100,
        logAnalogData = require('../logger.js');

    logAnalogData(environmentName + ' Light', this.value, percentLight.toFixed(2) + '%' );
  };
};

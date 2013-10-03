module.exports = function(environmentName) {
  return function() {
    var voltage = this.value * 0.004882814,
        celsius = (voltage - 0.5) * 100,
        fahrenheit = celsius * (9/5) + 32;
        logAnalogData = require('../logger.js');

    logAnalogData(environmentName + ' Temperature', this.value, celsius.toFixed(2) + '°C', fahrenheit.toFixed(2) + '°F' );
  };
};

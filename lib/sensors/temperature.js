module.exports = function(environmentName, socket_io) {
  return function() {
    var voltage = this.value * 0.004882814,
        celsius = (voltage - 0.5) * 100,
        fahrenheit = celsius * (9/5) + 32;
        logAnalogData = require('../logger.js');

    logAnalogData({
      instrumentName: environmentName + ' Temperature',
      rawReading: this.value,
      calibratedReadings: [ celsius.toFixed(2) + '°C', fahrenheit.toFixed(2) + '°F' ],
      socket_io: socket_io
    });
  };
};

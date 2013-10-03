var five = require('johnny-five'),
    demeter = require('./lib/demeter.js');


five.Board().on("ready", function() {
  var loggingFrequency = 1000,
      growbed = new demeter.Environment(
        'Main Growbed',
        {
          lightLevel: new five.Sensor({ pin: "A2", freq: loggingFrequency }),
          temperature: new five.Sensor({ pin: "A0", freq: loggingFrequency })
        }
      ),
      fishTank = new demeter.Environment(
        'Fish Tank',
        {
          waterDepth: new five.Sensor({ pin: "A1", freq: loggingFrequency })
        }
      );
});



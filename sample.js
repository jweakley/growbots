var five = require('johnny-five'),
    demeter = require('./lib/demeter.js'),
    loggingFrequency = 5000,
    RaspiCam = require("raspicam");

five.Board().on("ready", function() {

  var growbed = new demeter.Environment(
        'Main Growbed',
        {
          lightLevel: new five.Sensor({ pin: "A2", freq: loggingFrequency }),
          temperature: new five.Sensor({ pin: "A0", freq: loggingFrequency })
        }
      ),
      fishTank = new demeter.Environment(
        'Fish Tank',
        {
          waterDepth: new five.Sensor({ pin: "A1", freq: loggingFrequency }),
          camera: new RaspiCam({
            mode: 'photo',
            output: './pictures/fish_tank.jpg',
            timelapse: loggingFrequency
          })
        }
      );
});



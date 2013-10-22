var five = require('johnny-five'),
    growbots = require('./lib/growbots.js'),
    loggingFrequency = 5000,
    RaspiCam = require("raspicam");

five.Board().on("ready", function() {

  var growbed = new growbots.Environment(
        'Main Growbed',
        {
          lightLevel: new five.Sensor({ pin: "A2", freq: loggingFrequency }),
          temperature: new five.Sensor({ pin: "A0", freq: loggingFrequency })
        }
      ),
      fishTank = new growbots.Environment(
        'Fish Tank',
        {
          waterDepth: new five.Sensor({ pin: "A1", freq: loggingFrequency })
          /*,
          camera: new RaspiCam({
            mode: 'photo',
            output: require('path').resolve('./tmp/pictures/fish_tank.jpg'),
            timelapse: loggingFrequency
          })*/
        }
      );
});



var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
  , fs = require('fs')

app.listen(80);

function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

var five = require('johnny-five'),
    growbots = require('./lib/growbots.js'),
    loggingFrequency = 1000,
    RaspiCam = require("raspicam");

five.Board().on("ready", function() {

  var growbed = new growbots.Environment(
        'Main Growbed',
        {
          lightLevel: new five.Sensor({ pin: "A2", freq: loggingFrequency }),
          temperature: new five.Sensor({ pin: "A0", freq: loggingFrequency })
        },
        io
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
        },
        io
      );
});

io.set('log level', 1);
io.sockets.on('connection', function (socket) {
  socket.emit('hello', 'world');
});

var RaspiCam = require("raspicam");
var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
  , fs = require('fs')

app.listen(80);

function handler (req, res) {
  fs.readFile(__dirname + '/test.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

io.set('log level', 1);
io.sockets.on('connection', function (socket) {
  socket.emit('hello', 'world');
});

var my_process = spawn('raspivid', ['-o -', '-t 0']), var stdout = '', var stderr = '';


io.sockets.on('connection', function (socket) {
  console.log('Hello');
  //var readStream = fs.createReadStream("video.webm");

  socket.on('VIDEO_STREAM_REQ', function (req) {
      console.log(req);
      my_process.stdout.on('data', function(data){
        socket.emit('VS',data);
        console.log(data);
      });

      my_process.stderr.on('data', function(data){
        console.log(data);
      });
      /*readStream.addListener('data', function(data) {

      });*/

  });
});

/*
//to take a snapshot, start a timelapse or video recording
camera.start();

//listen for the "read" event triggered when each new photo/video is saved
camera.on("read", function(err, timestamp, filename){
  if (filename.slice(-1)[0] === '~') return;
  camera.stop();
});*/

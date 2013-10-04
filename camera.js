var RaspiCam = require("raspicam");

var camera = new RaspiCam({
  mode: 'photo',
  output: './pictures/test_pic.jpg'
});


//to take a snapshot, start a timelapse or video recording
camera.start();

//listen for the "read" event triggered when each new photo/video is saved
camera.on("read", function(err, timestamp, filename){
  if (filename.slice(-1)[0] === '~') return;
  camera.stop();
});

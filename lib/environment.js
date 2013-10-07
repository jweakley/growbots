function Environment( name, external_devices ) {
  var sensor,
      device,
      k = -1,
      sensors = [ 'lightLevel', 'temperature', 'waterDepth' ],
      devices = [ 'camera' ];

  this.name = name;
  this.photoId = 1;

  while ( ++k < sensors.length ) {
    sensor = sensors[ k ];

    this[ sensor ] = external_devices[ sensor ] || null;

    if(this[ sensor ]) {
      this[ sensor ].on(
        'data',
        require('./sensors/' + require('change-case').snakeCase(sensor) + '.js')(this.name)
      );
    }
  }

  k = -1;

  while ( ++k < devices.length ) {
    device = devices[ k ];

    this[ device ] = external_devices[ device ] || null;

    if(this[ device ]) {
      this[ device ].on(
        "read",
        require('./devices/' + require('change-case').snakeCase(device) + '.js')(this.name, this[ device ])
      );
      setInterval(function(camera){
          camera.start();
        },
        this[ device ].get('timelapse'),
        this[ device ]
      );
    }
  }


}

module.exports = Environment;

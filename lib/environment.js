function Environment( name, external_sensors ) {
  var sensor,
      k = -1,
      sensors = [ 'lightLevel', 'temperature', 'waterDepth' ];

  this.name = name;

  while ( ++k < sensors.length ) {
    sensor = sensors[ k ];

    this[ sensor ] = external_sensors[ sensor ] || null;

    if(this[ sensor ]) {
      this[ sensor ].on(
        'data',
        require('./sensors/' + require('change-case').snakeCase(sensor) + '.js')(this.name)
      );
    }
  }


}

module.exports = Environment;

var fermata = require('fermata'),
    _ = require('lodash'),
    MultiCouch = require("multicouch"),
    my_couch = new MultiCouch({
      port: 8080,
      prefix: "/tmp"
      // view_dir: "/tmp", // same as db_dir when ommitted
      // log_file: "/tmp/couch.log",
      // uri_file: "/tmp/couch.uri",
      // couchdb_path: "/opt/local/bin/couchdb"
    }),
    couch_server = fermata.json('http://localhost:8080'),
    db_name = 'demeter',
    database = couch_server(db_name),
    async = require('async'),
    preflight_couchdb = function (callback) {
      couch_server.get(function (err, result) {
        process.stdout.write('Checking CouchDB server... ');
        if (!err) {
          console.log('Online, V'+ result.version);
          callback();
        } else {
          console.error('Offline\n');
          start_database(callback);
        }
      });
    },
    preflight_database = function(callback) {
      couch_server._all_dbs.get(function (err, result) {
        process.stdout.write('Checking for Database... ');
        if (!err) {
          if(_.contains(result, db_name)) {
            console.log('Exists');
            callback();
          } else {
            console.log('Does not Exist');
            create_db(callback);
          }
        } else {
          callback(err);
        }
      });
    },
    create_db = function (callback) {
      (database).put({}, function (err, result) {
        process.stdout.write('Creating Database... ');
        if (!err) {
          process.stdout.write('Success\n');
          callback();
        } else {
          callback(err);
        }
      });
    },
    delete_database = function (callback) {
      process.stdout.write('Removing DB... ');
      (database).delete({}, function (err, result) {
        if (!err) {
          process.stdout.write('Success\n');
          callback();
        } else {
          process.stdout.write('Failure\n');
          callback(err);
        }
      });
    },
    start_database = function (callback) {
      callback();
    };

my_couch.on("start", function() {
  console.log("CouchDB started.");
  });

my_couch.on("stop", function() {
  console.log("CouchDB stopped.");
  });

my_couch.on("error", function(error) {
  console.log("CouchDB errored '%s'.", error);
});

async.waterfall([
  function (callback) {
    my_couch.start();
    callback();
  },
  preflight_couchdb,
  preflight_database
], function (err, result) {
  if(!err) {
    console.log('Ready to rock!');

  } else {
    console.error(err.toString());
    throw err;
  }
});


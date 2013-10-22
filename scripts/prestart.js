var fermata = require('fermata'),
    _ = require('lodash'),
    MultiCouch = require("multicouch"),
    growbots = require('../lib/growbots.js'),
    myCouch = new MultiCouch({
      port: 5984,
      prefix: './tmp/couch'
    }),
    fermataServer = require('fermata').json('http://localhost:5984'),
    databaseName = 'growbots',
    database = fermataServer(databaseName),
    async = require('async'),
    preflightCouchDB = function (callback) {
      fermataServer.get(function (err, result) {
        process.stdout.write('Checking CouchDB server... ');
        if (!err) {
          console.log('Online, V'+ result.version);
          callback();
        } else {
          console.error('Offline\n');
          startCouchDB(callback);
        }
      });
    },
    preflightDatabase = function(callback) {
      fermataServer._all_dbs.get(function (err, result) {
        process.stdout.write('Checking for Database... ');
        if (!err) {
          if(_.contains(result, databaseName)) {
            console.log('Exists');
            callback();
          } else {
            console.log('Does not Exist');
            createDatabase(callback);
          }
        } else {
          callback(err);
        }
      });
    },
    createDatabase = function (callback) {
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
    deleteDatabase = function (callback) {
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
    startCouchDB = function (callback) {
      myCouch.start();
      callback();
    };

myCouch.on("start", function() {
  console.log("CouchDB started.");
  });

myCouch.on("stop", function() {
  console.log("CouchDB stopped.");
  });

myCouch.on("error", function(error) {
  console.log("CouchDB errored '%s'.", error);
});

async.waterfall([
  preflightCouchDB,
  preflightDatabase
], function (err, result) {
  if(!err) {
    console.log('Ready to rock!');

  } else {
    console.error(err.toString());
    throw err;
  }
});

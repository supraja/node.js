// Node program to perform parallel downloads using async.parallel
// If modules already present, checks for version and updates if 
// necessary

var async = require("async");
var exec = require('child_process').exec;

module.exports = function Downloader() {

	if(process.argv[2] == undefined) {
		console.log("Nothing to download. No arguments passed");
		return;
	}

	var modules = process.argv.slice(2);
	var module1 = modules[0];
	var module2 = modules[1];

	// can use doUntil or doWhilst
  async.parallel([
    function(callback) {
      var command = "sudo npm install " + module1;
      download(command);
      if(callback())
        callback();
    }, 
    function(callback) {
      var command = "sudo npm install " + module2;
      download(command);
      if(callback())
        callback();
    }
  ], function(err) {
    if(err) return next(err);
    else console.log("Task complete. ");
  });

  function download(command) {
    exec(command, function(err, stdout, strerr) {
        if(err) {
          console.log("Failed to download " + module1);
        }
        else {
          console.log("Downloaded " + module1 + "successfully!");
        }
      });
  }
}

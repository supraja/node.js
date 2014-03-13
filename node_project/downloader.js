// Node program to perform parallel downloads using async.parallel
// Also get download time so we can check if it really async, that is,
// whether modules are not downloaded in the order in which they are
// specified. Also time taken for each download. So we can check if node 
// passes onto the next module download if a certain download is taking 
// much longer than expected. If modules already present, checks for version 
// and updates if necessary. Also saves authentication. Not secure. 

var async = require("async");
var execute = require('child_process').exec;
var tty = require("tty");

module.exports = function Downloader() {

	if(process.argv[2] == undefined) {
		console.log("Nothing to download. No arguments passed");
		return;
	}

	var modules = process.argv.slice(2);
	var count = -1;

	// can use whilst
	async.whilst(
		function() {
			return ++count < modules.length;
		}, 
		function(callback) {
			var command = "sudo npm install " + modules[count];
			console.log("About to download " + count + ": " + modules[count]);
			download(command, modules[count]);
			//setTimeout(callback, 10000);
			if(callback()) callback();
		},
		function(err) {
			//process.stdin.setRawMode(false);
			if(err) {
				console.log("Error during download. ");
				process.exit(1);
			}
			else process.exit(0);
		}
	)
/*
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
	  if(err) { return next(err); }
	  else { console.log("Task complete. "); }
	});
*/

  function download(command, moduleName) {
    execute(command, function(err, stdout, strerr) {
        if(err) {
          console.log("Failed to download " + moduleName);
        }
        else {
          console.log("Downloaded " + moduleName + " successfully!");
        }
      });
  }
}

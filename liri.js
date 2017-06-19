//get key data for twitter
var key = require("./keys.js");


var Twitter = require('twitter');
var request = require('request');
var Spotify = require('node-spotify-api');

var options = {
	mytweets: function() {
		console.log("tweet");
		key.stream('statuses/filter', {track: 'twitter'},  function(stream) {
  			stream.on('data', function(tweet) {
    			console.log(tweet.text);
  		});

  			stream.on('error', function(error) {
    			console.log(error);
 		 	});
		});

	},
	spotifyThisSong: function() {
		console.log("spotify");

	},
	movieThis: function() {
		console.log("movie");

	},
	doWhatItSays: function() {
		console.log("do");
	}
}

//valuating userInput into console
if (process.argv[2] === "my-tweets" || process.argv[2] === "spotify-this-song" || process.argv[2] === "movie-this" || process.argv[2] === "do-what-it-says") {
	var convert = process.argv[2].split('-').join('');
	console.log(convert);
	options.convert;
} else {
	console.log("Please choose a valid option");
}


//get key data for twitter
var client = require("./keys.js");


var Twitter = require('twitter');
var request = require('request');
var spotify = require('node-spotify-api');

var options = {
	mytweets: function() {
		console.log("tweet");
		var twitter = client.twitterKeys;
		var params = {screen_name: 'lmanderson89'};
		twitter.get('statuses/user_timeline', params, function(error, tweets, response) {
  			if (!error) {
    			console.log(tweets);
  			}	
		});
	},
	spotifyThisSong: function(songName) {
		//var spotify = client.spotifyKeys;
		console.log("spotify " + songName);
		spotify.search({ type: 'track', query: songName }, function(err, data) {
  			if (err) {
    			return console.log('Error occurred: ' + err);
  			} 
			console.log(data); 
		});
	},
	movieThis: function(movieName) {
		console.log("movie " + movieName);

	},
	doWhatItSays: function() {
		console.log("do");
	}
}

//valuating userInput into console
	switch (process.argv[2]) {
		case "my-tweets":
			options.mytweets();
			break;
		case "spotify-this-song":
			var songName = process.argv[3];
			options.spotifyThisSong(songName);
			break;
		case "movie-this":
			var movieName = process.argv[3];
			options.movieThis(movieName);
			break;
		case "do-what-it-says":
			options.doWhatItSays();
			break;	
		default:
		console.log("Please choose a valid option");
			break;
	}


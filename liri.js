//get key data for twitter
var keys = require("./keys.js");


var Twitter = require('twitter');
var request = require('request');
var Spotify = require('node-spotify-api');
var fs = require('fs');

var twitterClient = new Twitter(keys.twitterKeys);
var spotifyClient = new Spotify(keys.spotifyKeys);

var options = {
	mytweets: function() {
		console.log("tweet");
		var params = {screen_name: 'lmanderson89'};
		twitterClient.get('statuses/user_timeline', params, function(error, tweets, response) {
  			if (!error) {
    			for (var i = 0; i < tweets.length; i++) {
					console.log("\n--------------------\n");
					console.log("@lmanderson89: " + tweets[i].text);
					console.log(tweets[i].created_at);
				}
  			} else {
				  console.log("There was an error!");
			}	
		});
	},
	spotifyThisSong: function(songName) {
		console.log("spotify " + songName);
		spotifyClient.search({ type: 'track', query: songName }, function(err, data) {
  			if (err) {
    			return console.log('Error occurred: ' + err);
  			} 
			for (var i = 0; i < 5; i++) {
				var songItem = data.tracks.items[i];
				console.log("\n--------------------\n");
				console.log("Artist: " + songItem.artists[0].name);
				console.log("Song Name: " + songItem.name);
				console.log("Preview URL: " + songItem.preview_url);
				console.log("Album: " + songItem.album.name);
				console.log("\n--------------------\n");				
			}
		});
	},
	movieThis: function(movieName) {
		console.log("movie " + movieName);
		request("http://www.omdbapi.com/?t=" + movieName + "&apikey=40e9cece", function (error, response, body){
			if (!error && response.statusCode === 200) {
				var replace = JSON.parse(body);
				console.log("\n-----------------------\n");
				console.log("Title: " + replace.Title + "\nYear: " + replace.Year + "\nIMDB Rating: " + replace.imdbRating +"\nCountry: " + replace.Country + "\nLanguage: " + replace.Language + "\nPlot: " + replace.Plot + "\nActors: " + replace.Actors + "\nRotten Tomatoes Rating: " + replace.Ratings[1].Value);
				console.log("\n-----------------------\n");
  			} else {
				console.log("There was an error!");
			}
		})
	},
	doWhatItSays: function() {
		fs.readFile("random.txt", "utf8", function(err, data) {
			console.log(data);
			var dataArr = data.split(",");
			console.log(dataArr);
			return dataArr[0];
		})
	},
}

//valuating userInput into console
	switch (process.argv[2]) {
		case "my-tweets":
			options.mytweets();
			break;
		case "spotify-this-song":
			var songName = "";
			//concat songname is more than one word
			for (var i = 3; i < process.argv.length; i++) {
				if (i > 3 && i < process.argv.length) {
					songName = songName + "+" + process.argv[i];
				} else {
					songName = songName + process.argv[i];
				}				
			}
			//insert default song if no user input
			if (songName) {
				options.spotifyThisSong(songName);
			} else {
				options.spotifyThisSong("The+Sign");
			}
			break;
		case "movie-this":
			var movieName = "";
			//concat moviename if more than one word
			for (var i = 3; i < process.argv.length; i++) {
				if (i > 3 && i < process.argv.length) {
					movieName = movieName + "+" + process.argv[i];
				} else {
					movieName = movieName + process.argv[i];
				}
			}
			//insert default movie if no user input
			if (movieName) {
				options.movieThis(movieName);
			} else {
				options.movieThis("Mr.+Nobody");
			}
			break;
		case "do-what-it-says":
			options.doWhatItSays();
			break;	
		default:
		console.log("Please choose a valid option");
			break;
	}


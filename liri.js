var Spotify = require("node-spotify-api");
var axios = require('axios');
var key = require("./key.js");
var request = require("request");
var fs = require("fs");
var moment = require("moment");
var spotify = new Spotify(key.spotify);
var input = process.argv[2];
var search = "";


var inputLine = "";

for (var i = 0; i < process.argv.length; i++) {
  inputLine += (process.argv[i] + " ");
}

for (var i = 3; i < process.argv.length; i++) {
  search += (process.argv[i] + " ");
}

search = search.trim();

switch (input) {
  case "concert-this":
    concertThis();
    break;

  case "spotify-this-song":
    spotifyThis();
    break;

  case "movie-this":
    movieThis();
    break;

  default:
    break;
}

function concertThis() {

  var artist = search
  var bandURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"

  axios.get(bandURL).then(function(results){

    var venue = results.data[0].venue.name
    var location = results.data[0].venue.city
    var date = results.data[0].datetime
    
    console.log('\n============================')
    console.log('Venue: ' + venue)
    console.log('Venue Location: ' + location)
    console.log('Venue Date: ' + moment(date).format('MM/DD'))
    console.log('============================')
  })
  
}

function spotifyThis() {
  if (!search) {
    search = "Red Hot Chili Peppers";
  }
  spotify.search(
    {
      type: "track",
      query: search
    },
    function(err, response) {
      if (err) {
        console.log("err " + err);
      }

      console.log('\n====================')
      console.log('Artist: ' + response.tracks.items[0].artists[0].name)
      console.log('Song: ' + response.tracks.items[0].name)
      console.log('Album: ' + response.tracks.items[0].album.name)
      console.log('====================')
    }
  );
}

function movieThis() {
  if (!search) {
    search = "Nothing";
  }

  request(
    "http://www.omdbapi.com/?t=" + search + "&y=&plot=short&apikey=trilogy",
    function(error, response) {

        var newResponse = response.body.split(',')

        console.log(newResponse)

        console.log('\n========================')
        // console.log("Title: " + response.data)
        console.log("IMDb Rating: ")
        console.log("Rotten Tomato Rating: ")
        console.log("Country: ")
        console.log("Language: ")
        console.log("Plot: ")
        console.log("Actors: ")
        console.log('========================')
   
    }
  );
}




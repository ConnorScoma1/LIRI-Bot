var Spotify = require("node-spotify-api");
var apikey = require("./apikey");
var request = require("request");
var fs = require("fs");
var moment = require("moment");
var spotify = new Spotify(keys.spotify);
var input = process.argv[2];
var search = "";
var data1;
var data2;
var data3;
var data4;
var data5;
var data6;
var data7;
var data8;

var inputLine = "";
for (var i = 0; i < process.argv.length; i++) {
  inputLine += process.argv[i] + " ";
}

for (var i = 3; i < process.argv.length; i++) {
  search += process.argv[i] + " ";
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

  case "do-what-it-says":
    doWhat();
    break;

  default:
    break;
}

function concertThis() {
    if(!search){
        search = "Red Hot Chili Peppers"
    }
    request('https://rest.bandsintown.com/artists' + 
    search + 'event/13722599?app_id=foo&artist=' + 
    search, function(error, response, body) {
        if(JSON.parse(body)[0] === undefined){
            console.log('there is no shows :(')
        } else {
            data1 = search + 'playing at ' + JSON.parse(body)[0].venue +
            ', ' + JSON.parse(body)[0].venue.city  + ', ' + JSON.parse(body)[0]
            .venue.regon + ', ' + JSON.parse(body)[0].venue.country;
            data2 = moment(JSON.parse(body)[0].datetime).format('MM/DD/YYYY')
            console.log(data1)
            console.log(data2)

            logFile();
        }

    })
}


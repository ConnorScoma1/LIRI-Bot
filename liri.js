var Spotify = require("node-spotify-api");
var key = require("./key.js");
var request = require("request");
var fs = require("fs");
var moment = require("moment");
var spotify = new Spotify(key.spotify);
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

  case "do-what-it-says":
    doWhat();
    break;

  default:
    break;
}

function concertThis() {
  if (!search) {
    search = "Red Hot Chili Peppers";
  }
  request(
    "https://rest.bandsintown.com/artists" +
      search +
      "event/13722599?app_id",
    function(error, response, body) {
      if (JSON.parse(body)[0] === undefined) {
        console.log("there is no shows :(");
      } else {
        data1 =
          search +
          "playing at " +
          JSON.parse(body)[0].venue +
          ", " +
          JSON.parse(body)[0].venue.city +
          ", " +
          JSON.parse(body)[0].venue.regon +
          ", " +
          JSON.parse(body)[0].venue.country;
        data2 = moment(JSON.parse(body)[0].datetime).format("MM/DD/YYYY");
        console.log(data1);
        console.log(data2);

        logFile();
      }
    }
  );
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
      data1 =
        "\n Artist: " + JSON.stringify(response.tracks.items[0].artist[0].name);
      data2 =
        "\n Song: " + JSON.stringify(response.tracks.items[0].artist[0].name);
      data3 =
        "\n Album: " + JSON.stringify(response.tracks.items[0].artist[0].album);
      console.log(data1);
      console.log(data2);
      console.log(data3);

      logFile();
    }
  );
}

function movieThis() {
  if (!search) {
    search = "Nothing";
  }
  request(
    "http://www.omdbapi.com/?i=tt3896198&apikey=2dbe22c7=" + search,
    function(error, response, body) {
      if (!error && response.statusCode === 200) {
        data1 = "Title: " + JSON.parse(body).Title;
        data2 = "Release Year: " + JSON.parse(body).Year;
        data3 = "IMDb Rating: " + JSON.parse(body).imdbRating;
        data4 = "Rotten Tomato Rating: " + JSON.parse(body).Rating;
        data5 = "Country: " + JSON.parse(body).Country;
        data6 = "Language: " + JSON.parse(body).Language;
        data7 = "Plot: " + JSON.parse(body).Plot;
        data1 = "Actors: " + JSON.parse(body).Actors;
        console.log(data1);
        console.log(data2);
        console.log(data3);
        console.log(data4);
        console.log(data5);
        console.log(data6);
        console.log(data7);
        console.log(data8);

        logFile();
      }
    }
  );
}

function doWhat() {
    fs.readFile("random.txt", "utf-8", function(error, data){
        if(error) {
            console.log(error)
        }

        var dataArray = data.split(",");
        input = dataArray[0];
        search = dataArray[1];
        spotifyThis()
    })
}

function logFile() {
    fs.appendFile("log.txt", "\r\n" + inputLine + "\r\n" + data1
    + "\r\n" + data2 + "\r\n" + data3 + "\r\n" + data4
    + "\r\n" + data5 + "\r\n" + data6 + "\r\n" + data7
    + "\r\n" + data8, function(error) {
        if(error){
            console.log(error)
        }
    })
}

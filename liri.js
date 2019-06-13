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

  default:
    break;
}

function concertThis() {
  if (!search) {
    search = "Nothing";
  }
  request(
    "http://www.bandsintown.com/event/13722599/buy_tickets?app_id=foo&artist=" + search + "&came_from=67",
    function(error, response) {

        console.log(response)

        // Name of Venue
        // Venue City
        // Venue Region

       
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
    "http://www.omdbapi.com/?i=" + search + "&apikey=2dbe22c7&",
    function(error, response) {
        
        console.log(response)

        console.log('\n========================')
        console.log("Title: ")
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

// function doWhat() {
//     fs.readFile("random.txt", "utf-8", function(error, data){
//         if(error) {
//             console.log(error)
//         }

//         var dataArray = data.split(",");
//         input = dataArray[0];
//         search = dataArray[1];
//         spotifyThis()
//     })
// }



let axios = require("axios");
require("dotenv").config();
let keys = require("./keys.js");

var cmd = process.argv[2];
var search = "";

for(let x = 3; x < process.argv.length; x++) {
    search += process.argv[x];
}

switch(cmd) {

    case 'concert-this':
        concertThis(search);
        break;

    case 'spotify-this-song':

        break;

    case 'movie-this':

        break;

    case 'do-what-it-says':

        break;

}

function concertThis (artist) {
    
    axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
        .then(function (response) {
            // console.log(response);
            
            for(let event of response.data) {
                console.log('\n' + event.venue.name);
                console.log(event.venue.country + ', ' + event.venue.city);
                console.log(event.datetime);
            }
        })
        .catch(function (error) {
            console.log(error);
        });

}
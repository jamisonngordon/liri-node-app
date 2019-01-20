fs = require('fs');
require("dotenv").config();
var axios = require("axios");
var moment = require("moment");
var Spotify = require('node-spotify-api');

var keys = require("./keys.js");

let cmd = process.argv[2];
let search = "";

for(let x = 3; x < process.argv.length; x++) {
    search += process.argv[x] + " ";
}

search.trim();

chooseCommand(cmd, search);

function chooseCommand(cmd, search) {
    switch(cmd) {
    
        case 'concert-this':
            concertThis(search);
            break;
    
        case 'spotify-this-song':
            spotifyThisSong(search);
            break;
    
        case 'movie-this':
            movieThis(search);
            break;
    
        case 'do-what-it-says':
            doWhatItSays();
            break;
    
    }
}

function concertThis (artist) {
    
    axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
        .then(function (response) {
            // console.log(response);
            
            for(let event of response.data) {
                console.log('\n' + event.venue.name);
                console.log(event.venue.country + ', ' + event.venue.city);
                console.log(moment(event.datetime).format('MM/DD/YYYY'));
            }
        })
        .catch(function (error) {
            console.log(error);
        });

}

function spotifyThisSong (song) {

    var spotify = new Spotify(keys.spotify);

    if(!song){
        song = "The Sign Ace of Base";
        spotify.search({type: 'track', query: song, limit: 1}, function(err, data) {
            let song = data.tracks.items[0];
            console.log('\nArtists: ' + song.artists[0].name);
            console.log('Song Title: ' + song.name);
            console.log('Preview Link: ' + song.preview_url);
            console.log('Album: ' + song.album.name);
        });
    }
    else {
        spotify.search({ type: 'track', query: song }, function(err, data) {  
            if (err) {
                return console.log('Error occurred: ' + err);
            }
    
            for(song of data.tracks.items) {       
                let artists = [];
    
                for(artist of song.artists) {
                    artists.push(artist.name) 
                }
    
                console.log('\nArtists: ' + artists.join(', '));
                console.log('Song Title: ' + song.name);
                console.log('Preview Link: ' + song.preview_url);
                console.log('Album: ' + song.album.name);
            }
        });
    }

}

function movieThis(title) {

    if(!title) {
        title = "Mr. Nobody"
    }
    
    axios.get('http://www.omdbapi.com/?apikey=trilogy&t=' + title.replace(/ /g, '+'))
    .then(function (response) {

        let data = response.data;
        console.log('\nTitle: ' + data.Title);
        console.log('Year: ' + data.Year);
        console.log('IMDB Rating: ' + data.imdbRating);

        let rottenTomatoes = data.Ratings[1];
        console.log(rottenTomatoes.Source + ": " + rottenTomatoes.Value);

        console.log('Country: ' + data.Country);
        console.log('Language(s): ' + data.Language);
        console.log('Plot: ' + data.Plot);
        console.log('Actors: ' + data.Actors);
    })
    .catch(function (error) {
        // console.log(error);
    });

}

function doWhatItSays () {
    
    fs.readFile('random.txt', 'utf8', function (err, data) {
        let array = data.split(',');
        let cmd = array[0];
        let search = array[1];

        chooseCommand(cmd, search);
    });

}
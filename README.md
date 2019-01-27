# liri-node-app

LIRI is a comand line app that takes in text commands through the command line and searches various APIS to return helpful information about songs from the [Spotify API](https://www.npmjs.com/package/node-spotify-api), movies from the [OMBD API](http://www.omdbapi.com/), and band concert dates with the [ Bands In Town API](https://manager.bandsintown.com/support/bandsintown-api).

# Getting started
For the app to work, you must first have [node](https://nodejs.org/en/) installed. Then after cloning the repo navigate to the project root and create a file with the name '.env'. This is where you will put your own Spotify API information after siging up [here](https://www.npmjs.com/package/node-spotify-api). The '.env' should look like:
```env
SPOTIFY_ID=<your id>
SPOTIFY_SECRET=<your secret>
```
And just like that the app will be properly configured and ready for use.

# Usage
## To search band concert dates
```sh
node liri.js concert-this <artist/band name here>
```
![alt text](https://github.com/jamisonngordon/liri-node-app/raw/master/images/concert-this.png "concert-this example")
## To search information about songs
```sh
node liri.js spotify-this-song <song name here>
```
![alt text](https://github.com/jamisonngordon/liri-node-app/raw/master/images/spotify-this-song.png "spotify-this-song example")
## To search information about movies
```sh
node liri.js movie-this <movie name here>
```
![alt text](https://github.com/jamisonngordon/liri-node-app/raw/master/images/movie-this.png "movie-this example")
## To run a reusable command
Navigate to and open the 'random.txt' in the project root.\
Using the format
```txt
<liri command>,"<search criteria>"
```
You can set a command that can be run at any time with
```sh
node liri.js movie-this <movie name here>
```


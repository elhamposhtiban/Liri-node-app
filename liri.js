 
const Spotify = require('node-spotify-api');
const api_keys = require("./keys");
const axios = require("axios");
const inquirer = require("inquirer");
const fs = require("fs");
const moment = require("moment");
const present = moment().format("YYYY-MM-DD"); 
const oneyear = moment().add(365, "days").format("YYYY-MM-DD");

const questions = [
   {
       type : "list",
       message: "HI! Welcome to LIRI pick one the items to start your journey with us ..",
       choices : [
           "concert-this",
           "spotify-this-song",
           "movie-this",
           "do-what-it-says"
                ],
       name : "action"
   },

   {
       type : "input",
       message : "what do you want search for",
       name : "search"
   }
]

//////////// declaring spotify api key /////////////
const spotify = new Spotify(api_keys.KEYS.SPOTIFY_API_KEY);


//////////// starting questions /////////////
function start() {
    inquirer.prompt(questions).then(function(inquirerResponse)
 {
     switch (inquirerResponse.action) {
        case "concert-this":
          consert ()
          break;
      
        case "spotify-this-song":
          spotify_search()
          break;
      
        case "movie-this":
          movie()
          break;
      
        case "do-what-it-says":
         anymovie ()
          break;
    } 
  
    
    //////////// movie function/////////////
 
    function movie () {
           let moviename = inquirerResponse.search
            axios
            .get(`http://www.omdbapi.com/?t=${moviename}&y=&plot=short&apikey=${api_keys.KEYS.OMDB_API_KEY}`)
            .then(function(response){
               const result=response.data;
                console.log(
                "\n" + "&*&*&*&*&*&*&*&*&*&*&*&* WELCOME TO LIRI MOVIE  &*&*&*&*&*&*&*&*&*&*&*&*" + "\n" + "\n" +
                 "YOUR ANSWER IS LOADING ...." + "\n")
                console.log("\nThe title of the movie:"+result.Title)
                console.log("\nThe year that movie came out:"+ result.Year)
                console.log("\nIMDB Rating of the movie:"+result.imdbRating)
                console.log("\nRotten Tomatoes Rating of the movie:" +result.Ratings[1].Value)
                console.log("\nCountry where the movie was produced:"+result.Country)
                console.log("\nLanguage of the movie:"+result.Language)
                console.log("\nPlot of the movie:"+result.Plot)
                console.log("\nActors in the movie:"+result.Actors)
        
        })
        .catch(function(err) {
            console.log(err);
        });
    };
 
    //////////// spotify function/////////////
 
    function spotify_search () {
            let songname = inquirerResponse.search
    
    spotify.search({ type: 'track', query: songname, limit: 1 })
           .then(function(response) {
              let song = response.tracks.items
              for (let i=0; i<song.length; i++){
                console.log(
                "\n" + "#*#*#*#*#*#*#*#*#*#*#*#*#*#*#* WELCOME TO LIRI SPOTIFY #*#*#*#*#*#*#*#*#*#*#*#*#*#*#*" + "\n" + "\n" +
                    "YOUR ANSWER IS LOADING ...." + "\n")
                console.log("\n The name of song is :"+song[i].name);
                console.log("\n The name of Artist is :"+song[i].album.artists[0].name);
                console.log("\n The name of Album is :"+song[i].album.name);
                console.log("\n The Spotify Link:"+song[i].external_urls.spotify);
              }
 
               
            })
            .catch(function(err) {
                console.log(err);
            });
    }; 
 
    //////////// consert function/////////////
 
    function consert () {
        let bandsname = inquirerResponse.search
 
        axios
        .get(`https://rest.bandsintown.com/artists/${bandsname}/events?app_id=codingbootcamp&date=${present},${oneyear}`) 
        .then(function (response) {
          const conserts = response.data;
 
        for (let i=0; i<conserts.length; i++){
            let consertTime = conserts[i].datetime;
            let consertDate = moment(consertTime).format("MM-DD-YYYY");
            console.log(
            "\n" + "$ @ $ @ $ @ $ @ $ @ $ @ $ @  WELCOME TO LIRI BANDS IN TOWN $ @ $ @ $ @ $ @ $ @ $ @ $ @" + "\n" + "\n" +
                "YOUR ANSWER IS LOADING ...." + "\n")
            console.log("\nThe consert date is :" +consertDate)
            console.log("\nThe location name is :" +conserts[i].venue.name)
            console.log("\n The city is :" +conserts[i].venue.city) 
            console.log("\nThe state is: " + conserts[i].venue.region)
        }
        })
        .catch(function (error) {
          if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            console.log(error.request);
          } else {
            console.log("Error", error.message);
          }
          console.log(error.config);
        });
    
    };
 });
 
 
 function anymovie () {
 
    fs.readFile("random.txt", "utf8", function (error, choice) {
        if (error) {
          return console.log(error);
        }
        
        const randomMovie =Math.floor(Math.random(choice)*12);
        console.log(randomMovie)
    
      
            axios
            .get(`http://www.omdbapi.com/?t=${randomMovie}&y=&plot=short&apikey=${api_keys.KEYS.OMDB_API_KEY}`)
            .then(function(response){
               const result=response.data;
                console.log(
                "\n" + "&*&*&*&*&*&*&*&*&*&*&*&* WELCOME TO LIRI MOVIE  &*&*&*&*&*&*&*&*&*&*&*&*" + "\n" + "\n" +
                 "YOUR ANSWER IS LOADING ...." + "\n")
                console.log("\nThe title of the movie:"+result.Title)
                console.log("\nThe year that movie came out:"+ result.Year)
                console.log("\nIMDB Rating of the movie:"+result.imdbRating)
                console.log("\nRotten Tomatoes Rating of the movie:" +result.Ratings[1].Value)
                console.log("\nCountry where the movie was produced:"+result.Country)
                console.log("\nLanguage of the movie:"+result.Language)
                console.log("\nPlot of the movie:"+result.Plot)
                console.log("\nActors in the movie:"+result.Actors)
    
        })
        .catch(function(err) {
            console.log(err);
        });
    })
 }
 
 }
 start()



 
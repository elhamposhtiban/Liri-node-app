 
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



 
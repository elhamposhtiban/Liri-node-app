
   require("dotenv").config();
const KEYS = {
    OMDB_API_KEY: process.env.OMDB_API_KEY,
    BANDS_IN_TOWN_API_KEY: process.env.app_id,
    SPOTIFY_API_KEY: {
        id: process.env.SPOTIFY_ID,
      secret: process.env.SPOTIFY_SECRET
     }
} ;
// console.log(KEYS.BANDS_IN_TOWN_API_KEY)

module.exports = {
    KEYS
};
// console.log('this is loaded');
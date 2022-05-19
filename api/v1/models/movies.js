const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieSchema = new Schema ({
    title: String,
    description: String,
    genre: String,
    runtime: String,
    releaseYear: Number,
    cast: String
    

});

const Movie = mongoose.model('Movie', movieSchema)

module.exports = Movie;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieSchema = new Schema ({
    title: String,
    description: String,
    genre: String,
    releaseDate: Date,
    runtime: String
    
});

const Movie = mongoose.model('Movie', movieSechema)

module.exports = Movie;
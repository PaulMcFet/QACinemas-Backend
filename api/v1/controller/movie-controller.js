const MovieNotFoundError = require('../errors/movie-not-found-error.js');
const Movie = require('../v1/models/movies.js');


module.exports = {

getMovies: async (req, res, next) => {
    const movies = await Movie.find({});
    
    res.status(200).json(movies);
},

getMovieById: async (req, res, next) => {
    const id = req.params.id;
    const movie = await Movie.findById(id);
    if (movie) {
        res.status(200).json(movie);
        return; 
}
    next(new MovieNotFoundError(id));
},

create: async (req, res, next) => {
    const movie = new Movie(req.body);
    try {
        await movie.save();
        res.status(200).json(movie);
    } catch (error) {
        next(error);
    }
},

update: async (req, res, next) => {
    const id = req.params.id;
    const updates = req.body;
    const movie = await Movie.updateOne({ _id: id }, updates);

    if (movie) {
        res.status(200).json(movie);
        return;
    }
    next(new MovieNotFoundError(id));
},

delete: async (req, res, next) => {
    const filter = { _id: req.params.id };
    const movie = await Movie.findOneAndDelete(filter);
    if (movie) {
        return res.status(200).json(movie);
    }
    next(new MovieNotFoundError(id));
},

}

const MovieNotFoundError = require('../errors/movie-not-found-error.js');
const Movie = require('../models/movies.js');

const movie1 = new Movie({ 
    title: "Dr Strange",
    description: "In an accident, Stephen Strange, a famous neurosurgeon, loses the ability to use his hands. He goes to visit the mysterious Ancient One to heal himself and becomes a great sorcerer under her tutelage.",
    genre: "Adventure", 
    runtime: "1h 55m",
    releaseYear: 2016,
    cast: "Benedict Cumberbatch, "
})
const movie2 = new Movie({
    title: "Ghostbusters",
    description: "When Peter Venkman, Raymond Stantz and Egon Spengler lose their jobs as scientists, they start an establishment called Ghostbusters to fight the evil ghosts lurking in New York City.",
    genre: "Comedy/ Fantasy", 
    runtime: "1h 45m",
    releaseYear: 1984,
    cast: "Bill Murray"
})
movie1.save();
movie2.save();

module.exports = {

getMovies: async (req, res, next) => {
    const movies = await Movie.find({});
    
    res.status(200).json(movies);
},

getMovieById: async (req, res, next) => {
    const id = req.params.id;
    const movie = await Movie.findById(id).populate('poster', 'image');
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

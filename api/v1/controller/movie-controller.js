const MovieNotFoundError = require('../errors/movie-not-found-error.js');
const Movie = require('../models/movies.js');

const movies = [new Movie({ 
    title: "Dr Strange",
    description: "In an accident, Stephen Strange, a famous neurosurgeon, loses the ability to use his hands. He goes to visit the mysterious Ancient One to heal himself and becomes a great sorcerer under her tutelage.",
    genre: "Adventure", 
    runtime: "1h 55m",
    releaseYear: 2016,
    cast: `Benedict Cumberbatch`

}), new Movie({
    title: "Ghostbusters",
    description: "When Peter Venkman, Raymond Stantz and Egon Spengler lose their jobs as scientists, they start an establishment called Ghostbusters to fight the evil ghosts lurking in New York City.",
    genre: "Comedy/Fantasy", 
    runtime: "1h 45m",
    releaseYear: 1984,
    cast: "Bill Murray"  

})
, new Movie({
    title: "6 Underground",
    description: "Six individuals from all around the globe, each the very best at what they do, have been chosen not only for their skill, but for a unique desire to delete their pasts to change the future.",
    genre: "Action", 
    runtime: "2h 10m",
    releaseYear: 2019,
    cast: "Ryan Reynolds"
})
, new Movie({
    title: "Fantastic Beasts, The Secrets of Dumbledore",
    description: "Professor Albus Dumbledore knows the powerful, dark wizard Gellert Grindelwald is moving to seize control of the wizarding world. Unable to stop him alone, he entrusts magizoologist Newt Scamander to lead an intrepid team of wizards and witches.",
    genre: "Fantasy/Action", 
    runtime: "2h 25m",
    releaseYear: 2022,
    cast: "Eddie Redmayne"
})
, new Movie({
    title: "Jumanji",
    description: "When Spencer goes back into the fantastical world of Jumanji, pals Martha, Fridge and Bethany re-enter the game to bring him home.",
    genre: "Comedy/Fantasy", 
    runtime: "2h",
    releaseYear: 2019,
    cast: "Jack Black"
})
, new Movie({
    title: "Thor Love and Thunder",
    description: "Thor attempts to find inner peace. He must return to action and recruit Valkyrie, Korg, and Jane Foster, who has become the Mighty Thor, to stop Gorr the god Butcher from eliminating all gods.",
    genre: "Action/Fantasy", 
    runtime: "tbc",
    releaseYear: 2022,
    cast: "Chris Hemsworth"
})
, new Movie({
    title: "Belle",
    description: "A high school student becomes a globally beloved singer after entering a fantastic virtual world. ",
    genre: "Anime/Action", 
    runtime: "2h 5m",
    releaseYear: 2022,
    cast: "Kaho Nakamura"
})
]
// movies[1];
Movie.bulkSave(movies);

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

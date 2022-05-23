const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const screeningSchema = new Schema({
    date: Date,
    screenNumber: Number,
    numOfSeats: Number,
    movie: {
        type: Schema.Types.ObjectId,
        ref: 'Movie',
    },

})

const Screening = mongoose.model('Screening', screeningSchema);

module.exports = Screening;
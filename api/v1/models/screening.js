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
    bookings: {
        type: Schema.Types.ObjectId,
        ref: 'Booking'
    }
})

const Screening = mongoose.model('Screening', viewingSchema);

module.exports = Screening;
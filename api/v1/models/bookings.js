const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookingSchema = new Schema({
      movieTitle : String,
      name : String,
      screeningTime : String,
      adultTickets: Number,
      childTickets: Number,
      totalPrice : Number,
    });

Booking = mongoose.model('Booking', BookingSchema);
module.exports = Booking;
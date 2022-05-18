//booking error
const Booking = require('../models/bookings');

module.exports = {

getAllBookings: async (req, res, next) => {
    const bookings = await Booking.find({});
    res.status(200).json(bookings);
},

getBooking: async (req, res, next) => {
    const id = req.params.id;
    const booking = await Booking.findById(id);
    if (booking) {
        res.status(200).json(booking);
        return; 
}
    next(new BookingNotFoundError(id));

},

create:  async (req, res, next) => {
    const booking = new Booking(req.body);
    try {
        await booking.save();
        res.status(200).json(booking);
    } catch (error) {
        next(error);
    }
},

update: async (req, res, next) => {
    const id = req.params.id;
    const updates = req.body;
    const booking = await Booking.updateOne({ _id: id }, updates);

    if (booking) {
        res.status(200).json(booking);
        return;
    }
    next(new BookingNotFoundError(id));
},
}
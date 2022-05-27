module.exports = class BookingNotFoundError extends Error {

    constructor(id) {
        super(`Booking with id ${id} not found`);
        this.id = id;
    }
}
module.exports = class MovieNotFoundError extends Error {

    constructor(id) {
        super(`Movie with id ${id} not found` );
        this.id = id;
    }
}
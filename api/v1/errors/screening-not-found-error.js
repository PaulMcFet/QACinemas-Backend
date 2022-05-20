module.exports = class ScreeningNotFoundError extends Error {

    constructor(id) {
        super(`Screening with id ${id} not found`);
        this.id = id;
    }
}
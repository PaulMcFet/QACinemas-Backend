module.exports = class UsersNotFoundError extends Error {

    constructor(id) {
        super(`User with id ${id} not found`);
        this.id = id;
    }
}
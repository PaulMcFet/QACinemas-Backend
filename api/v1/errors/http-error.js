module.exports = class HttpError extends Error {

    constructor(error, statusCode) {
        super(error.message);
        this.data = { error };
        this.statusCode = statusCode;
    }
}
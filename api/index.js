const express = require("express");
const morgan = require("morgan");
const nodemailer = require("nodemailer");
const mongoose = require("mongoose");
const HttpError = require('./v1/errors/http-error');
const MovieNotFoundError = require('./v1/errors/movie-not-found-error');
const BookingNotFoundError = require('./v1/errors/booking-not-found-error');
const ScreeningNotFoundError = require('./v1/errors/screening-not-found-error');
const UserNotFoundError = require('./v1/errors/user-not-found-error');
const authenticationRouter = require('./v1/route/authentication-router')
const roleRouter = require('./v1/route/role-router');
const movieRouter = require('./v1/route/movie-router');
const bookingRouter = require('./v1/route/booking-router');
const screeningRouter = require('./v1/route/screening-router')
const userRouter = require('./v1/route/user-router');
const emailRouter = require('./v1/route/email-router')
const cors = require('cors');

const DB_URI = process.env.DB_URI || "mongodb://127.0.0.1:27017/qa-cinemas";
const PORT = process.env.PORT || 3000;
const app = express();


// Environment Config
if (process.env.NODE_ENV === "PRODUCTION") {
    console.log("=== PRODUCTION ===");
    app.use(morgan('combined'));
} else {
    console.log("=== DEVELOPMENT ===");
    app.use(morgan('dev'));
}

const corsConfig = {
    credentials: true,
    origin: true,
}

// Built in middleware
app.use(cors(corsConfig));
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static("public"));


// Router level middleware
app.use(authenticationRouter);
app.use("/role", roleRouter);
app.use("/movie", movieRouter);
app.use("/email", emailRouter);
app.use("/booking", bookingRouter);
app.use("/screening", screeningRouter);
app.use("/user", userRouter);


// Error handler middleware
app.use((error, request, response, next) => {
    console.error(error.message);

    if (!(error instanceof HttpError)) {
        if (error instanceof MovieNotFoundError) {
            error = new HttpError(error, 404);
        } else if (error.name === "ValidationError") {
            error = new HttpError(error, 400);
        } else {
            error = new HttpError(new Error("Something went wrong..."), 500)
        }
    }
    return response.status(error.statusCode).json({
        message: error.message,
        data: error.data
    })
});

async function main() {
    await mongoose.connect(DB_URI, { useNewUrlParser: true })
                  .then(() => console.log(`DB Connected: ${DB_URI}`));
    
    const db = mongoose.connection;

    db.on('error', console.error.bind(console, 'MongoDB connection error'));
    db.on('connection', console.log.bind(console, 'MongoDB connection successful'));

    // Server start up
    const server = app.listen(PORT, function() {
        console.log(`Server up on PORT: ${PORT}`);
    });
}

main();
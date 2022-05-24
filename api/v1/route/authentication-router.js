const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const User = require('../models/users');
const jwtUtils = require('../config/JwtUtils');
const { authenticationMiddleware } = require('../config/JwtUtils');
const expiration = jwtUtils.JWT_TIMEOUT;


router.post('/refresh', authenticationMiddleware, async (request, response, next) => {
    const users = request.User;
    const token = jwtUtils.generateAccessToken(User.email, User.role);
    response.setHeader('Authorization', token);
    return response.status(200).json({ token, expiration, users });
});


router.post('/register', async (request, response, next) => {
    try {
        const users = new User({ ...request.body });

        const isUser = await User.findOne({ $or: [
            { email: user.email }
        ]});

        if (isUser) {
            return response.status(409).send("Email already exists!");
        }

        await users.save();

        return response.status(201).json(`User ${User.email} created successfully, please log in.`);
    } catch (err) {
        return next(err);
    }
});


router.post('/login', async (request, response, next) => {
    try {
        const { email, password } = request.body;

        if (!(email) || !(password)) {
            return response.status(400).send("Incomplete login fields.");
        }

        // ensure to select the pw from the db for the comparison
        const users = await User.findOne({ email }).select('+password');

        if (User) {
            if (await bcrypt.compare(password, users.password)) {
                users.password = undefined;
                const token = jwtUtils.generateAccessToken(User.email, User.role);
                response.setHeader('Authorization', token);

                return response.status(200).json({ token, expiration, User });
            }
        }
        return response.status(400).send("Invalid login details.");

    } catch (err) {
        return next(err);
    }
});

module.exports = router;
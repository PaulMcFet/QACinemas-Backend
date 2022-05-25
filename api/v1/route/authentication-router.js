const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const User = require('../models/users');
const jwtUtils = require('../config/JwtUtils');
const { authenticationMiddleware } = require('../config/JwtUtils');
const expiration = jwtUtils.JWT_TIMEOUT;


router.post('/refresh', authenticationMiddleware, async (request, response, next) => {
    const user = request.user;
    const token = jwtUtils.generateAccessToken(user.username, user.role);
    response.setHeader('Authorization', token);
    return response.status(200).json({ token, expiration, user });
});


router.post('/register', async (request, response, next) => {
    try {
        const user = new User({ ...request.body });

        const isUser = await User.findOne({ $or: [
            { username: user.username },
            { email: user.email }
        ]});

        if (isUser) {
            return response.status(409).send("User already exists!");
        }

        await user.save();

        return response.status(201).json(`User ${user.username} created successfully, please log in.`);
    } catch (err) {
        return next(err);
    }
});


router.post('/login', async (request, response, next) => {
    try {
        const { username, password } = request.body;

        if (!(username) || !(password)) {
            return response.status(400).send("Incomplete login fields.");
        }

        // ensure to select the pw from the db for the comparison
        const user = await User.findOne({ username }).select('+password');

        if (user) {
            if (await bcrypt.compare(password, user.password)) {
                user.password = undefined;
                const token = jwtUtils.generateAccessToken(user.username, user.role);
                response.setHeader('Authorization', token);

                return response.status(200).json({ token, expiration, user });
            }
        }
        return response.status(400).send("Invalid login details.");

    } catch (err) {
        return next(err);
    }
});

module.exports = router;
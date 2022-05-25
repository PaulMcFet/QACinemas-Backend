const express = require('express');
const router = express.Router();
const { authenticationMiddleware, isAdmin } = require('../config/JwtUtils');

router.get('/', (request, response) => {
    response.send("For all to see");
});

router.get('/members', authenticationMiddleware, (request, response) => {
    response.send("Welcome, this is a member only zone!");
});

router.get('/admin', authenticationMiddleware, isAdmin, (request, response) => {
    response.send("Welcome, this is an admin only zone!");
});

module.exports = router;
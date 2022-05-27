const express = require('express');

const emailController = require('../controller/email-controller.js');
const router = express.Router();

router.post('/',emailController.sendEmail);

module.exports = router;
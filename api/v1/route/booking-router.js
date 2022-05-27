const express = require('express');

const bookingsController = require ('../controller/booking-controller.js');
const router = express.Router();

router.get('/', bookingsController.getAllBookings);
router.get('/:id', bookingsController.getBooking);
router.post('/', bookingsController.create);
router.put('/:id', bookingsController.update);
router.delete('/:id', bookingsController.delete);

module.exports = router;
const express = require('express');

const screeningController = require('../controller/screening-controller.js');
const router = express.Router();

router.get('/', screeningController.getAll);
router.get('/:id', screeningController.getById);
router.post('/', screeningController.create);
router.put('/:id', screeningController.update);
router.delete('/:id', screeningController.delete);

module.exports = router;
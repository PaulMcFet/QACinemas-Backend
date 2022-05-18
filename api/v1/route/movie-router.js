const express = require('express');

const movieController = require ('../controller/movie-controller');
const router = express.Router();

router.get('/', movieController.getMovies);
router.get('/:id', movieController.getMovieById);
router.post('/', movieController.create);
router.put('/:id', movieController.update);
router.delete('/:id', movieController.delete)

module.exports = router;
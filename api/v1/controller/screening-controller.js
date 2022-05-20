const ScreeningNotFoundError = require('../errors/screening-not-found-error.js');
const Screening = require('../models/screening.js');

module.exports = {

getAll: async (req, res, next) => {
    const screenings = await Screening.find({});
    res.status(200).json(screenings);
},

getById: async (req, res, next) => {
    const id = req.params.id;
    const screening = await Screening.findById(id);
    if (screening) {
        res.status(200).json(screening);
        return; 
}
    next(new ScreeningNotFoundError(id));
},

create: async (req, res, next) => {
    const screening = new Screening(req.body);
    try {
        await screening.save();
        res.status(200).json(screening);
    } catch (error) {
        next(error);
    }
},

update: async (req, res, next) => {
    const id = req.params.id;
    const updates = req.body;
    const screening = await Screening.updateOne({ _id: id }, updates);

    if (screening) {
        res.status(200).json(screening);
        return;
    }
    next(new ScreeningNotFoundError(id));
},

delete: async (req, res, next) => {
    const filter = { _id: req.params.id };
    const screening = await Screening.findOneAndDelete(filter);
    if (screening) {
        return res.status(200).json(screening);
    }
    next(new ScreeningNotFoundError(id));
},

}
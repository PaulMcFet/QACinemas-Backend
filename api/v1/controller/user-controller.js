const UsersNotFoundError = require('../errors/user-not-found-error.js');
const User = require('../models/users');

module.exports = {

    getUsers: async (req, res, next) => {
        const users = await User.find({});
        
        res.status(200).json(users);
    },
    
    getUserById: async (req, res, next) => {
        const id = req.params.id;
        const user = await User.findById(id);
        if (user) {
            res.status(200).json(user);
            return; 
    }
        next(new UserNotFoundError(id));
    },
    
    create: async (req, res, next) => {
        const user = new User(req.body);
        try {
            await user.save();
            res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    },
    
    update: async (req, res, next) => {
        const id = req.params.id;
        const updates = req.body;
        const user = await User.updateOne({ _id: id }, updates);
    
        if (user) {
            res.status(200).json(user);
            return;
        }
        next(new UserNotFoundError(id));
    },
    
    delete: async (req, res, next) => {
        const filter = { _id: req.params.id };
        const user = await User.findOneAndDelete(filter);
        if (user) {
            return res.status(200).json(user);
        }
        next(new UserNotFoundError(id));
    },

}


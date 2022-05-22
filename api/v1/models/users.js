const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema ({
firstName: {
    type: String,
    required: true,
    trim: true
},

lastName: {
    type: String,
    required: true,
    trim: true
}




});

const User = mongoose.model('User', userSchema)

module.exports = User;
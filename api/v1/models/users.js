const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

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
},

email: {
    type: String,
    required: true,
    trim: true
},

password: {
    type: String, 
    required: true,
    trim: true,
    select: false

},

role: {
    type: String,
    enum: ['ADMIN', 'MEMBER'],
    default: 'MEMBER'
}

});

userSchema.pre ('save', async function (next) {
    if (this.password && this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 8);
    }
    next();

})

const User = mongoose.model('User', userSchema)
module.exports = User;
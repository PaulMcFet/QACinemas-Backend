const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const userSchema = new Schema ({

username: {
    type: String,
    default: null,
    required: [true, 'Username must be a minimum of 6 characters in length'],
    minlength: 6,
    maxlength: 32,
    trim: true,
    unique: true
},


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
    minlength: 6,
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
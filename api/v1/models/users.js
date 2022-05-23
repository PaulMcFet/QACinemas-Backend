const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

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
    trim: true

},

admin: {
    type: Boolean,
    default: false
}

});

userSchema.pre ('save', async function (next){
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.password, salt);
        this.password = hashedPassword;
        next();
    } catch (error) {
        next(error)
    }
})

const User = mongoose.model('User', userSchema)
module.exports = User;
var mongoose = require('mongoose');
var { Schema } = mongoose;

var userSchema = new Schema({
    name: String,
    picture: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: false
    },
    googleId: String,
    facebookId: String
});

var User = mongoose.model('users', userSchema);
module.exports = User;
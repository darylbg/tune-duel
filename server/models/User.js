const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: [true, 'username is already used']
    },
    score: Number,
    dateTime: Date
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
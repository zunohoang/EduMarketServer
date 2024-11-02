const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    avt: {
        type: String,
    },
    born: {
        type: Number,
    },
    description: {
        type: String,
    }
    , username: {
        type: String,
        unique: true,
    },
    coursesJoined: {
        type: Array,
        ref: 'Course',
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
    },
    phone: {
        type: String,
    },
    role: {
        type: String,
    },
    address: {
        type: String,
    }
});

module.exports = mongoose.model('User', userSchema);

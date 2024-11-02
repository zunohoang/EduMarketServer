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
        required: true,
    },
    description: {
        type: String,
    }
    , username: {
        type: String,
        required: true,
        unique: true,
    },
    coursesJoined: {
        type: Array,
        ref: 'Course',
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    role: {
        type: String,
    },
    address: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('User', userSchema);

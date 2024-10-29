const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    coursesJoined: {
        type: Array,
        required: true,
    },
    courseAuthor: {
        type: Array,
        required: true,
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
        required: true,
    },
    address: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('User', userSchema);

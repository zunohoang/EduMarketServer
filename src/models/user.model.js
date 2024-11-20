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
        type: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Course',
            }
        ],
        default: [],
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
    },
    refreshToken: {
        type: String,
    },
});

module.exports = mongoose.model('User', userSchema);

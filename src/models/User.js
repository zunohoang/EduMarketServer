const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName: { type: String },
    username: { type: String, unique: true },
    email: { type: String, unique: true },
    role: { type: String, default: 'STUDENT' },
    password: { type: String },
});

const User = mongoose.model('User', userSchema);
module.exports = User;
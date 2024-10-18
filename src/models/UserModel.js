const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String },
    username: { type: String, unique: true },
    email: { type: String, unique: true },
    role: { type: String, default: 'student' },
    password: { type: String },
});

const User = mongoose.model('User', userSchema);
module.exports = User;

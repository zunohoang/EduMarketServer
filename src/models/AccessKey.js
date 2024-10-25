const mongoose = require('mongoose');

const accessKeySchema = new mongoose.Schema({
    key: {
        type: String,
        required: true,
        unique: true,
    },
    status: {
        type: Boolean,
        default: false,
    },
    courses: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
    ],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const AccessKey = mongoose.model('AccessKey', accessKeySchema);
module.exports = AccessKey;
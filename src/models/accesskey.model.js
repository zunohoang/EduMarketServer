const mongoose = require('mongoose');
const { use } = require('../routes');

const accesskeySchema = new mongoose.Schema({
    key: {
        type: String,
        required: true,
        unique: true,
    },
    courses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course',
        }
    ],
    usedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    status: {
        type: Boolean,
        required: true,
    },
    createdAt: {
        type: Number,
        default: Date.now(),
    },
    expired: {
        type: Number,
        default: Date.now() + 24 * 60 * 60 * 1000,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
});

module.exports = mongoose.model('Accesskey', accesskeySchema);

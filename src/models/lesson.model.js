const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    url: {
        type: String,
    },
    description: {
        type: String,
    },
    document: {
        type: String,
    },
});

module.exports = mongoose.model('Lesson', lessonSchema);
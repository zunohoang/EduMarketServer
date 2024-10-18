const mongoose = require('mongoose');

const courseModel = new mongoose.Schema({
    title: { type: String },
    description: { type: String },
    price: { type: Number },
    instructor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    category: [{ type: String }],
    image: { type: String },
    rating: { type: Number },
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    lessons: [{
        title: { type: String },
        description: { type: String },
        part: { type: Number },
        video: { type: mongoose.Schema.Types.ObjectId, ref: 'Video' },
        duration: { type: Number },
        isFree: { type: Boolean },
        isPublished: { type: Boolean },
        publishedAt: { type: Date },
        publishedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    }],
    dateCreated: { type: Date, default: Date.now },
    lastUpdated: { type: Date, default: Date.now },
    isPublished: { type: Boolean },
    publishedAt: { type: Date },
    publishedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const course = mongoose.model('Course', courseModel);
module.exports = course;
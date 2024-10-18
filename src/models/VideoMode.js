const mongoose = require('mongoose');

const videoShcema = new mongoose.Schema({
    title: { type: String },
    image: { type: String },
    description: { type: String },
    url: { type: String },
    duration: { type: Number },
    dateCreated: { type: Date, default: Date.now },
    lastUpdated: { type: Date, default: Date.now },
    isPublished: { type: Boolean },
    publishedAt: { type: Date },
    publishedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});


const Video = mongoose.model('Video', videoShcema);
module.exports = Video;
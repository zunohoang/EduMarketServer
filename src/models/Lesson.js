const mongoose = require('mongoose');

const videoShcema = new mongoose.Schema({
    title: { type: String },
    description: { type: String },
    image: { type: String },
    part: { type: Number },
    videoUrl: { type: String },
    duration: { type: Number },
    isFree: { type: Boolean },
    isPublished: { type: Boolean },
    publishhedAt: { type: Date },
    publishedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});


const Video = mongoose.model('Lesson', videoShcema);
module.exports = Video;
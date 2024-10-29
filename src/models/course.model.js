const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    category: {
        type: Array,
        required: true,
    },
    sections: {
        type: [
            {
                title: {
                    type: String,
                    required: true,
                },
                lessons: {
                    type: [
                        {
                            title: {
                                type: String,
                                required: true,
                            },
                            url: {
                                type: String,
                                required: true,
                            },
                            discription: {
                                type: String,
                                required: true,
                            },
                            time: {
                                type: Number,
                                required: true,
                            },
                        },
                    ],
                    required: true,
                },
            },
        ],
        required: true,
    },
});

module.exports = mongoose.model('Course', courseSchema);
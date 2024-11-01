const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    student: {
        type: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            }
        ]
    },
    status: {
        type: Boolean,
        required: true,
    },
    fee: {
        type: String,
        required: true,
    },
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    category: {
        type: Array,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    sections: {
        type: [
            {
                title: {
                    type: String,
                },
                lessons: {
                    type: [
                        {
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
                        },
                    ],
                },
            },
        ],
    },
});

module.exports = mongoose.model('Course', courseSchema);
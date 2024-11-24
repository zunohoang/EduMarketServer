const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    sender: {
        type: {
            username: String,
            role: String
        },
        required: true
    },
    receiver: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;
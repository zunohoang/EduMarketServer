
class MessageDTO {
    constructor(_id, sender, room, content, timestamp) {
        this._id = _id;
        this.sender = sender;
        this.room = room;
        this.content = content;
        this.timestamp = timestamp;
    }
}

module.exports = MessageDTO;
const ChatService = require('../services/chat.service');

class ChatController {
    static instance = new ChatController();

    static getInstance() {
        if (!ChatController.instance) {
            ChatController.instance = new ChatController();
        }
        return ChatController.instance;
    }

    constructor() {
        this.chatService = ChatService;
    }

    async getChats(req, res) {
        try {

            if (req.query.username) {
                const chats = await ChatService.getChatsOfUser(req.query.username);
                return res.status(200).json({
                    status: true,
                    data: {
                        chats
                    }
                });
            }

            const chats = await ChatService.getChats();
            console.log('getChats');
            res.status(200).json({
                status: true,
                data: {
                    chats
                }
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = ChatController.getInstance();
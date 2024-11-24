const Chat = require("../models/chat.model");

class ChatService {
  static instance = new ChatService();

  static getInstance() {
    if (!ChatService.instance) {
      ChatService.instance = new ChatService();
    }
    return ChatService.instance;
  }

  constructor() {
    this.chat = Chat;
  }

  async createChat({ content, sender, receiver }) {
    try {
      const newChat = new this.chat({ content, sender, receiver });
      await newChat.save();
      return newChat;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getChats() {
    try {
      const chats = await this.chat.find().sort({ createdAt: -1 });
      // lay ra nhung nguoi chat gan day nhat
      //    { id: 1, name: 'nguyenvanhoang2005nt', status: 'online', lastMessage: 'Xin chào thầy' },
      const chatsCur = {};
      const usersSet = new Set();
      for (const chat of chats) {
        if (usersSet.has(chat.sender.username)) continue;
        if (chat.sender.role != 'STUDENT') continue;
        chatsCur[chat.sender.username] = {
          id: chat.sender.username,
          sender: chat.sender,
          messages: [
            {
              content: chat.content,
              createdAt: chat.createdAt,
              sender: chat.sender,
            }
          ],
        }
        usersSet.add(chat.sender.username);
      }
      return chatsCur;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getChatsOfUser(username) {
    try {
      console.log(username);
      const chats = await this.chat.find({
        $or: [
          { 'sender.username': username },
          { receiver: username }
        ]
      }).sort({ createdAt: 1 });
      return chats;
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteChat(id) {
    try {
      await this.chat.findByIdAndDelete(id);
      return true;
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteAllChats() {
    try {
      await this.chat.deleteMany();
      return true;
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = ChatService.getInstance();
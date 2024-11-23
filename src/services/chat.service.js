const Chat = require("../models/chat.model");

class ChatService {
  static instance;

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

  async getChats(receiver) {
    try {
      const chats = await this.chat.find({ receiver });
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
const chatService = require('../services/chat.service');
const jwtService = require('../services/jwt.service');
const redisService = require('../services/redis.service');
const userService = require('../services/user.service');

class SocketManager {
    constructor(io) {
        this.io = io;
        this.chatService = chatService;
        this.jwtService = jwtService;
        this.userService = userService
        this.usernameToSocketId = new Map();
        this.adminSocketId = new Map();

        this.setupConnection();
    }

    setupConnection() {

        this.io.use((socket, next) => {
            try {
                const authorization = socket.handshake.headers.authorization;
                if (!authorization) {
                    return next(new Error('Unauthorized'));
                }

                const accessToken = authorization.split(' ')[1];
                const user = this.jwtService.verifyToken(accessToken);


                console.log(user);

                if (!user) {
                    return next(new Error('Unauthorized'));
                }

                socket.user = user;
                return next();
            } catch (error) {
                return next(new Error('Unauthorized'));
            }

        });

        this.io.on('connection', (socket) => {
            console.log(`Người dùng ${socket.id} (${socket.user.username}) đã kết nối`);

            if (["ADMIN", "TEACHER", "COLLABORATOR"].includes(socket.user.role)) {
                this.adminSocketId[socket.user.username] = socket.id;
            } else {
                this.usernameToSocketId[socket.user.username] = socket.id; // luu anh xa
            }

            // Gửi tin nhắn đến phòng cụ thể
            socket.on('chat_message', async (message) => {

                if (!message) return;
                if (!message.content) return;

                console.log(message);

                if (["ADMIN", "TEACHER", "COLLABORATOR"].includes(socket.user.role)) {
                    const receiver = await userService.getUserByUsername({ username: message.receiver });
                    if (!receiver) return;

                    const newChat = await chatService.createChat({
                        content: message.content,
                        sender: socket.user.username,
                        receiver: message.receiver
                    });

                    console.log("ADMIN send: " + newChat);
                    this.io.to(this.usernameToSocketId[message.receiver]).emit('chat_message', newChat);
                    for (const admin in this.adminSocketId) {
                        this.io.to(this.adminSocketId[admin]).emit('chat_message', newChat);
                    }
                    return;
                }

                message.receiver = 'ADMIN';
                message.sender = socket.user.username;
                const newChat = await chatService.createChat({
                    content: message.content,
                    sender: message.sender,
                    receiver: message.receiver
                });
                // console.log(newChat);

                this.io.to(this.usernameToSocketId[socket.user.username]).emit('chat_message', newChat);

                for (const admin in this.adminSocketId) {
                    this.io.to(this.adminSocketId[admin]).emit('chat_message', newChat);
                }

            });

            // Xử lý ngắt kết nối
            socket.on('disconnect', () => {
                console.log(`Người dùng ${socket.id} đã ngắt kết nối`);
                if (socket.user.role == "STUDENT") delete this.usernameToSocketId[socket.user.username];
                if (socket.user.role != "STUDENT") delete this.adminSocketId[socket.user.username];
                this.socketService.removeSocketFromAllRooms(socket);
            });
        });
    }
}

module.exports = SocketManager;
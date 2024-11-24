require('dotenv').config();
const http = require('http');
const app = require('./src/app');
const { Server } = require('socket.io');
const SocketManager = require('./src/websocket/socketManager');

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*', // Cấu hình CORS phù hợp với ứng dụng của bạn
        methods: ['GET', 'POST']
    }
});

const port = process.env.PORT || 5000;

new SocketManager(io);

server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

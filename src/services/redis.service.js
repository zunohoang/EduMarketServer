const redis = require('redis');
const redisConfig = require('../configs/redis.config');
const logger = require('../utils/logger');

class RedisService {
    static instance;

    constructor() {
        if (RedisService.instance) {
            return RedisService.instance;
        }

        this.client = redis.createClient(redisConfig);
        this.connect();

        RedisService.instance = this;
    }

    async connect() {
        try {
            await this.client.connect();
            console.log(`Redis connected to ${redisConfig.socket.host}:${redisConfig.socket.port}`);
        } catch (err) {
            console.error('Redis connection error:', err);
        }

        this.client.on('error', (err) => {
            console.error('Redis error:', err);
        });
    }

    // Lấy giá trị từ Redis
    async get(key) {
        try {
            if (!this.client.isOpen) {
                await this.connect();
            }
            const value = await this.client.get(key);
            // logger(this, value);
            return value ? JSON.parse(value) : null;
        } catch (err) {
            console.error(`Error getting key "${key}" from Redis:`, err);
            throw err;
        }
    }

    // Lưu giá trị vào Redis
    async set(key, value, ttl = null) {
        try {
            if (!this.client.isOpen) {
                await this.connect();
            }
            if (ttl === null) {
                await this.client.set(key, JSON.stringify(value));
                return;
            }
            await this.client.setEx(key, ttl, JSON.stringify(value));
        } catch (err) {
            console.error(`Error setting key "${key}" in Redis:`, err);
            throw err;
        }
    }

    // Xóa giá trị khỏi Redis
    async del(key) {
        try {
            if (!this.client.isOpen) {
                await this.connect();
            }
            await this.client.del(key);
        } catch (err) {
            console.error(`Error deleting key "${key}" from Redis:`, err);
            throw err;
        }
    }
}

// Xuất instance duy nhất của RedisService
module.exports = new RedisService();

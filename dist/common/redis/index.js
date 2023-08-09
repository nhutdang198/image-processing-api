"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisSerivce = void 0;
const redis_1 = require("redis");
class RedisServiceClass {
    async connect() {
        RedisServiceClass.client = (0, redis_1.createClient)({
            name: process.env.REDIS_CONNECTION_NAME,
            username: process.env.REDIS_USERNAME,
            password: process.env.REDIS_PASSWORD,
            socket: {
                host: process.env.REDIS_HOST,
                port: parseInt(process.env.REDIS_PORT)
            }
        });
        RedisServiceClass.client.on('error', (err) => console.log('Redis Client Error', err));
        await RedisServiceClass.client.connect();
    }
    async quit() {
        await RedisServiceClass.client.quit();
    }
    getClient() {
        return RedisServiceClass.client;
    }
}
exports.redisSerivce = new RedisServiceClass();

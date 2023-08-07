"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisSerivce = void 0;
const redis_1 = require("redis");
class RedisServiceClass {
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
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
            yield RedisServiceClass.client.connect();
        });
    }
    quit() {
        return __awaiter(this, void 0, void 0, function* () {
            yield RedisServiceClass.client.quit();
        });
    }
    getClient() {
        return RedisServiceClass.client;
    }
}
exports.redisSerivce = new RedisServiceClass();

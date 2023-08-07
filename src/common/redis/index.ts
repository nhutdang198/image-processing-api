import { RedisClientType } from '@redis/client';
import { createClient } from 'redis';

class RedisServiceClass {
  static client: RedisClientType;
  async connect() {
    RedisServiceClass.client = createClient({
      name: process.env.REDIS_CONNECTION_NAME,
      username: process.env.REDIS_USERNAME,
      password: process.env.REDIS_PASSWORD,
      socket: {
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT as string)
      }
    });
    RedisServiceClass.client.on('error', (err) =>
      console.log('Redis Client Error', err)
    );
    await RedisServiceClass.client.connect();
  }

  async quit() {
    await RedisServiceClass.client.quit();
  }

  getClient() {
    return RedisServiceClass.client;
  }
}

export const redisSerivce = new RedisServiceClass();

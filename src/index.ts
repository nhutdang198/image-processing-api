import 'reflect-metadata';
import 'dotenv/config';
import * as express from 'express';
import * as path from 'path';
import { Express, Request, Response, NextFunction } from 'express';
import imageRouters from './modules/images/image.route';
import { redisSerivce } from './common/redis';

redisSerivce.connect();
const app: Express = express.default();
app.use('/static', express.static(path.join(__dirname, 'public/images')));
app.use((request: Request, response: Response, next: NextFunction) => {
  const date = new Date();
  const day: number = date.getDate();
  const month: number = date.getMonth() + 1;
  const year: number = date.getFullYear();
  const hour: number = date.getHours();
  const minute: number = date.getMinutes();
  const second: number = date.getSeconds();
  const time = `[${year}/${month}/${day} ${hour}:${minute}:${second}]`;
  console.log(time + ' ' + request.method + ' ' + request.url);
  next();
});
app.use(imageRouters);
app.listen(3000, () => {
  console.log('listening on port 3000');
});

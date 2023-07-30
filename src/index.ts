import * as express from 'express';
import { Express, Request, Response, NextFunction } from 'express';
import imageRouters from './modules/images/image.route';

const app: Express = express.default();

app.use((request: Request, response: Response, next: NextFunction) => {
  console.log('logging');
  next();
});

app.use(imageRouters);

app.listen(3000, () => {
  console.log('listening on port 3000');
});

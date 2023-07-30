import { Router } from 'express';
import imageController from './image.controller';

const routers = Router();

routers.get('/images', [imageController.resizeOneImage]);

export default routers;

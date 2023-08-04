import { Router } from 'express';
import imageController from './image.controller';
import validateQuery from '../../common/middlewares/validate.middleware';
import { ResizeImageQuery } from './dtos/resize-image-query.dto';

const routers = Router();

routers.get(
  '/images',
  validateQuery(ResizeImageQuery),
  imageController.resizeOneImage
);

export default routers;

import { Request, Response } from 'express';
import imageService from './image.service';
import ResizeImageQuery from './dtos/resize-image-query.dto';

class ImageControllerClass {
  resizeOneImage = (request: Request, response: Response) => {
    const resizeImageQuery: ResizeImageQuery | any = request.query;
    const image: string = imageService.resizeOneImage(resizeImageQuery);
    response.send(image);
  };
}

const imageController = new ImageControllerClass();
export default imageController;

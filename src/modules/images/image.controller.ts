import { Request, Response } from 'express';
import imageService from './image.service';
import fs from 'fs';
import path from 'path';
import { ResizeImageQuery } from './dtos/resize-image-query.dto';
import { redisSerivce } from '../../common/redis';

class ImageControllerClass {
  resizeOneImage = async (
    request: Request,
    response: Response
  ): Promise<Response> => {
    const query = request.query as never;
    const resizeImageQuery: ResizeImageQuery = query;
    const { filename = '', height = 0, width = 0 } = resizeImageQuery;
    const redis = redisSerivce.getClient();
    const key: string =
      'IMAGE:NAME:' + filename + ':HEIGHT:' + height + ':WIDTH:' + width;
    const cachedPath = await redis.get(key);
    if (cachedPath) {
      try {
        const imageBuffer: Buffer = fs.readFileSync(cachedPath);
        response.set('Content-Type', 'image/jpeg');
        return response.end(imageBuffer);
      } catch (error) {}
    }
    const imageExtention: string = '.jpg';
    const imageFolder: string = path.join('static', 'public', 'images');
    const imagePath: string = path.join(imageFolder, filename + imageExtention);
    let responseImage: string = imagePath;
    if (height || width) {
      try {
        let resizeName: string = '';
        if (height) {
          resizeName += '-height-' + height;
        }
        if (width) {
          resizeName += '-width-' + width;
        }
        const newImagePath: string = path.join(
          imageFolder,
          filename + resizeName + imageExtention
        );
        responseImage = newImagePath;
        await imageService.resizeOneImage(
          imagePath,
          newImagePath,
          +height,
          +width
        );
      } catch (error) {
        return response.status(404).end('image not found');
      }
    }
    try {
      const imageBuffer: Buffer = fs.readFileSync(responseImage);
      response.set('Content-Type', 'image/jpeg');
      await redis.set(key, responseImage);
      return response.end(imageBuffer);
    } catch (error) {
      return response.status(404).end('image not found');
    }
  };
}

const imageController = new ImageControllerClass();
export default imageController;

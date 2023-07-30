import { Request, Response } from 'express';
import imageService from './image.service';
import fs from 'fs';
import path from 'path';

class ImageControllerClass {
  resizeOneImage = async (request: Request, response: Response) => {
    const resizeImageQuery = request.query;
    const { filename = '', height = 0, width = 0 } = resizeImageQuery;
    const imageFolder: string = path.join('static', 'public', 'images');
    const imagePath: string = path.join(imageFolder, filename + '.jpg');
    let responseImage: string = imagePath;
    if (height && width) {
      try {
        const newImagePath: string = path.join(
          imageFolder,
          filename + '-height-' + height + '-width-' + width + '.jpg'
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
      return response.end(imageBuffer);
    } catch (error) {
      return response.status(404).end('image not found');
    }
  };
}

const imageController = new ImageControllerClass();
export default imageController;
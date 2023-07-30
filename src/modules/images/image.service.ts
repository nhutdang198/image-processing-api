import { readFileSync } from 'fs';
import sharp from 'sharp';

class ImageServiceClass {
  resizeOneImage = async (
    imagePath: string,
    newImagePath: string,
    height: number,
    width: number
  ) => {
    return await sharp(imagePath).resize(height, width).toFile(newImagePath);
  };

  readImage(imagePath: string): Buffer {
    return readFileSync(imagePath);
  }
}
const imageService = new ImageServiceClass();
export default imageService;

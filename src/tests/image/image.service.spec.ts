import path from 'path';
import imageService from '../../modules/images/image.service';

describe('resize image service testing', () => {
  it('should resize an image', async () => {
    const imageFolder: string = path.join('static', 'public', 'images');
    const imagePath: string = path.join(imageFolder, 'fjord.jpg');
    const height: number = 500;
    const width: number = 500;
    const newImagePath = path.join(
      imageFolder,
      'fjord-height-' + height + '-width-' + width + '.jpg'
    );
    const imageInfo = await imageService.resizeOneImage(
      imagePath,
      newImagePath,
      height,
      width
    );
    expect(imageInfo.format).toBe('jpeg');
    expect(imageInfo.width).toBe(width);
    expect(imageInfo.height).toBe(height);
  });
  it('should throw missing file error', async () => {
    const imageFolder: string = path.join('static', 'public', 'images');
    const imagePath: string = path.join(imageFolder, 'noimage.jpg');
    const height: number = 500;
    const width: number = 500;
    const newImagePath = path.join(
      imageFolder,
      'noimage-height-' + height + '-width' + width + '.jpg'
    );
    try {
      await imageService.resizeOneImage(imagePath, newImagePath, height, width);
    } catch (error) {
      console.log(error);
      expect(error).toEqual(new Error('Input file is missing: ' + imagePath));
    }
  });
});

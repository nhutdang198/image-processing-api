import sharp from 'sharp';

class ImageServiceClass {
  resizeOneImage = async (
    imagePath: string,
    newImagePath: string,
    height: number,
    width: number
  ) => {
    const resizeConfig: { height?: number; width?: number } = {
      height,
      width
    };
    if (!height) {
      delete resizeConfig.height;
    }
    if (!width) {
      delete resizeConfig.width;
    }
    return await sharp(imagePath).resize(resizeConfig).toFile(newImagePath);
  };
}
const imageService = new ImageServiceClass();
export default imageService;

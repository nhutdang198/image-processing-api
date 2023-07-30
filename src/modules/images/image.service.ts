import ResizeImageQuery from './dtos/resize-image-query.dto';

class ImageServiceClass {
  resizeOneImage = (resizeImageQuery: ResizeImageQuery) => {
    const { filename, height, width } = resizeImageQuery;
    return (
      'resize image ' + filename + ' height: ' + height + ', width: ' + width
    );
  };
}
const imageService = new ImageServiceClass();
export default imageService;

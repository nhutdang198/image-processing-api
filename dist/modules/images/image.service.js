"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ImageServiceClass {
    constructor() {
        this.resizeImage = (resizeImageQuery) => {
            const { filename, height, width } = resizeImageQuery;
            return ('resize image ' + filename + ' height: ' + height + ', width: ' + width);
        };
    }
}
const imageService = new ImageServiceClass();
exports.default = imageService;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const image_service_1 = __importDefault(require("../../modules/images/image.service"));
describe('resize image service testing', () => {
    it('should resize an image', async () => {
        const imageFolder = path_1.default.join('static', 'public', 'images');
        const imagePath = path_1.default.join(imageFolder, 'fjord.jpg');
        const height = 500;
        const width = 500;
        const newImagePath = path_1.default.join(imageFolder, 'fjord-height-' + height + '-width' + width + '.jpg');
        const imageInfo = await image_service_1.default.resizeOneImage(imagePath, newImagePath, height, width);
        expect(imageInfo.format).toBe('jpeg');
        expect(imageInfo.width).toBe(width);
        expect(imageInfo.height).toBe(height);
    });
    it('should throw missing file error', async () => {
        const imageFolder = path_1.default.join('static', 'public', 'images');
        const imagePath = path_1.default.join(imageFolder, 'noimage.jpg');
        const height = 500;
        const width = 500;
        const newImagePath = path_1.default.join(imageFolder, 'noimage-height-' + height + '-width' + width + '.jpg');
        try {
            await image_service_1.default.resizeOneImage(imagePath, newImagePath, height, width);
        }
        catch (error) {
            console.log(error);
            expect(error).toEqual(new Error('Input file is missing: ' + imagePath));
        }
    });
});

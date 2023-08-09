"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const image_service_1 = __importDefault(require("./image.service"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const redis_1 = require("../../common/redis");
class ImageControllerClass {
    constructor() {
        this.resizeOneImage = async (request, response) => {
            const query = request.query;
            const resizeImageQuery = query;
            const { filename = '', height = 0, width = 0 } = resizeImageQuery;
            const redis = redis_1.redisSerivce.getClient();
            const key = 'IMAGE:NAME:' + filename + ':HEIGHT:' + height + ':WIDTH:' + width;
            const cachedPath = await redis.get(key);
            if (cachedPath) {
                try {
                    const imageBuffer = fs_1.default.readFileSync(cachedPath);
                    response.set('Content-Type', 'image/jpeg');
                    return response.end(imageBuffer);
                }
                catch (error) { }
            }
            const imageExtention = '.jpg';
            const imageFolder = path_1.default.join('static', 'public', 'images');
            const imagePath = path_1.default.join(imageFolder, filename + imageExtention);
            let responseImage = imagePath;
            if (height || width) {
                try {
                    let resizeName = '';
                    if (height) {
                        resizeName += '-height-' + height;
                    }
                    if (width) {
                        resizeName += '-width-' + width;
                    }
                    const newImagePath = path_1.default.join(imageFolder, filename + resizeName + imageExtention);
                    responseImage = newImagePath;
                    await image_service_1.default.resizeOneImage(imagePath, newImagePath, +height, +width);
                }
                catch (error) {
                    return response.status(404).end('image not found');
                }
            }
            try {
                const imageBuffer = fs_1.default.readFileSync(responseImage);
                response.set('Content-Type', 'image/jpeg');
                await redis.set(key, responseImage);
                return response.end(imageBuffer);
            }
            catch (error) {
                return response.status(404).end('image not found');
            }
        };
    }
}
const imageController = new ImageControllerClass();
exports.default = imageController;

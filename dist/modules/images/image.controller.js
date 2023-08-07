"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
        this.resizeOneImage = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const query = request.query;
            const resizeImageQuery = query;
            const { filename = '', height = 0, width = 0 } = resizeImageQuery;
            const redis = redis_1.redisSerivce.getClient();
            const key = 'IMAGE:NAME:' + filename + ':HEIGHT:' + height + ':WIDTH:' + width;
            const cachedPath = yield redis.get(key);
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
                    yield image_service_1.default.resizeOneImage(imagePath, newImagePath, +height, +width);
                }
                catch (error) {
                    return response.status(404).end('image not found');
                }
            }
            try {
                const imageBuffer = fs_1.default.readFileSync(responseImage);
                response.set('Content-Type', 'image/jpeg');
                yield redis.set(key, responseImage);
                return response.end(imageBuffer);
            }
            catch (error) {
                return response.status(404).end('image not found');
            }
        });
    }
}
const imageController = new ImageControllerClass();
exports.default = imageController;

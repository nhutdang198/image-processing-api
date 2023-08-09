"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sharp_1 = __importDefault(require("sharp"));
class ImageServiceClass {
    constructor() {
        this.resizeOneImage = async (imagePath, newImagePath, height, width) => {
            const resizeConfig = {
                height,
                width
            };
            if (!height) {
                delete resizeConfig.height;
            }
            if (!width) {
                delete resizeConfig.width;
            }
            return await (0, sharp_1.default)(imagePath).resize(resizeConfig).toFile(newImagePath);
        };
    }
}
const imageService = new ImageServiceClass();
exports.default = imageService;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const image_service_1 = __importDefault(require("./image.service"));
class ImageControllerClass {
    constructor() {
        this.resizeOneImage = (request, response, next) => {
            const resizeImageQuery = request.query;
            const image = image_service_1.default.resizeImage(resizeImageQuery);
            response.send(image);
        };
    }
}
const imageController = new ImageControllerClass();
exports.default = imageController;

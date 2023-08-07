"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const image_controller_1 = __importDefault(require("./image.controller"));
const validate_middleware_1 = __importDefault(require("../../common/middlewares/validate.middleware"));
const resize_image_query_dto_1 = require("./dtos/resize-image-query.dto");
const routers = (0, express_1.Router)();
routers.get('/images', (0, validate_middleware_1.default)(resize_image_query_dto_1.ResizeImageQuery), image_controller_1.default.resizeOneImage);
exports.default = routers;

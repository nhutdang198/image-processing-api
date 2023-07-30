"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const image_controller_1 = __importDefault(require("./image.controller"));
const routers = (0, express_1.Router)();
routers.get('/images', [image_controller_1.default.resizeOneImage]);
exports.default = routers;

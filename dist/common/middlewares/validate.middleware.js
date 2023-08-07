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
Object.defineProperty(exports, "__esModule", { value: true });
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const validateQuery = (targetClass) => {
    return (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
        const query = (0, class_transformer_1.plainToInstance)(targetClass, request.query);
        const errors = yield (0, class_validator_1.validate)(query);
        if (errors.length > 0) {
            return response.status(400).json(errors);
        }
        request.query = query;
        next();
    });
};
exports.default = validateQuery;

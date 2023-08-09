"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const validateQuery = (targetClass) => {
    return async (request, response, next) => {
        const query = (0, class_transformer_1.plainToInstance)(targetClass, request.query);
        const errors = await (0, class_validator_1.validate)(query);
        if (errors.length > 0) {
            return response.status(400).json(errors);
        }
        request.query = query;
        next();
    };
};
exports.default = validateQuery;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../../index");
const supertest_1 = __importDefault(require("supertest"));
describe('GET /images enpoint testing', () => {
    it('should get fjord image', async () => {
        await (0, supertest_1.default)(index_1.app)
            .get('/images?filename=fjord')
            .set('Accept', 'application/json')
            .expect(200)
            .expect('Content-Type', 'image/jpeg');
    });
    it('should get fjord image with specific width and height', async () => {
        await (0, supertest_1.default)(index_1.app)
            .get('/images?filename=fjord&width=500&height=500')
            .set('Accept', 'application/json')
            .expect(200)
            .expect('Content-Type', 'image/jpeg');
    });
    it('should throw image not found error', async () => {
        const response = await (0, supertest_1.default)(index_1.app)
            .get('/images?filename=noimage')
            .set('Accept', 'application/json')
            .expect(404);
        expect(response.text).toEqual('image not found');
    });
    it('should throw height validation error', async () => {
        var _a, _b, _c, _d;
        const response = await (0, supertest_1.default)(index_1.app)
            .get('/images?filename=fjord&height=abc')
            .set('Accept', 'application/json')
            .expect(400);
        expect((_b = (_a = response.body[0]) === null || _a === void 0 ? void 0 : _a.constraints) === null || _b === void 0 ? void 0 : _b.isNumber).toEqual('height must be a number conforming to the specified constraints');
        expect((_d = (_c = response.body[0]) === null || _c === void 0 ? void 0 : _c.constraints) === null || _d === void 0 ? void 0 : _d.min).toEqual('height must not be less than 0');
    });
    it('should throw width validation error', async () => {
        var _a, _b, _c, _d;
        const response = await (0, supertest_1.default)(index_1.app)
            .get('/images?filename=fjord&width=abc')
            .set('Accept', 'application/json')
            .expect(400);
        expect((_b = (_a = response.body[0]) === null || _a === void 0 ? void 0 : _a.constraints) === null || _b === void 0 ? void 0 : _b.isNumber).toEqual('width must be a number conforming to the specified constraints');
        expect((_d = (_c = response.body[0]) === null || _c === void 0 ? void 0 : _c.constraints) === null || _d === void 0 ? void 0 : _d.min).toEqual('width must not be less than 0');
    });
});

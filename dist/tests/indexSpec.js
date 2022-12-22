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
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../index"));
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const file_1 = __importDefault(require("./../file"));
const img_request = (0, supertest_1.default)(index_1.default);
describe('Test responses from endpoints', () => {
    describe('endpoint: /', () => {
        it('gets /', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield img_request.get('/');
            expect(response.status).toBe(200);
        }));
    });
    describe('endpoint: /api/images', () => {
        it('gets /api/images?imgfilename=encenadaport (valid args)', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield img_request.get('/api/images?imgfilename=encenadaport');
            expect(response.status).toBe(200);
        }));
        it('gets /api/images?imgfilename=encenadaport&imgwidth=199&imgheight=199 (valid args)', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield img_request.get('/api/images?imgfilename=encenadaport&imgwidth=199&imgheight=199');
            expect(response.status).toBe(200);
        }));
        it('gets /api/images?imgfilename=encenadaport&imgwidth=-200&imgheight=200 (invalid args)', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield img_request.get('/api/images?imgfilename=encenadaport&imgwidth=-200&imgheight=200');
            expect(response.status).toBe(200);
        }));
        it('gets /api/images (no arguments)', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield img_request.get('/api/images');
            expect(response.status).toBe(200);
        }));
    });
    describe('endpoint: /foo', () => {
        it('returns 404 for invalid endpoint', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield img_request.get('/foo');
            expect(response.status).toBe(404);
        }));
    });
});
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    const imgPathResized = path_1.default.resolve(file_1.default.imgThumbPath, 'encenadaport-199x199.jpg');
    try {
        yield fs_1.promises.access(imgPathResized);
        fs_1.promises.unlink(imgPathResized);
    }
    catch (_a) {
    }
}));

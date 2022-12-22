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
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const file_1 = __importDefault(require("./../file"));
describe('Sharp Image Processing', () => {
    it('raises an error (Value of width invalid)', () => __awaiter(void 0, void 0, void 0, function* () {
        const img_error = yield file_1.default.createThumb({
            imgfilename: 'foo',
            imgwidth: '-100',
            imgheight: '500'
        });
        expect(img_error).not.toBeNull();
    }));
    it('raises an error (filename does not exist)', () => __awaiter(void 0, void 0, void 0, function* () {
        const img_error = yield file_1.default.createThumb({
            imgfilename: 'foo',
            imgwidth: '100',
            imgheight: '500'
        });
        expect(img_error).not.toBeNull();
    }));
    it('succeeds to write resized thumb file (existing file, size values valid )', () => __awaiter(void 0, void 0, void 0, function* () {
        yield file_1.default.createThumb({ imgfilename: 'encenadaport', imgwidth: '99', imgheight: '99' });
        const imgPathResized = path_1.default.resolve(file_1.default.imgThumbPath, `encenadaport-99x99.jpg`);
        let imgErrorFile = '';
        try {
            yield fs_1.promises.access(imgPathResized);
            imgErrorFile = null;
        }
        catch (_a) {
            imgErrorFile = 'File not created';
        }
        expect(imgErrorFile).toBeNull();
    }));
});
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    const imgPathResized = path_1.default.resolve(file_1.default.imgThumbPath, 'encenadaport-100x100.jpg');
    try {
        yield fs_1.promises.access(imgPathResized);
        fs_1.promises.unlink(imgPathResized);
    }
    catch (_a) {
    }
}));

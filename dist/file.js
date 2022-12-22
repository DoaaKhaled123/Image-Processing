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
const image_processing_1 = __importDefault(require("./image_processing"));
class ImgFile {
    static getImgPath(params) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!params.imgfilename) {
                return null;
            }
            const imgfilePath = params.imgwidth && params.imgheight
                ? path_1.default.resolve(ImgFile.imgThumbPath, `${params.imgfilename}-${params.imgwidth}x${params.imgheight}.jpg`)
                : path_1.default.resolve(ImgFile.imgFullPath, `${params.imgfilename}.jpg`);
            try {
                yield fs_1.promises.access(imgfilePath);
                return imgfilePath;
            }
            catch (_a) {
                return null;
            }
        });
    }
    static isImgAvailable(imgfilename = '') {
        return __awaiter(this, void 0, void 0, function* () {
            if (!imgfilename) {
                return false;
            }
            return (yield ImgFile.getAvailableImgNames()).includes(imgfilename);
        });
    }
    static getAvailableImgNames() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return (yield fs_1.promises.readdir(ImgFile.imgFullPath)).map((imgfilename) => imgfilename.split('.')[0]);
            }
            catch (_a) {
                return [];
            }
        });
    }
    static isThumbAvailable(params) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!params.imgfilename || !params.imgwidth || !params.imgheight) {
                return false;
            }
            const filePath = path_1.default.resolve(ImgFile.imgThumbPath, `${params.imgfilename}-${params.imgwidth}x${params.imgheight}.jpg`);
            try {
                yield fs_1.promises.access(filePath);
                return true;
            }
            catch (_a) {
                return false;
            }
        });
    }
    static createThumbPath() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield fs_1.promises.access(ImgFile.imgThumbPath);
            }
            catch (_a) {
                fs_1.promises.mkdir(ImgFile.imgThumbPath);
            }
        });
    }
    static createThumb(params) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!params.imgfilename || !params.imgwidth || !params.imgheight) {
                return null;
            }
            const imgfilePathFull = path_1.default.resolve(ImgFile.imgFullPath, `${params.imgfilename}.jpg`);
            const imgfilePathThumb = path_1.default.resolve(ImgFile.imgThumbPath, `${params.imgfilename}-${params.imgwidth}x${params.imgheight}.jpg`);
            console.log(`Creating thumb ${imgfilePathThumb}`);
            return yield (0, image_processing_1.default)({
                imgsource: imgfilePathFull,
                imgtarget: imgfilePathThumb,
                imgwidth: parseInt(params.imgwidth),
                imgheight: parseInt(params.imgheight)
            });
        });
    }
}
exports.default = ImgFile;
ImgFile.imgFullPath = path_1.default.resolve(__dirname, '../assets/images/full');
ImgFile.imgThumbPath = path_1.default.resolve(__dirname, '../assets/images/thumb');

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
const express_1 = __importDefault(require("express"));
const file_1 = __importDefault(require("./../../file"));
const img_validate = (query) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(yield file_1.default.isImgAvailable(query.imgfilename))) {
        const availableImgNames = (yield file_1.default.getAvailableImgNames()).join(', ');
        return `Please enter a valid filename in the 'imgfilename' query segment. Filenames are available : ${availableImgNames}.`;
    }
    if (!query.imgwidth && !query.imgheight) {
        return null; // No size values
    }
    const imgwidth = parseInt(query.imgwidth || '');
    if (Number.isNaN(imgwidth) || imgwidth < 1) {
        return "Please enter a positive numerical value for the 'imgwidth' query segment.";
    }
    const imgheight = parseInt(query.imgheight || '');
    if (Number.isNaN(imgheight) || imgheight < 1) {
        return "Please enter a positive numerical value for the 'imgheight' query segment.";
    }
    return null;
});
const images_resize = express_1.default.Router();
images_resize.get('/', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const validationMessage = yield img_validate(request.query);
    if (validationMessage) {
        response.send(validationMessage);
        return;
    }
    let error = '';
    if (!(yield file_1.default.isThumbAvailable(request.query))) {
        error = yield file_1.default.createThumb(request.query);
    }
    if (error) {
        response.send(error);
        return;
    }
    const path = yield file_1.default.getImgPath(request.query);
    if (path) {
        response.sendFile(path);
    }
    else {
        response.send('This should not have happened');
    }
}));
exports.default = images_resize;

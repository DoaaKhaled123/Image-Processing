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
    if (!(yield file_1.default.isImageAvailable(query.filename))) {
        const availableImageNames = (yield file_1.default.getAvailableImageNames()).join(', ');
        return `Please enter a valid filename in the 'filename' query segment. Filenames are available : ${availableImageNames}.`;
    }
    if (!query.width && !query.height) {
        return null; // No size values
    }
    const img_width = parseInt(query.width || '');
    if (Number.isNaN(img_width) || img_width < 1) {
        return "Please enter a positive numerical value for the 'img_width' query segment.";
    }
    const img_height = parseInt(query.height || '');
    if (Number.isNaN(img_height) || img_height < 1) {
        return "Please enter a positive numerical value for the 'img_height' query segment.";
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
    const path = yield file_1.default.getImagePath(request.query);
    if (path) {
        response.sendFile(path);
    }
    else {
        response.send('This should not have happened');
    }
}));
exports.default = images_resize;

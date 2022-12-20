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
const index_1 = __importDefault(require("./routes/index"));
const file_1 = __importDefault(require("./file"));
const img_app = (0, express_1.default)();
const url_port = 8069;
img_app.use(index_1.default);
img_app.listen(url_port, () => __awaiter(void 0, void 0, void 0, function* () {
    yield file_1.default.createThumbPath();
    const url = `\x1b[2mhttp://localhost:${url_port}\x1b[0m`;
    console.log(`Please open ${url} to review the project ...`);
}));
exports.default = img_app;

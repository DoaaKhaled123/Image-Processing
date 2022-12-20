"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const images_1 = __importDefault(require("./api/images"));
const routes_img = express_1.default.Router();
routes_img.use('/api/images', images_1.default);
routes_img.get('/', (request, response) => {
    response.send('<h1>Welcome to Image Processing</h1><p>Listening at <code><a href="/api/images">/api/images</a></code> for queries containing at least a valid filename. Optionally use both width and height to set the size...</p><p>Examples:<ul><li><a href="/api/images?filename=fjord">/api/images?filename=fjord</a></li><li><a href="/api/images?filename=fjord&width=100&height=100">/api/images?filename=fjord&width=100&height=100</a></li></ul></p>');
});
exports.default = routes_img;

import express from 'express';
import images from './api/images';

const routes_img: express.Router = express.Router();
routes_img.use('/api/images', images);
routes_img.get(
  '/',
  (request: express.Request, response: express.Response): void => {
    response.send(
      '<h1>Welcome to Image Processing</h1><p>Listening at <code><a href="/api/images">/api/images</a></code> for queries containing at least a valid filename. Optionally use both width and height to set the size...</p><p>Examples:<ul><li><a href="/api/images?imgfilename=encenadaport">/api/images?imgfilename=encenadaport</a></li><li><a href="/api/images?imgfilename=encenadaport&imgwidth=100&imgheight=100">/api/images?imgfilename=encenadaport&imgwidth=100&imgheight=100</a></li></ul></p>'
    );
  }
);

export default routes_img;
